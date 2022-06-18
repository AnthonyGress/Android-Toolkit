install_adb() {
    echo -e "\n---------------------- Installing ADB ----------------------\n"

    if [[ "$OS" == "Darwin" ]]
    then
        curl -L -o ~/Downloads/platform-tools-latest-darwin.zip https://dl.google.com/android/repository/platform-tools-latest-darwin.zip && unzip -qo ~/Downloads/platform-tools-latest-darwin.zip -d /Applications/FireTV-Toolkit.app/Contents/
    elif [[ "$OS" == "Linux" ]]
    then
        mkdir /usr/bin/FireTV-Toolkit
        curl -L -o ~/Downloads/platform-tools-latest-darwin.zip https://dl.google.com/android/repository/platform-tools-latest-linux.zip && unzip -qo ~/Downloads/platform-tools-latest-darwin.zip -d /usr/bin/FireTV-Toolkit
    fi
}
install_adb
