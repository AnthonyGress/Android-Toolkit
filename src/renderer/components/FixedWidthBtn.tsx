
import { useTerminalContext } from '../context/useTerminalContext';
import { AdbCommand } from '../types';

interface Props {
    adb?: AdbCommand,
    command?: string,
    title: string,
    customAction?: () => unknown,
    disabled?: boolean
}

export const FixedWidthBtn = ({ adb, command, title, customAction, disabled=false }: Props) => {
    const terminal = useTerminalContext();

    const terminalFeedback = (actionTitle: string) => {
        switch (actionTitle) {
        case 'Connect':
            console.log('Connecting....');
            terminal?.setTerminalOutput('Attempting to Connect....');
            break;

        default:
            terminal?.setTerminalOutput(`Running Command for ${title}....`);
            break;
        }
    };

    return (
        <button
            style={{ width: '12rem' }}
            disabled={disabled}
            onClick={() => {
                terminalFeedback(title);
                if (customAction) {
                    customAction();
                } else {
                    if (adb && command){
                        adb(command);
                    }
                }
            }
            }
        >
            {title}
        </button>
    );
};

