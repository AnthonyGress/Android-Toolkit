import React, { FormEvent } from 'react';
import { FixedWidthBtn } from './FixedWidthBtn';
import { AdbProps } from '../types';
import { Box } from '@mui/material';

export const ConnectionActions = ({ adbCommand }: AdbProps) => {
    const [ipAddress, setIpAddress] = React.useState('');

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        adbCommand(`adb connect ${ipAddress}`);
    };

    const connectAdb = () => {
        adbCommand(`adb connect ${ipAddress}`);
    };

    const updateIp = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setIpAddress(event.target.value);
    };

    return (
        <>
            <Box mt={2}>
                <form className="center" onSubmit={onSubmit}>
                    <input
                        type="text"
                        value={ipAddress}
                        onChange={updateIp}
                        placeholder="Enter your Device's ip address"
                        className="ip-input"
                    />
                    <FixedWidthBtn title='Connect' customAction={connectAdb}/>
                </form>
            </Box>
            <Box className="center" mt={2} gap={2}>
                <FixedWidthBtn adb={adbCommand} command={'adb disconnect'} title='Disconnect'/>
                <FixedWidthBtn adb={adbCommand} command={'adb devices'} title='List Devices'/>
            </Box>
        </>
    );
};
