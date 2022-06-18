#!/bin/bash
OS="$(uname)"
UNAME_MACHINE="$(/usr/bin/uname -m)"
USER_PLATFORM="$OS $UNAME_MACHINE"
echo $USER_PLATFORM
LATEST_VERSION=$(curl -sL https://api.github.com/repos/anthonygress/FireTV-Toolkit/tags | grep '"name":' | head -1 | cut -d: -f2 | cut -c4-8)

checkOS(){
    # First check OS.
if [[ USER_PLATFORM == "Linux arm64" ]]
then
    #install linux arm64
        echo -e "\nLatest version is: $LATEST_VERSION\n"

    curl -L https://github.com/AnthonyGress/FireTV-Toolkit/releases/download/v${LATEST_VERSION}/FireTV-Toolkit-${LATEST_VERSION}arm64.AppImage --output ~/Desktop/FireTV-Toolkit-arm64.AppImage && chmod +x ~/Desktop/FireTV-Toolkit-arm64.AppImage
elif [[ "${OS}" == "Darwin" ]]
then
  UNAME_MACHINE="$(/usr/bin/uname -m)"

  if [[ "${UNAME_MACHINE}" == "arm64" ]]
  then
    # On ARM macOS,
    USER_PLATFORM="Mac Arm"
  else
    # On Intel macOS, this script installs to /usr/local only
    USER_PLATFORM=""
  fi
fi
}

install_app() {
    echo -e "\n---------------------- Installing Application ----------------------\n"
    echo -e "\nLatest version is: $LATEST_VERSION\n"

    if [[ "$USER_PLATFORM" == "Darwin arm64" ]]
    then
        curl -L https://github.com/AnthonyGress/FireTV-Toolkit/releases/download/v${LATEST_VERSION}/FireTV-Toolkit-${LATEST_VERSION}-arm64-mac.zip --output ~/Downloads/FireTV-Toolkit.zip && unzip -q ~/Downloads/FireTV-Toolkit.zip -d /Applications
    elif [[ "$USER_PLATFORM" == "Darwin x64" ]]
    then
        curl -L https://github.com/AnthonyGress/FireTV-Toolkit/releases/download/v${LATEST_VERSION}/FireTV-Toolkit-${LATEST_VERSION}-mac.zip --output ~/Downloads/FireTV-Toolkit.zip && unzip -q ~/Downloads/FireTV-Toolkit.zip -d /Applications
    elif [[ "$USER_PLATFORM" == "Linux arm64" ]]
    then
         curl -L https://github.com/AnthonyGress/FireTV-Toolkit/releases/download/v${LATEST_VERSION}/FireTV-Toolkit-${LATEST_VERSION}-arm64.AppImage --output ~/Desktop/FireTV-Toolkit-arm64.AppImage && chmod +x ~/Desktop/FireTV-Toolkit-arm64.AppImage
    elif [[ "$USER_PLATFORM" == "Linux x64" ]]
    then
         curl -L https://github.com/AnthonyGress/FireTV-Toolkit/releases/download/v${LATEST_VERSION}/FireTV-Toolkit-${LATEST_VERSION}.AppImage --output ~/Desktop/FireTV-Toolkit.AppImage && chmod +x ~/Desktop/FireTV-Toolkit.AppImage
    else
        echo "OS not supported - please check the readme for install and support instructions"
        exit 1
    fi


}

install_adb() {
    echo -e "\n---------------------- Installing ADB ----------------------\n"

    if [[ "$OS" == "Darwin" ]]
    then
        curl -L -o ~/Downloads/platform-tools-latest-darwin.zip https://dl.google.com/android/repository/platform-tools-latest-darwin.zip && unzip -q ~/Downloads/platform-tools-latest-darwin.zip -d /Applications/FireTV-Toolkit.app/Contents/
    elif [[ "$OS" == "Linux" ]]
    then
        mkdir /usr/bin/FireTV-Toolkit
        curl -L -o ~/Downloads/platform-tools-latest-darwin.zip https://dl.google.com/android/repository/platform-tools-latest-linux.zip && unzip -q ~/Downloads/platform-tools-latest-darwin.zip -d /usr/bin/FireTV-Toolkit
    fi
}

cleanUp(){
    echo -e "\n---------------------- Cleaning Up ----------------------\n"
    rm ~/Downloads/platform-tools-latest-darwin.zip ~/Downloads/FireTV-Toolkit.zip
}

openApp(){
echo -e "\n---------------------- Opening App ----------------------\n"

if [[ "$OS" == "Darwin" ]]
then
    open -a FireTV-Toolkit.app
elif [[ "$OS" == "Linux" ]]
then
    cd ~/Desktop && ./FireTV-Toolkit-arm64.AppImage
fi
}

#runtime
echo $(curl -L https://raw.githubusercontent.com/AnthonyGress/FireTV-Toolkit/main/assets/art.txt)
install_app
sleep 2
install_adb
openApp
cleanUp

