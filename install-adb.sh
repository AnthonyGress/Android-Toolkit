install_adb() {
    echo -e "\n---------------------- Installing ADB ----------------------\n"

    if [[ "$OS" == "Darwin" ]]
    then
        curl -L -o ~/Downloads/platform-tools-latest-darwin.zip https://dl.google.com/android/repository/platform-tools-latest-darwin.zip && unzip -qo ~/Downloads/platform-tools-latest-darwin.zip -d /Applications/Android-Toolkit.app/Contents/
    elif [[ "$OS" == "Linux" ]]
    then
        mkdir /usr/bin/Android-Toolkit
        curl -L -o ~/Downloads/platform-tools-latest-darwin.zip https://dl.google.com/android/repository/platform-tools-latest-linux.zip && unzip -qo ~/Downloads/platform-tools-latest-darwin.zip -d /usr/bin/Android-Toolkit
    fi
}
install_adb
