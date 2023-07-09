export const POWERSHELL_CMD = 'start powershell -noexit -command "[console]::windowwidth=80; [console]::windowheight=35; [console]::bufferwidth=[console]::windowwidth; cd .\\platform-tools; Get-Content -Raw ..\\resources\\assets\\art.txt; Write-Host "Run ADB commands here" -nonewline; Write-Host "`n";Write-Host "Ex: .\\adb COMMAND"; Write-Host "`n""';

export const TERMINAL_CMD = 'open -a Terminal /Applications/"Android Toolkit.app"/Contents/platform-tools';

export const SMART_TUBE_URL = 'https://github.com/yuliskov/SmartTubeNext/releases/download/18.28s/STube_ststable_v18.28_r_armeabi-v7a.apk';

export const SPOTUBE_URL = 'https://github.com/KRTirtho/spotube/releases/download/v3.0.0/Spotube-android-all-arch.apk';

export const LAUNCHER_MANAGER_URL = 'https://forum.xda-developers.com/attachments/lm-fos-1-1-8-apk.5862251/';

export const WOLF_LAUNCHER_URL = 'https://www.techdoctoruk.com/?sdm_process_download=1&download_id=4471';

export const REVANCED_URL = 'https://github.com/revanced/revanced-manager/releases/download/v1.3.8/revanced-manager-v1.3.8.apk';

export let apkPath: string;
export const username = process.env.USERNAME;

switch (process.platform) {
case 'darwin':
    apkPath = '/Applications/Android Toolkit.app/Contents/apks/';
    break;

case 'win32':
    apkPath = `C:\\Users\\${username}\\AppData\\Local\\Programs\\android-toolkit\\apks\\`;
    break;

case 'linux':
    apkPath = '/usr/bin/Android-Toolkit/apks/';
    break;

default:
    break;
}
