import './App.css';
import icon from '../../assets/icons/logo.png';
import packageJson from '../../release/app/package.json';
import InfoIcon from '@mui/icons-material/Info';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { Route, MemoryRouter as Router, Switch } from 'react-router-dom';
import { AccordionDropdown } from './components/AccordionDropwdown';
import { ConnectionActions } from './components/ConnectionActions';
import { FireStickActions } from './components/FireStickActions';
import { SideloadAction } from './components/SideloadAction';
import { SystemActions } from './components/SystemActions';
import { ITerminalContext } from './context/TerminalContext';
import { TerminalProvider } from './context/TerminalProvider';
import { useTerminalContext } from './context/useTerminalContext';

declare global {
    interface Window {
        api?: any;
    }
}

const Main = () => {
    const [showInfoPage, setShowInfoPage] = useState(false);
    const terminal: ITerminalContext = useTerminalContext();
    const outputRef = useRef(null);

    const adbCommand = (command: string) => {
        window.api.adbCommand(command);
    };

    const shellCommand = (command: string) => {
        window.api.shellCommand(command);
    };

    window.addEventListener('message', (event: MessageEvent) => {
        if (event.source === window && typeof event.data === 'string') {
            let stringData = JSON.stringify(event.data);
            stringData = stringData.replace(new RegExp('\\\\n', 'g'), '\n');
            stringData = stringData.replace(new RegExp('\\\\r', 'g'), '\n');
            stringData = stringData.replace(new RegExp('\\\\t', 'g'), '    ');
            stringData = stringData.slice(1, -1);
            terminal.setTerminalOutput(stringData);
        }
    });

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

            <Box className={showInfoPage ? 'visible' : 'hidden'}>
                <Box className="button-group">
                    <Box className="center">{`Version: ${packageJson.version}`}</Box>
                    <Box
                        className="center"
                        style={{
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                        ml={2}
                    >
                        <button className='signature' onClick={() => window.open('https://anthonygress.dev')}>
                            {'Built By Anthony'}
                        </button>
                    </Box>
                </Box>
            </Box>
            <Box className="footer-btns">

                <InfoIcon sx={{ cursor: 'pointer' }} onClick={() => {
                    if (!showInfoPage){
                        window.scrollTo(0, document.body.scrollHeight);
                    }
                    setShowInfoPage(!showInfoPage);
                }}/>
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
