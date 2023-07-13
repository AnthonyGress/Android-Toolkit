import { FormEvent, useState } from 'react';
import { FixedWidthBtn } from './FixedWidthBtn';
import { Box, Divider, Typography } from '@mui/material';
import { adbCommand } from '../api';

export const ConnectionActions = () => {
    const [ipAddress, setIpAddress] = useState('');
    const [pairingIp, setPairingIp] = useState('');
    const [pairingCode, setPairingCode] = useState('');

    const onSubmitConnect = (e: FormEvent) => {
        e.preventDefault();
        adbCommand(`adb connect ${ipAddress}`);
    };

    const onSubmitPairing = (e: FormEvent) => {
        e.preventDefault();
        console.log(`adb pair ${pairingIp},${pairingCode}`);

        adbCommand(`adb pair ${pairingIp},${pairingCode}`);
    };

    const updateIp = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setIpAddress(event.target.value);
    };

    const updatePairingIp = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPairingIp(event.target.value);
    };

    const updatePairingCode = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setPairingCode(event.target.value);
    };

    return (
        <>
            <Box mt={2}>
                <Box className="center" mb={2}>
                    <Typography fontSize={24} color='white'>ADB Connect</Typography>
                </Box>

                <form onSubmit={onSubmitConnect}>
                    <Box display={'flex'} justifyContent={'center'} sx={{ flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' } }} >
                        <input
                            type="text"
                            value={ipAddress}
                            onChange={updateIp}
                            placeholder="Device ip:port"
                            className="ip-input"
                            required
                        />
                        <Box ml={{ xs: 0, md:1 }} sx={{ marginTop: { xs: 2, sm: 2, md: 0 } }} display={'flex'} justifyContent={'center'}>
                            <FixedWidthBtn title='Connect' command={`adb connect ${ipAddress}`}/>
                        </Box>
                    </Box>
                </form>
            </Box>

            <Box mt={2} gap={2} display={'flex'} justifyContent={'center'} flexDirection={{ xs: 'column', md: 'row' }} alignItems={'center'}>
                <FixedWidthBtn adb={adbCommand} command={'adb disconnect'} title='Disconnect'/>
                <FixedWidthBtn adb={adbCommand} command={'adb devices'} title='List Devices'/>
            </Box>

            <Box mt={4} mb={4}>
                <Divider style={{ width:'100%', backgroundColor: 'white' }}/>
            </Box>


            <Box mt={2}>
                <Box className="center" mb={2}>
                    <Typography fontSize={24} color='white'>ADB Pair</Typography>
                </Box>
                <form onSubmit={onSubmitPairing}>
                    <Box display={'flex'} justifyContent={'center'} sx={{ flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' } }} >
                        <input
                            type="text"
                            value={pairingIp}
                            onChange={updatePairingIp}
                            placeholder="Device pairing ip:port"
                            className="ip-input"
                            required
                        />
                        <Box ml={{ sm: 0, md:1 }} mt={{ sm: 1, md: 0 }} className='center'>
                            <input
                                type="text"
                                value={pairingCode}
                                onChange={updatePairingCode}
                                placeholder="Pairing Code"
                                className="pairing-code"
                                required
                            />
                        </Box>
                    </Box>
                    <Box sx={{ marginTop: { xs: 2, sm: 2, md: 2 } }} display={'flex'} justifyContent={'center'}>
                        <FixedWidthBtn title='Pair' command={`adb pair ${ipAddress},${pairingCode}`}/>
                    </Box>
                </form>
            </Box>

        </>
    );
};
