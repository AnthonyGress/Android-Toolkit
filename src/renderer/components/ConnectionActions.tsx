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
                <form onSubmit={onSubmit}>
                    <Box display={'flex'} justifyContent={'center'} sx={{ flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' } }} >
                        <input
                            type="text"
                            value={ipAddress}
                            onChange={updateIp}
                            placeholder="Enter your Device's ip address"
                            className="ip-input"
                        />
                        <Box ml={{ xs: 0, md:1 }} sx={{ marginTop: { xs: 2, sm: 2, md: 0 } }} display={'flex'} justifyContent={'center'}>
                            <FixedWidthBtn title='Connect' customAction={connectAdb}/>
                        </Box>
                    </Box>
                </form>
            </Box>
            <Box mt={2} gap={2} display={'flex'} justifyContent={'center'} flexDirection={{ xs: 'column', md: 'row' }} alignItems={'center'}>
                <FixedWidthBtn adb={adbCommand} command={'adb disconnect'} title='Disconnect'/>
                <FixedWidthBtn adb={adbCommand} command={'adb devices'} title='List Devices'/>
            </Box>
        </>
    );
};
