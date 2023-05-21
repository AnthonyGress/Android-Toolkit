export const SystemActions = ({adbCommand, shellCommand}: {adbCommand: Function, shellCommand: Function}) => {
    return (
        <div className="button-group">
            <div className="group1">
                <button
                    type="button"
                    onClick={() => {
                        shellCommand(
                            'open -a Terminal'
                            // `open -a Terminal && osascript -e 'tell application "Terminal" to do script "ls"'`

                            // 'osascript -e \'tell application "Terminal" to activate\''
                            // -e 'tell application "Terminal" to do script "ls"'
                        );
                    }}
                >
                                Shell
                </button>
                <button
                    type="button"
                    onClick={() =>
                        adbCommand('adb shell dumpsys diskstats')
                    }
                >
                                Disk Info
                </button>
                <button
                    type="button"
                    onClick={() =>
                        adbCommand('adb shell dumpsys wifi')
                    }
                >
                                WiFi Info
                </button>
            </div>
            <div className="group2">
                <button
                    type="button"
                    onClick={() =>
                        adbCommand('adb shell dumpsys cpuinfo')
                    }
                >
                                CPU Info
                </button>
                <button
                    type="button"
                    onClick={() =>
                        adbCommand('adb shell dumpsys usagestats')
                    }
                >
                                Usage Info
                </button>
                <button
                    type="button"
                    onClick={() =>
                        adbCommand('adb shell dumpsys meminfo')
                    }
                >
                                Memory Info
                </button>
            </div>
            <div className="group3">
                <button
                    type="button"
                    onClick={() =>
                        adbCommand(
                            'adb shell cat /system/build.prop'
                        )
                    }
                >
                                Hardware Info
                </button>
                <button
                    type="button"
                    onClick={() =>
                        adbCommand(
                            'adb shell getprop ro.build.version.release'
                        )
                    }
                >
                                OS Version
                </button>
                <button
                    type="button"
                    onClick={() =>
                        adbCommand(
                            'adb shell screencap -p "/sdcard/screenshot.png"'
                        )
                    }
                >
                                Screenshot on Device
                </button>
            </div>
        </div>
    )
}

export default SystemActions
