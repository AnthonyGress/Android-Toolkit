import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../../assets/icons/logo.png';
import './App.css';
import SystemActions from './components/SystemActions';
import FireStickActions from './components/FireStickActions';
import SideloadAction from './components/SideloadAction';

declare global {
    interface Window {
        api?: any;
    }
}

const Main = () => {
    const outputRef = React.useRef(null);

    const [ipAddress, setIpAddress] = React.useState('');
    const [terminalOutput, setTerminalOutput] = React.useState('');
    const [showFirestickTools, setShowFirestickTools] = React.useState<boolean>();
    const [showSystemTools, setShowSystemTools] = React.useState<boolean>();

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

    const onSubmit = (e: any) => {
        e.preventDefault();
        adbCommand(`adb connect ${ipAddress}`);
    };

    const updateIp = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setIpAddress(event.target.value);
    };

    return (
        <main>
            <div className="splash">
                <img width="120px" alt="icon" src={icon} className="spin" />
                <h1>Android Toolkit</h1>
            </div>
            <div className="terminal-wrapper center">
                <div className="output-terminal">
                    <div className="output-text-box">
                        <pre className="output-text" ref={outputRef}>
                            <span className="dollar">$</span>
                            {terminalOutput}
                            {/* <span className="blinking">_</span> */}
                        </pre>
                    </div>
                </div>
            </div>
            <div className="dashboard">
                <div className="connect">
                    <div className="center">
                        <h2>ADB Connection Tools</h2>
                    </div>
                    <form className="connect-ip" onSubmit={onSubmit}>
                        <input
                            type="text"
                            value={ipAddress}
                            onChange={updateIp}
                            placeholder="Enter your Firestick's ip address"
                            className="ip-input"
                        />
                        <button
                            className="connect-btn"
                            type="submit"
                            onClick={() =>
                                adbCommand(`adb connect ${ipAddress}`)
                            }
                        >
                            Connect
                        </button>
                    </form>
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
<<<<<<< HEAD
=======
                <div className="vcenter">
                    <h2>Sideload Files</h2>
                    <div className="button-group">
                        <input
                            onChange={(e: any) =>
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
>>>>>>> 53e0410193396430d56d70aaf7462760f40621b2

                <SideloadAction adbCommand={adbCommand} />

                <h2 align='center' onClick={() => setShowFirestickTools(!showFirestickTools)} style={{cursor: 'pointer'}}>Firestick Tools</h2>
                { showFirestickTools && <FireStickActions adbCommand={adbCommand} /> }

                <div className="system-info">
                    <div className="center" onClick={() => setShowSystemTools(!showSystemTools)}>
                        <h2 style={{cursor: 'pointer'}}>System Tools</h2>
                    </div>
                    { showSystemTools &&<SystemActions adbCommand={adbCommand} shellCommand={shellCommand} /> }
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
