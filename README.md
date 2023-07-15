# Android-Toolkit

![AndroidToolkit](https://github.com/AnthonyGress/Android-Toolkit/assets/70029654/290f4fd7-083d-4fb4-a343-462f09f59a5a)

# Install

## Mac & Linux

Copy and paste this into the Terminal App to install.

```
/bin/bash -c "$(curl -sL https://raw.githubusercontent.com/AnthonyGress/Android-Toolkit/main/install.sh)"
```
---

## Windows

## Download Latest: [Release](https://github.com/anthonygress/Android-Toolkit/releases/latest/download/Android-toolkit-setup.exe)  
<br>

Use the latest released installer named `Android-Toolkit-Setup.exe` to get started.

<br>

# Usage
## Android TV / FireTV
1. Make sure you are on the same WiFi network as your android device. 
2. Find the IP address of your device.  
On FireTV: Firestick Settings > My Fire TV > About > Network
3. Go to Device Settings and turn on ADB debugging and Install Apps from Unknown Sources.  
    On FireTV: Settings > My Fire TV > Developer Options
4. Enter IP address into __ADB Connection Tools__ and click "Connect" or press the enter key.
<br>

## Phones/Tablets with Android 11 or higher

### For wired adb connection, you will need to:
1. enable developer mode by tapping on the build number in the about settings
2. enable usb debugging.
3. plug in your device via usb

### For wireless connection you will need to:
1. enable developer mode
2. enable usb debugging 
3. wireless debugging.  
4. Under the wireless debugging settings, you will need to tap pair device with pairing code. 
5. Enter the pairing ipAddress:port and the pairing code in Android Toolkit.  
6. Once paired, you will need to back out and use the ADB Connect section to connect to the IP address and port listed under wireless debugging.

### To enable file transfer with your connected computer: 
1. Plug your device in via USB 
2. Tap to notification on your phone/tablet that says "charging via USB" 
3. Choose the option for File transfer / Android Auto.

<br>

# APK Tools

## Install Single APK

You can install any APK file from your computer directly on to your android device.
<br><br>

## Batch Install
Installs ALL files with .apk extension in the selected directory onto your device.
<br><br>

## Quick Install Apps
One click install for selected popular modded apps.

<br>

## TV Apps

SmartTube - [https://github.com/yuliskov/SmartTubeNext/blob/master/README.md](https://github.com/yuliskov/SmartTubeNext/blob/master/README.md)  
  
Launcher Manager (FireTV) - [https://forum.xda-developers.com/t/app-firetv-noroot-launcher-manager-change-launcher-without-root.4176349/](https://forum.xda-developers.com/t/app-firetv-noroot-launcher-manager-change-launcher-without-root.4176349/)  
  
Wolf Launcher - [https://www.techdoctoruk.com/tutorials/block-android-tv-adverts-with-wolf-launcher/](https://www.techdoctoruk.com/tutorials/block-android-tv-adverts-with-wolf-launcher/)  
<br>

## Mobile Apps (phone/tables)
> Note: Delete the original play store app before installing

Revanced - [https://revanced.app/](https://revanced.app/) 
  
To learn more about what each patch does, open the ReVanced Manager app and select your application, or visit the website for [ReVanced Patches](https://revanced.app/patches)  
  
The Infinity for Reddit patch is from [https://github.com/KhoalaS/Infinity-For-Reddit](https://github.com/KhoalaS/Infinity-For-Reddit)
  
Simply click the button to download and install the app directly on your device.  
  
For spotify/reddit you may need to login with your username and password if signing in with google doesn't work. Youtube and Youtube Music need MicroG installed to login to your google account.

<br> 

# ReVanced Tools  
  
Download each of the apps in the list. Then open ReVanced and patch your youtube app. To revert at any time, simply uninstall the app and use the original youtube app from the play store.  
  
You can get links to open in the ReVanced app by going into settings > apps > youtube > open by default and unchecking all the options. Then delete data, disable/delete the app, then restart.

To enable links to open in Youtube ReVanced, go to settings > apps > Youtube ReVanced > open by default and select all the options, then restart.

> NOTE: On my pixel device it seems any youtube links from google chrome will try to open in the stock youtube app, or take you to the play store to install/enable it. This doesn't seem to happen from the google app.

Prebuilt apks - [Revanced APKs](https://github.com/revanced-apks/build-apps/releases)

<br>

# FireTV Tools

## Set Screensaver
Lets you set a custom screensaver app. I have included a modified application in this repo called "Website Daydream" that changes the default wallpaper to the website https://clients3.google.com/cast/chromecast/home
  
After installing Website Daydream, install the application called Activity launcher (https://www.f-droid.org/en/packages/de.szalkowski.activitylauncher/). Open it, and just touch the website daydream app in order for it to work.
<br><br>

  
## Check Screensaver
Gets the current values for your screensaver and returns them.
<br><br>

  
## Debloat
Disables ALL unnecessary Amazon services that are not needed (may break some amazon services)

<br>

# System Tools

Each action is performed on the connected android device with the exception of the Terminal action. This opens the terminal on your local computer in the __platform-tools__ folder where you can directly run ADB commands.  
  
Ex. `./adb install test.apk`  
  
For Battery Remaining, just divide the number by 1000 to get your battery status in mAh.

You can learn more about ADB commands at [https://developer.android.com/tools/adb](https://developer.android.com/tools/adb)

<br>

# Debugging

If your device is showing connected but says offline when you list devices or you cannot perform some actions, simply turn off ADB debugging on your device and re-enable it. Then reconnect using the app and it should work again.
