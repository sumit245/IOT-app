package com.lots.applycard

import android.content.Context
import android.content.SharedPreferences
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class SMSListenerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val sharedPreferences: SharedPreferences =
        reactContext.getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)

    override fun getName(): String {
        return "SMSListenerModule"
    }

    @ReactMethod
    fun setUserId(userId: String) {
        sharedPreferences.edit().putString("user_profile", userId).apply()
    }
}
