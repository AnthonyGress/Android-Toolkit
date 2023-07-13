import { ChangeEvent, useRef, useState } from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { FixedWidthBtn } from './FixedWidthBtn';
import { useTerminalContext } from '../context/useTerminalContext';

import ClearIcon from '@mui/icons-material/Clear';
import { adbCommand } from '../api';

export const ApkActions =  () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const terminal = useTerminalContext();
    const fileRef = useRef<any>();

    const handleChangeFile =(e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const files = target.files;

        if (files) {
            setSelectedFile(files[0]);
        }
    };

    const installApk = () => {
        if (selectedFile) {
            console.log(`Selected file - ${selectedFile.path}`);
            terminal?.setTerminalOutput(`Installing ${selectedFile.name}....`);
            adbCommand(`adb install -r -d "${selectedFile.path}"`);
        }
    };

    return (
        <Grid container spacing={2}  >
            <Box flexDirection={{ xs: 'column', md: 'row' }} display={'flex'} justifyContent={'space-between'} width={'100%'}>
                <Grid item xs={12} md={6} mb={2}>
                    <Box className="center" mt={2} mb={1}>
                        <Typography fontSize={24} color='white'>Install Single APK</Typography>
                    </Box>
                    <Box>
                        <Box>
                            <input
                                onChange={(e) => handleChangeFile(e)}
                                type="file"
                                name="files"
                                accept='.apk'
                                className="form-control"
                                ref={fileRef}
                                style={{ display: 'none' }}
                            />
                            <Box sx={{ display: 'flex', flexDirection:{ xs: 'column' }, justifyContent: 'center' }}>
                                <Box className='vcenter'>
                                    <FixedWidthBtn customAction={() => fileRef.current.click()} title='Select APK File'/>
                                </Box>
                                <Box alignItems={'center'} display={'flex'} justifyContent={'center'} sx={{ marginLeft: { lg: 2 }, marginTop: { md: 1, lg: 0 } }}>
                                    <Typography noWrap color={'white'}>
                                        {selectedFile ? `${selectedFile.name}` : 'No File Selected'}
                                    </Typography>
                                    <Box className='center' ml={1}>
                                        <ClearIcon sx={{ color: 'white', cursor: 'pointer' }} onClick={() => {
                                            fileRef.current.value = null;
                                            setSelectedFile(null);
                                        }}/>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className='center' mt={2}>
                            <FixedWidthBtn customAction={installApk} title='Install' disabled={!selectedFile}/>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6} mb={2} mt={2}>
                    <Box className="center" mb={1}>
                        <Typography fontSize={24} color='white'>Batch Install APKs</Typography>
                    </Box>
                    <Box>
                        <Box>
                            <Box sx={{ display: 'flex', flexDirection:{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }, justifyContent: 'center' }}>
                                <Box className='vcenter'>
                                    <FixedWidthBtn customAction={() => adbCommand('batchInstall')} title='Select APK Folder'/>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Box>

            <Divider style={{ width:'100%', backgroundColor: 'white' }}/>
            <Box flexDirection={{ xs: 'column', md: 'row' }} display={'flex'} justifyContent={'space-between'} width={'100%'}>
                <Grid item xs={12} md={6} mb={2} mt={2}>
                    <Box className="center" mb={1}>
                        <Typography fontSize={24} color='white'>Quick Install TV Apps</Typography>

                    </Box>
                    <Box>
                        <Box>
                            <Box sx={{ display: 'flex', flexDirection:{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }, justifyContent: 'center' }}>
                                <Box className='vcenter' gap={2}>
                                    <FixedWidthBtn adb={adbCommand} command={'smarttube'} title='SmartTube (YouTube)'/>
                                    <FixedWidthBtn adb={adbCommand} command={'launcher manager'} title='Launcher Manager - FireTV'/>
                                    <FixedWidthBtn adb={adbCommand} command={'wolf launcher'} title='Wolf Launcher'/>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6} mb={2} mt={2}>
                    <Box className="center" mb={1}>
                        <Typography fontSize={24} color='white'>Quick Install Mobile Apps</Typography>
                    </Box>
                    <Box>
                        <Box>
                            <Box sx={{ display: 'flex', flexDirection:{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }, justifyContent: 'center' }}>
                                <Box className='vcenter' gap={2}>
                                    <FixedWidthBtn adb={adbCommand} command={'revanced'} title='YouTube Revanced'/>
                                    <FixedWidthBtn adb={adbCommand} command={'spotube'} title='Spotube (Spotify)'/>
                                    <FixedWidthBtn adb={adbCommand} command={'revanced-reddit'} title='Reddit Revanced'/>

                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Box>
        </Grid>
    );
};
