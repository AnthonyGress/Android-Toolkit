import { FormEvent, useState } from 'react';
import { FixedWidthBtn } from './FixedWidthBtn';
import { Autocomplete, Box, createFilterOptions, Divider, FilterOptionsState, InputAdornment, TextField, Typography } from '@mui/material';
import { adbCommand } from '../api';
import { styles } from '../theme';
import { v4 } from 'uuid';

export const ConnectionActions = () => {
    const [ipAddress, setIpAddress] = useState('');
    const [pairingIp, setPairingIp] = useState('');
    const [pairingCode, setPairingCode] = useState('');

    const handleChange = (_event: any, newValue: string | null) => setIpAddress(newValue ? newValue : '');

    const recentlyConnected = localStorage.getItem('recentlyConnected');
    console.log('recentlyConnected', recentlyConnected);

    const recentlyConnectedArr: string[] | undefined = recentlyConnected && JSON.parse(recentlyConnected);
    console.log('recentlyConnectedArr', recentlyConnectedArr);

    if (recentlyConnectedArr && recentlyConnectedArr.length > 5) {
        for (let i = 0; i < recentlyConnectedArr.length - 5; i++) {
            recentlyConnectedArr.pop();
        }
    }

    const onSubmitConnect = (e: FormEvent) => {
        e.preventDefault();

        if (recentlyConnectedArr) {
            const existingIp = recentlyConnectedArr.find((e: string) => e === ipAddress);
            if (!existingIp && ipAddress) {
                recentlyConnectedArr.unshift(ipAddress);
                localStorage.setItem('recentlyConnected', JSON.stringify(recentlyConnectedArr));
            }
        } else {
            localStorage.setItem('recentlyConnected', JSON.stringify([ipAddress]));
        }

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
                        {/* <input
                            type="text"
                            value={ipAddress}
                            onChange={updateIp}
                            placeholder="Device ip:port"
                            className="ip-input"
                            required
                        /> */}

                        <Box sx={styles.center}>
                            <Autocomplete
                                freeSolo
                                options={recentlyConnectedArr && recentlyConnectedArr.length > 0 ? recentlyConnectedArr : []}
                                renderOption={(props, option: string) => (
                                    <li {...props} key={v4()}>
                                        {option}
                                    </li>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'text',
                                        }}
                                        placeholder={'Device ip:port'}
                                        sx={{ backgroundColor: 'white', borderRadius: '8px', borderColor: 'white', minWidth: '30vw' }}
                                        onChange={updateIp}
                                    />
                                )}
                                onChange={handleChange}
                                sx={{ width: '95%', borderRadius: '8px', borderColor: 'white',  '& .MuiOutlinedInput-root': {
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '0'
                                },
                                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    border: '1px solid #eee'
                                }
                                }}
                            />
                        </Box>

                        <Box ml={{ xs: 0, md:2 }} sx={{ marginTop: { xs: 2, sm: 2, md: 0 } }} display={'flex'} justifyContent={'center'}>
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
