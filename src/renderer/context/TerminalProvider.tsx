import { useState } from 'react';
import { TerminalContext } from './TerminalContext';

export const TerminalProvider = ({ children }: any) => {
    const [terminalOutput, setTerminalOutput] = useState<string>('');

    const { Provider } = TerminalContext;

    return (
        <Provider value={{ terminalOutput, setTerminalOutput }}>
            {children}
        </Provider>
    )
}
