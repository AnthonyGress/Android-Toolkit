import { useState, useRef } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../../assets/icons/logo.png';
import './App.css';
import { SystemActions } from './components/SystemActions';
import { FireStickActions } from './components/FireStickActions';
import { SideloadAction } from './components/SideloadAction';
import { AccordionDropdown } from './components/AccordionDropwdown';
import { ConnectionActions } from './components/ConnectionActions';
import { Box, Typography } from '@mui/material';
import packageJson from '../../release/app/package.json';
import InfoIcon from '@mui/icons-material/Info';
import RefreshIcon from '@mui/icons-material/Refresh';
import { TerminalProvider } from './context/TerminalProvider';
import { useTerminalContext } from './context/useTerminalContext';
import { TerminalContextType } from './context/TerminalContext';

declare global {
    interface Window {
        api?: any;
    }
}

const Main = () => {
    const [showInfoPage, setShowInfoPage] = useState(false);
    const terminal: TerminalContextType = useTerminalContext();
    const outputRef = useRef(null);

    window.addEventListener('message', (event: MessageEvent) => {
        if (event.source === window && typeof event.data === 'string') {
            let stringData = JSON.stringify(event.data);
            stringData = stringData.replace(new RegExp('\\\\n', 'g'), '\n');
            stringData = stringData.replace(new RegExp('\\\\r', 'g'), '\n');
            stringData = stringData.slice(1, -1);
            terminal.setTerminalOutput(stringData)
        }
    });

    const adbCommand = (command: string) => {
        window.api.adbCommand(command);
    };

    const shellCommand = (command: string) => {
        window.api.shellCommand(command);
    };

    return (
        <>
            <Box className="splash">
                <img width="120px" alt="icon" src={icon} className="spin" style={{ marginRight: '20px' }} />
                <Typography variant='h3'>Android Toolkit</Typography>
            </Box>
            <Box className="terminal-wrapper center">
                <Box className="output-terminal">
                    <Box className="output-text-box">
                        <pre className="output-text" ref={outputRef}>
                            <span className="dollar">$</span>
                            {terminal.terminalOutput}
                        </pre>
                    </Box>
                </Box>
            </Box>
            <Box>
                <AccordionDropdown title='ADB Connection Tools' defaultExpanded>
                    <ConnectionActions adbCommand={adbCommand}/>
                </AccordionDropdown>

                <AccordionDropdown title='Sideload Tools'>
                    <SideloadAction adbCommand={adbCommand} />
                </AccordionDropdown>

                <AccordionDropdown title='FireStick Tools'>
                    <FireStickActions adbCommand={adbCommand} />
                </AccordionDropdown>

                <AccordionDropdown title='System Tools'>
                    <SystemActions adbCommand={adbCommand} shellCommand={shellCommand} />
                </AccordionDropdown>
            </Box>
            {showInfoPage ? (
                <Box id="info-page">
                    <Box className="button-group">
                        <Box className="center">{`Version: ${packageJson.version}`}</Box>
                        <a
                            href="https://anthonygress.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Box
                                className="center"
                                style={{
                                    marginTop: '10px',
                                    marginBottom: '10px',
                                }}
                                ml={2}
                            >
                                <button>{'Built By Anthony'}</button>
                            </Box>
                        </a>
                    </Box>
                </Box>
            ) : null}
            <Box className="footer-btns">

                <InfoIcon sx={{ cursor: 'pointer' }} onClick={() => setShowInfoPage(!showInfoPage)}/>
                <RefreshIcon sx={{ cursor: 'pointer' }} onClick={() => location.reload()}/>

            </Box>
        </>
    );
};

export default function App() {

    return (
        <Router>
            <Switch>
                <TerminalProvider>
                    <Route path="/" component={Main} />
                </TerminalProvider>
            </Switch>
        </Router>
    );
}
