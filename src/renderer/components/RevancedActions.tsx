import { Box, Grid, Typography } from '@mui/material';
import { FixedWidthBtn } from './FixedWidthBtn';
import { adbCommand } from '../api';

export const RevancedActions = () => {
    return (
        <Grid container spacing={2}  >
            <Box flexDirection={{ xs: 'column', sm: 'column', md: 'row' }} display={'flex'} justifyContent={'space-between'} width={'100%'}>
                <Grid item xs={12} md={6} mb={2}>
                    <Box className="center" mt={2} mb={1}>
                        <Typography fontSize={24} color='white'>Install Tools</Typography>
                    </Box>
                    <Box>
                        <Box className='vcenter'>
                            <Box className='vcenter' gap={2}>

                                <FixedWidthBtn customAction={() => adbCommand('microg')} title='Install MicroG'/>
                                <FixedWidthBtn customAction={() => adbCommand('revanced-manager')} title='Install Revanced Manager'/>
                                <FixedWidthBtn customAction={() => adbCommand('youtube')} title='Install Patchable Youtube APK'/>
                                <FixedWidthBtn customAction={() => adbCommand('reddit')} title='Install Patchable Reddit APK'/>

                            </Box>
                        </Box>
                        <Box className='center' mt={2}>

                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6} mb={2} mt={2}>
                    <Box className="center" mb={1}>
                        <Typography fontSize={24} color='white'>Revanced Guide (Unofficial)</Typography>
                    </Box>
                    <Box>
                        <Box>
                            <Box sx={{ display: 'flex', flexDirection:{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }, justifyContent: 'center' }}>
                                <Box className='vcenter'>
                                    <FixedWidthBtn customAction={() => window.open('https://www.reddit.com/r/revancedapp/comments/xlcny9/revanced_manager_guide_for_dummies/')} title='Build Revanced Guide'/>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Box>
        </Grid>
    );
};
