# Android-Toolkit

![AndroidToolkit](https://github.com/AnthonyGress/Android-Toolkit/assets/70029654/290f4fd7-083d-4fb4-a343-462f09f59a5a)

# Install

## Mac & Linux

Copy and paste this into the Terminal App

```
/bin/bash -c "$(curl -sL https://raw.githubusercontent.com/AnthonyGress/Android-Toolkit/main/install.sh)"
```
---

## Windows

Use the installer under the Releases tab named `Android-Toolkit-Setup.exe`

Click [here](https://github.com/anthonygress/Android-Toolkit/releases/latest/download/Android-toolkit-setup.exe) to install the latest version.
<br><br>

# Usage

1. Make sure you are on the same WiFi network as your Firestick. 
2. Find the IP address of your device.  
On FireTV: Firestick Settings > My Fire TV > About > Network
3. Go to Device Settings and turn on ADB debugging and Install Apps from Unknown Sources.  
    On FireTV: Settings > My Fire TV > Developer Options
4. Enter IP address into __ADB Connection Tools__ and click "Connect" or press the enter key.
<br><br>

# Sideload Tools

## Install Single APK

You can install any APK file from your computer directly on to your android device.
<br><br>

## Batch Install
Installs ALL files with .apk extension in the current directory onto your firestick.
<br><br>

# Firestick Tools

## Set Screensaver
Lets you set a custom screensaver app, custom time-on duration, and custom time-off. I have included a modified application in this repo called "Website Daydream" that changes the default wallpaper to the website https://clients3.google.com/cast/chromecast/home
  
After installing Website Daydream, install the application called Activity launcher (https://www.f-droid.org/en/packages/de.szalkowski.activitylauncher/). Open it, and just touch the website daydream app in order for it to work.
<br><br>

  
## Check Screensaver
Gets the current values for your screensaver and returns them.
<br><br>

  
## Debloat
Disables ALL unnecessary Amazon services that are not needed

<br>

# System Tools

Each action is performed on the connected android device with the exception of the Terminal action. This opens the terminal on your local computer in the __platform-tools__ folder where you can directly run ADB commands.  

You can learn more about ADB commands on [https://developer.android.com/tools/adb](https://developer.android.com/tools/adb)

<br>

> Note: You have to enable ADB debugging or USB debugging on your android device. Usually found in developer settings (accessed by tapping the build number many times on most devices). On your first time connecting, you will have to allow the connection on your android device, it will ask about a fingerprint which you need to accept. This only happens on the first connection and is an adb security measure.
