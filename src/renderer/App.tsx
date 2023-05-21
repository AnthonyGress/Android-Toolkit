import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../../assets/icons/logo.png';
import './App.css';
import SystemActions from './components/SystemActions';
import FireStickActions from './components/FireStickActions';
import SideloadAction from './components/SideloadAction';
import { ConnectionActions } from './components/ConnectionActions';

declare global {
    interface Window {
        api?: any;
    }
}

const Main = () => {
    const [terminalOutput, setTerminalOutput] = React.useState('');
    const [showFirestickTools, setShowFirestickTools] = React.useState<boolean>();
    const [showSystemTools, setShowSystemTools] = React.useState<boolean>();
    const outputRef = React.useRef(null);

    window.addEventListener('message', (event: MessageEvent) => {
        // event.source === window means the message is coming from the preload
        if (event.source === window) {
            console.log('from preload:', event.data);
        }
        if (event.source === window && typeof event.data === 'string') {
            let stringData = JSON.stringify(event.data);
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

    return (
        <main>
            <div className="splash">
                <img width="120px" alt="icon" src={icon} className="spin" style={{marginRight: '20px'}} />
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
                    <ConnectionActions adbCommand={adbCommand}/>
                </div>

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
