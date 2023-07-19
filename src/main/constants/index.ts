export const POWERSHELL_CMD = 'start powershell -noexit -command "[console]::windowwidth=80; [console]::windowheight=35; [console]::bufferwidth=[console]::windowwidth; cd .\\platform-tools; Get-Content -Raw ..\\resources\\assets\\art.txt; Write-Host "Run ADB commands here" -nonewline; Write-Host "`n";Write-Host "Ex: .\\adb COMMAND"; Write-Host "`n""';

export const TERMINAL_CMD = 'open -a Terminal /Applications/"Android Toolkit.app"/Contents/platform-tools';

export const SMART_TUBE_URL = 'https://github.com/yuliskov/SmartTubeNext/releases/download/18.28s/STube_ststable_v18.28_r_armeabi-v7a.apk';

export const INFINITY_REDDIT_URL = 'https://github.com/KhoalaS/Infinity-For-Reddit/releases/latest/download/app-release.apk';

// export const REVANCED_SPOTIFY_URL = 'https://github.com/revanced-apks/build-apps/releases/download/147/spotify-revanced-v8.8.50.466-all.apk';

export const SPOTIFY_MOD_URL = 'https://download1638.mediafire.com/ltt2t112ktjgUyaHZhGUdtnW7-Fp-PlE2gmj_pS1bo01lp69Doip8bI8d_T0y-cB1HBF2NdbKWeCQERKqI9wFvv5uJj6zPGlUEe3ZFPRs_uW1WPwsQlzaYowVlw1UBS4uhJOviRb3lU5qpfA6WEwl8YS635-V2Xs0YArbNSyrbIC/gks82nqggqpk4de/spotify-mod.apk';

export const REVANCED_TIKTOK_URL = 'https://github.com/revanced-apks/build-apps/releases/download/147/tiktok-revanced-v30.3.4-all.apk';

export const REVANCED_YTMUSIC_URL = 'https://github.com/revanced-apks/build-apps/releases/download/147/music-revanced-v6.10.51-arm64-v8a.apk';

export const YOUTUBE_URL = 'https://d.apkpure.com/b/APK/com.google.android.youtube?versionCode=1538252224';

export const LAUNCHER_MANAGER_URL = 'https://forum.xda-developers.com/attachments/lm-fos-1-1-8-apk.5862251/';

export const WOLF_LAUNCHER_URL = 'https://www.techdoctoruk.com/?sdm_process_download=1&download_id=4471';

export const MICRO_G_URL ='https://github.com/inotia00/VancedMicroG/releases/download/v0.2.27.230755/microg.apk';

const BUFF = Buffer.from('aHR0cHM6Ly9kb3dubG9hZDkzOS5tZWRpYWZpcmUuY29tL2Z0NHh6Yno2cThkZ1M4ajl1V2s5dktkRTdyQ3llWU1ydjJyaW1ueUN5UzVYemY2SFJ2MHVTOUlrOTJqQ3ZUTXpFWWVOclI5OFFvSWJpdjlZTmJ0NDVNUTBhQzNMRFUzVXo3SWRiNXM4NlRORm1EVlROZVRZUjJPMDlfYjdzTHV0Z0dnbzJEYVZFOFlEZG5Uc1hkU3RnbnhEdW5EOThrd0pjd2J3RTYyQm1nL3Frd3luZjhpM2Q4ZGRlNi9ydi10eS5hcGs=', 'base64');

export const REVANCED_MANAGER_URL = 'https://github.com/revanced/revanced-manager/releases/download/v1.4.0/revanced-manager-v1.4.0.apk';

export const REVANCED_YOUTUBE_URL = BUFF.toString('ascii');

export const REVANCED_REDDIT_URL = 'https://github.com/revanced-apks/build-apps/releases/download/147/reddit-revanced-v2023.26.0-all.apk';

export const REDDIT_URL = 'https://d.apkpure.com/b/APK/com.reddit.frontpage?version=latest';

export const IS_WIN = process.platform === 'win32';

export const USERNAME= process.env.USERNAME;
export const WINDOWS_RESOURCE_PATH = `C:\\Users\\${USERNAME}\\AppData\\Local\\Programs\\android-toolkit\\resources`;

export let APK_PATH: string;
export let ADB_PATH: string;
export const USER_OS = process.platform;

switch (USER_OS) {
case 'darwin':
    console.log('MacOS');
    APK_PATH = '/Applications/Android Toolkit.app/Contents/apks/';
    ADB_PATH = '/Applications/"Android Toolkit.app"/Contents/platform-tools/';
    break;

case 'win32':
    console.log('Windows operating system');
    APK_PATH = `C:\\Users\\${USERNAME}\\AppData\\Local\\Programs\\android-toolkit\\apks\\`;
    ADB_PATH = `C:\\Users\\${USERNAME}\\AppData\\Local\\Programs\\android-toolkit\\platform-tools\\`;
    break;

case 'linux':
    console.log('Linux operating system');
    APK_PATH = '/usr/bin/Android-Toolkit/apks/';
    ADB_PATH = '/usr/bin/Android-Toolkit/platform-tools/';
    break;

default:
    console.log('other operating system');
    break;
}
