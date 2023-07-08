#!/bin/bash
OS="$(uname)"
UNAME_MACHINE="$(/usr/bin/uname -m)"
USER_PLATFORM="$OS $UNAME_MACHINE"

install_app() {
    echo -e "\n---------------------- Installing Application ----------------------"
    echo -e "Installing latest version: $LATEST_VERSION on $USER_PLATFORM\n"

    if [[ "$USER_PLATFORM" == "Darwin arm64" ]]
    then
        curl -sL https://github.com/anthonygress/Android-Toolkit/releases/latest/download/Android-Toolkit-arm64.zip --output ~/Downloads/Android-Toolkit.zip && unzip -qo ~/Downloads/Android-Toolkit.zip -d /Applications
    elif [[ "$USER_PLATFORM" == "Darwin x86_64" ]]
    then
        curl -sL https://github.com/anthonygress/Android-Toolkit/releases/latest/download/Android-Toolkit-x64.zip --output ~/Downloads/Android-Toolkit.zip && unzip -qo ~/Downloads/Android-Toolkit.zip -d /Applications
    elif [[ "$OS" == "Linux"  ]]
    then
         curl -sL https://github.com/anthonygress/Android-Toolkit/releases/latest/download/Android-Toolkit.AppImage --output ~/Desktop/Android-Toolkit.AppImage && chmod +x ~/Desktop/Android-Toolkit.AppImage
    else
        echo "OS not supported - please check the readme for install and support instructions"
        exit 1
    fi
}

install_adb() {
    echo -e "\n---------------------- Installing ADB ----------------------"

    if [[ "$OS" == "Darwin" ]]
    then
        curl -sL -o ~/Downloads/platform-tools-latest-darwin.zip https://dl.google.com/android/repository/platform-tools-latest-darwin.zip && unzip -qo ~/Downloads/platform-tools-latest-darwin.zip -d /Applications/"Android Toolkit.app"/Contents/
    elif [[ "$OS" == "Linux" ]]
    then
        mkdir /usr/bin/Android-Toolkit
        curl -sL -o ~/Downloads/platform-tools-latest-darwin.zip https://dl.google.com/android/repository/platform-tools-latest-linux.zip && unzip -qo ~/Downloads/platform-tools-latest-darwin.zip -d /usr/bin/Android-Toolkit
    fi
}

cleanUp(){
    echo -e "\n---------------------- Cleaning Up ----------------------"
    rm ~/Downloads/platform-tools-latest-darwin.zip

    if [[ "$OS" == "Darwin" ]]
    then
        rm ~/Downloads/Android-Toolkit.zip
    fi
}

openApp(){
echo -e "\n---------------------- Opening App ----------------------"

if [[ "$OS" == "Darwin" ]]
then
    open -a /Applications/"Android Toolkit.app"
elif [[ "$OS" == "Linux" ]]
then
    cd ~/Desktop && ./Android-Toolkit.AppImage
fi
echo
}

#runtime
curl https://raw.githubusercontent.com/AnthonyGress/Android-Toolkit/main/assets/art.txt
install_app
sleep 2
install_adb
openApp
cleanUp

