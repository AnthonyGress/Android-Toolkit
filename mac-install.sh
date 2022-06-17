#!/bin/bash

# appVersion = "arm64-mac.zip"

install_app() {
    curl -L https://github.com/AnthonyGress/FireTV-Toolkit/releases/download/v1.2.0/FireTV-Toolkit-1.2.0-arm64-mac.zip --output ~/Downloads/FireTV-Toolkit-arm64.zip && unzip ~/Downloads/FireTV-Toolkit-arm64.zip -d /Applications
}

install_adb() {
    curl -L -o ~/Downloads/platform-tools-latest-darwin.zip https://dl.google.com/android/repository/platform-tools-latest-darwin.zip && unzip ~/Downloads/platform-tools-latest-darwin.zip -d /Applications/FireTV-Toolkit.app/Contents/
}

cleanUp(){
    rm ~/Downloads/platform-tools-latest-darwin.zip && rm  ~/Downloads/platform-tools-latest-darwin.zip
}

echo -e "\n---------------------- Installing Application ----------------------\n"
install_app
sleep 1
echo -e "\n---------------------- Installing ADB ----------------------\n"
install_adb
echo -e "\n---------------------- Opening App ----------------------\n"
open -a FireTV-Toolkit.app
