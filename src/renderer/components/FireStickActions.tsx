import debloatCommands from '../../../assets/debloatCommands';


export const FireStickActions = ({adbCommand}: {adbCommand: Function}) => {
    const setScreensaver = () => {
        adbCommand(
            'adb shell settings put secure screensaver_components uk.co.liamnewmarch.daydream/uk.co.liamnewmarch.daydream.WebsiteDaydreamService '
        );

        setTimeout(
            () =>
                adbCommand(
                    'adb shell settings get secure screensaver_components'
                ),
            2000
        );
    };

    const debloat = () => {
        debloatCommands.map((command) => adbCommand(command));
    };

    return (
        <>
            <div className="screensaver vcenter">
                <div className="center">
                    <h2>Screensaver Tools</h2>
                </div>
                <div className="button-group">
                    <div className="group1 vcenter">
                        <button
                            type="button"
                            onClick={() =>
                                adbCommand(
                                    'adb shell settings get secure screensaver_components'
                                )
                            }
                        >
                                Check Screen Saver
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                adbCommand(
                                    'adb shell settings get secure sleep_timeout'
                                )
                            }
                        >
                                Time Until Screensaver Stops
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                adbCommand(
                                    'adb shell settings get system screen_off_timeout'
                                )
                            }
                        >
                                Time Until Screensaver Starts
                        </button>
                    </div>
                    <div className="group2 vcenter">
                        <button
                            type="button"
                            onClick={() => {
                                setScreensaver();
                            }}
                        >
                                Set Screensaver
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                adbCommand(
                                    'adb shell settings put secure screensaver_components com.amazon.bueller.photos/.daydream.ScreenSaverService'
                                );
                                adbCommand(
                                    'sleep 1 & adb shell settings get secure screensaver_components'
                                );
                            }}
                        >
                                Reset Screensaver
                        </button>
                        <a
                            href="https://clients3.google.com/cast/chromecast/home/v/c9541b08"
                            rel="noreferrer"
                            target="_blank"
                        >
                            <button type="button">
                                    Google Screensaver Demo
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            <div className="vcenter">
                <h2>Debloat Tools</h2>
                <button type="button" onClick={() => debloat()}>
                        Run Debloat Commands
                </button>
            </div>
        </>
    )
}

export default FireStickActions
