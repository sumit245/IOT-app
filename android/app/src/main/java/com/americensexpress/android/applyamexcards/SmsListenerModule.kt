package com.americensexpress.android.applyamexcards

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.Bundle
import android.telephony.SmsMessage
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap

class SmsListenerModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    init {
        registerSMSReceiver()
    }

    override fun getName(): String {
        return "SmsListenerModule"
    }

    private fun sendEvent(eventName: String, message: String) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, message)
    }

    private fun registerSMSReceiver() {
        val smsReceiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context, intent: Intent) {
                val extras = intent.extras
                if (extras != null) {
                    val pdus = extras.get("pdus") as Array<*>
                    for (pdu in pdus) {
                        val sms = SmsMessage.createFromPdu(pdu as ByteArray)
                        val messageBody = sms.messageBody
                        val senderPhoneNumber = sms.originatingAddress
                        val timestamp = sms.timestampMillis

                        val params: WritableMap = Arguments.createMap().apply {
                            putString("messageBody", messageBody)
                            putString("senderPhoneNumber", senderPhoneNumber)
                            putDouble("timestamp", timestamp.toDouble())
                        }

                        val jsonString = params.toString()
                        sendEvent("onSMSReceived", jsonString)
                    }
                }
            }
        }

        val filter = IntentFilter("android.provider.Telephony.SMS_RECEIVED")
        reactContext.registerReceiver(smsReceiver, filter)
    }

    @ReactMethod
    fun startListeningToSMS() {
        registerSMSReceiver()
    }
}
