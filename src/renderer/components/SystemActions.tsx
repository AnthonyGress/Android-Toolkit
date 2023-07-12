import { Box, Grid } from '@mui/material';
import { FixedWidthBtn } from './FixedWidthBtn';
import { AdbProps, ShellCommand } from '../types';

interface Props extends AdbProps{
    shellCommand: ShellCommand
}

export const SystemActions = ({ adbCommand, shellCommand }: Props) => {
    return (
        <Grid container spacing={2} justifyContent={'center'}>
            <Grid item sm={12} md={4} lg={4} mt={2}>
                <Box className='vcenter' gap={2}>
                    <FixedWidthBtn adb={shellCommand} command={navigator.platform.includes('Win') ? 'powershell' : 'terminal'} title='Terminal'/>
                    <FixedWidthBtn adb={adbCommand} command={'adb shell dumpsys diskstats'} title='Disk Info'/>
                    <FixedWidthBtn adb={adbCommand} command={'adb shell dumpsys wifi'} title='WiFi Info'/>
                </Box>
            </Grid>

            <Grid item sm={12} md={4} lg={4} mt={2}>
                <Box className="vcenter" gap={2}>
                    <FixedWidthBtn adb={adbCommand} command={'adb shell dumpsys cpuinfo'} title='CPU Info'/>
                    <FixedWidthBtn adb={adbCommand} command={'adb shell dumpsys usagestats'} title='Usage Info'/>
                    <FixedWidthBtn adb={adbCommand} command={'adb shell dumpsys meminfo'} title='Memory Info'/>
                </Box>
            </Grid>

            <Grid item sm={12} md={4} lg={4} mt={2}>
                <Box className="vcenter" gap={2}>
                    <FixedWidthBtn adb={adbCommand} command={'adb shell cat /system/build.prop'} title='Hardware Info'/>
                    <FixedWidthBtn adb={adbCommand} command={'adb shell getprop ro.build.version.release'} title='OS Version'/>
                    <FixedWidthBtn adb={adbCommand} command={'adb shell screencap -p "/sdcard/screenshot.png"'} title='Device Screenshot'/>
                </Box>
            </Grid>
        </Grid>
    );
};
