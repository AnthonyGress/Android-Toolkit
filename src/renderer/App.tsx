import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../../assets/techx.png';
import debloatCommands from '../../assets/debloatCommands';
import './App.css';

declare global {
    interface Window {
      api?: any;
    }
  }

const Main = () => {

    const outputRef = React.useRef(null);

    const [ipAddress, setIpAddress] = React.useState('');
    const [terminalOutput, setTerminalOutput] =
        React.useState('Command Output ');
    const [selectedFile, setSelectedFile] = React.useState<string>('');

    // const getIp = () => {
    //     window.api.ipAddress('Hello from the front');
    // };

    window.addEventListener('message', (event: MessageEvent) => {
        // event.source === window means the message is coming from the preload
        // script, as opposed to from an <iframe> or other source.
        if (event.source === window) {
            console.log('from preload:', event.data);
        }
        if (event.source === window && typeof event.data === 'string') {
            // console.log('from preload:', event.data);
            let stringData = JSON.stringify(event.data);
            // console.log(stringData);

            stringData = stringData.replace(new RegExp('\\\\n', 'g'), '\n');
            stringData = stringData.slice(1, -1);
            setTerminalOutput(stringData);
        }
    });

    const adbCommand = (command: string) => {
        window.api.adbCommand(command);
    };

    const shellCommand = (command: string) => {
        window.api.shellCommand(command);
    };

    const debloat = () => {
        debloatCommands.map((command) => adbCommand(command));
    };

    const setScreensaver = () => {
        adbCommand(
            'adb shell settings put secure screensaver_components uk.co.liamnewmarch.daydream/uk.co.liamnewmarch.daydream.WebsiteDaydreamService '
        );
        // adbCommand(
        //     'adb shell settings get secure screensaver_components'
        // );
        setTimeout(
            () =>
                adbCommand(
                    'adb shell settings get secure screensaver_components'
                ),
            2000
        );
    };

    const sideload = (filePath: string) => {
        console.log(`Selected file - ${filePath}`);
        adbCommand(`adb sideload ${filePath}`);
    };
    
    const updateIp = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setIpAddress(event.target.value);
    };

    return (
        <main>
            <div className="splash">
                <img width="200px" alt="icon" src={icon} />
                <h1>FireTV Toolkit</h1>
            </div>
            <div className="terminal-wrapper center">
                <div className="output-terminal">
                    <div className="output-text-box">
                        <pre className="output-text" ref={outputRef}>
                            $ {terminalOutput}
                        </pre>
                    </div>
                </div>
            </div>
            <div className="dashboard">
                <div className="connect">
                    <div className="center">
                        <h2>ADB Connection Tools</h2>
                    </div>
                    <div className="connect-ip">
                        <input
                            type="text"
                            value={ipAddress}
                            onChange={updateIp}
                            placeholder="Enter your Firestick's ip address"
                            className="ip-input"
                        />
                        <button
                            className="connect-btn"
                            type="button"
                            onClick={() =>
                                adbCommand(`adb connect ${ipAddress}`)
                            }
                        >
                            Connect
                        </button>
                    </div>
                    <div className="button-group group1">
                        <button
                            type="button"
                            onClick={() => adbCommand('adb disconnect')}
                        >
                            Disconnect
                        </button>
                        <button
                            type="button"
                            onClick={() => adbCommand('adb devices')}
                        >
                            Connected Devices
                        </button>
                    </div>
                </div>
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
                <div className="vcenter">
                    <h2>Sideload Files</h2>
                    <div className="button-group">
                        <input
                            onChange={(e: any ) =>
                                setSelectedFile(e.currentTarget.files[0].path)
                            }
                            type="file"
                            id="files"
                            name="files"
                            className="form-control"
                        />
                        <button
                            type="submit"
                            onClick={() => sideload(selectedFile)}
                        >
                            Sideload
                        </button>
                    </div>
                </div>
                <div className="system-info">
                    <div className="center">
                        <h2>System Info</h2>
                    </div>
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
                            {/* <button
                                type="button"
                                onClick={() => adbCommand('pwd')}
                            >
                                pwd
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Main} />
            </Switch>
        </Router>
    );
}
