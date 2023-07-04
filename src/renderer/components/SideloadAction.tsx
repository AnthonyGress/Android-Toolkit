import { useRef, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { FixedWidthBtn } from './FixedWidthBtn';
import ClearIcon from '@mui/icons-material/Clear';
import { useTerminalContext } from 'renderer/context/useTerminalContext';

export const SideloadAction = ({ adbCommand }: {adbCommand: Function}) => {
    const [selectedFile, setSelectedFile] = useState<any>('');
    const inputRef = useRef<any>();
    const terminal = useTerminalContext();


    const sideload = () => {
        console.log(`Selected file - ${selectedFile.path}`);
        terminal?.setTerminalOutput(`Sideloading ${selectedFile.name}....`)
        adbCommand(`adb install "${selectedFile.path}"`);
    };

    return (
        <Grid container spacing={2} justifyContent={'center'} >
            <Grid item xs={12} mt={2}>
                <Box>
                    <Box>
                        <input
                            onChange={(e: any) =>
                                setSelectedFile(e.currentTarget.files[0])
                            }
                            type="file"
                            id="files"
                            name="files"
                            className="form-control"
                            ref={inputRef}
                            style={{ display: 'none' }}
                        />
                        <Box sx={{ display: 'flex', flexDirection:{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }, justifyContent: 'center' }}>
                            <Box className='vcenter'>
                                <FixedWidthBtn customAction={() => inputRef.current.click()} title='Select File'/>
                            </Box>
                            <Box alignItems={'center'} display={'flex'} justifyContent={'center'} sx={{ marginLeft: { lg: 2 } }}>
                                <Typography noWrap color={'white'}>
                                    {selectedFile ? `${selectedFile.name}` : 'No File Selected'}
                                </Typography>
                                <Box className='center' ml={1}>
                                    <ClearIcon sx={{ color: 'white', cursor: 'pointer' }} onClick={() => {
                                        inputRef.current.value = null;
                                        setSelectedFile('');
                                    }}/>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className='center' mt={2}>
                        <FixedWidthBtn customAction={sideload} title='Sideload' disabled={!selectedFile}/>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}
