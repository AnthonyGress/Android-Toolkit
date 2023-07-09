import { Box, Divider, Grid, Typography } from '@mui/material';
import { FixedWidthBtn } from './FixedWidthBtn';
import { AdbProps } from '../types';
import { DEBLOAT_CMDS } from '../constants/debloatCommands';

export const FireStickActions = ({ adbCommand }: AdbProps) => {

    const setScreensaver = () => {
        adbCommand(
            'adb shell settings put secure screensaver_components uk.co.liamnewmarch.daydream/uk.co.liamnewmarch.daydream.WebsiteDaydreamService '
        );

        setTimeout(
            () =>
                adbCommand(
                    'adb shell settings get secure screensaver_components'
                ),
            2000
        );
    };

    const resetScreensaver = () => {
        adbCommand(
            'adb shell settings put secure screensaver_components com.amazon.bueller.photos/.daydream.ScreenSaverService'
        );
        adbCommand(
            'sleep 1 & adb shell settings get secure screensaver_components'
        );
    };

    const screensaverDemo = () => {
        window.open('https://clients3.google.com/cast/chromecast/home/v/c9541b08');
    };

    const debloat = () => {
        DEBLOAT_CMDS.map((command) => adbCommand(command));
    };

    return (
        <>

            <Box className="center" mt={2}>
                <Typography fontSize={24} color='white'>Screensaver Tools</Typography>
            </Box>

            <Grid container spacing={2} justifyContent={'center'} mb={2}>
                <Grid item sm={12} md={12} lg={6} mt={2}>
                    <Box className='vcenter' gap={2}>
                        <FixedWidthBtn adb={adbCommand} command={'adb shell settings get secure screensaver_components'} title='Check Screen Saver'/>
                        <FixedWidthBtn adb={adbCommand} command={'adb shell settings get secure sleep_timeout'} title='Time Until Screensaver Stops'/>
                        <FixedWidthBtn adb={adbCommand} command={'adb shell settings get system screen_off_timeout'} title='Time Until Screensaver Starts'/>
                    </Box>
                </Grid>

                <Grid item sm={12} md={12} lg={6} mt={2} >
                    <Box className='vcenter' gap={2}>
                        <FixedWidthBtn customAction={setScreensaver} title='Set Screensaver'/>
                        <FixedWidthBtn customAction={resetScreensaver} title='Reset Screensaver'/>
                        <FixedWidthBtn customAction={screensaverDemo} title='Google Screensaver Demo'/>
                    </Box>
                </Grid>
            </Grid>

            <Divider style={{ width:'100%', backgroundColor: 'white' }}/>

            <Box className="vcenter" mt={2}>
                <Typography fontSize={24} color='white'>Debloat Tools</Typography>
                <Box mt={4}>
                    <FixedWidthBtn customAction={debloat} title='Run Debloat Commands'/>
                </Box>
            </Box>

        </>
    );
};
