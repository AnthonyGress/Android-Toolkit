import { useState } from 'react';
import { TerminalContext } from './TerminalContext';

type Props = {
    children: React.ReactNode
};

export const TerminalProvider: React.FC<Props>= ({ children } ) => {
    const [terminalOutput, setTerminalOutput] = useState<string>('');

    const { Provider } = TerminalContext;

    return (
        <Provider value={{ terminalOutput, setTerminalOutput }}>
            {children}
        </Provider>
    );
};
