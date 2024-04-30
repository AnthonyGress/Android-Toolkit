import { exec } from "node:child_process";

export const POWERSHELL_CMD = 'start powershell -noexit -command "[console]::windowwidth=80; [console]::windowheight=35; [console]::bufferwidth=[console]::windowwidth; cd .\\platform-tools; Get-Content -Raw ..\\resources\\assets\\art.txt; Write-Host "Run ADB commands here" -nonewline; Write-Host "`n";Write-Host "Ex: .\\adb COMMAND"; Write-Host "`n""';

export const TERMINAL_CMD = 'adb shell';

export const SMART_TUBE_URL = 'https://github.com/yuliskov/SmartTube/releases/download/21.54s/SmartTube_stable_21.54_armeabi-v7a.apk';

export const INFINITY_REDDIT_URL = 'https://github.com/KhoalaS/Infinity-For-Reddit/releases/latest/download/app-release.apk';

// export const REVANCED_SPOTIFY_URL = 'https://github.com/revanced-apks/build-apps/releases/download/147/spotify-revanced-v8.8.50.466-all.apk';

export const SPOTIFY_MOD_URL = 'https://download1638.mediafire.com/ltt2t112ktjgUyaHZhGUdtnW7-Fp-PlE2gmj_pS1bo01lp69Doip8bI8d_T0y-cB1HBF2NdbKWeCQERKqI9wFvv5uJj6zPGlUEe3ZFPRs_uW1WPwsQlzaYowVlw1UBS4uhJOviRb3lU5qpfA6WEwl8YS635-V2Xs0YArbNSyrbIC/gks82nqggqpk4de/spotify-mod.apk';

export const REVANCED_TIKTOK_URL = 'https://github.com/revanced-apks/build-apps/releases/download/147/tiktok-revanced-v30.3.4-all.apk';

export const REVANCED_YTMUSIC_URL = 'https://github.com/revanced-apks/build-apps/releases/download/147/music-revanced-v6.10.51-arm64-v8a.apk';

export const YOUTUBE_URL = 'https://d.apkpure.com/b/APK/com.google.android.youtube?versionCode=1545084352';

export const LAUNCHER_MANAGER_URL = 'https://forum.xda-developers.com/attachments/lm-fos-1-1-8-apk.5862251/';

export const WOLF_LAUNCHER_URL = 'https://www.techdoctoruk.com/?sdm_process_download=1&download_id=4471';

export const MICRO_G_URL ='https://github.com/ReVanced/GmsCore/releases/download/v0.3.1.4.240913/app.revanced.android.gms-240913008-signed.apk';

const BUFF = Buffer.from('aHR0cHM6Ly9kcml2ZS51c2VyY29udGVudC5nb29nbGUuY29tL2Rvd25sb2FkP2lkPTE5U0dZYXVSa2FBSHZlc1J5VGFNUEhHeWpRQU5jWVdWZSZleHBvcnQ9ZG93bmxvYWQmY29uZmlybT15ZXM=', 'base64');

export const REVANCED_MANAGER_URL = 'https://github.com/ReVanced/revanced-manager/releases/download/v1.20.1/revanced-manager-v1.20.1.apk';

export const REVANCED_YOUTUBE_URL = BUFF.toString('ascii');

export const REVANCED_REDDIT_URL = 'https://github.com/revanced-apks/build-apps/releases/download/147/reddit-revanced-v2023.26.0-all.apk';

export const REDDIT_URL = 'https://d.apkpure.com/b/APK/com.reddit.frontpage?version=latest';

export const IS_WIN = process.platform === 'win32';

export const USERNAME= process.env.USERNAME;
export const WINDOWS_RESOURCE_PATH = `C:\\Users\\${USERNAME}\\AppData\\Local\\Programs\\android-toolkit\\resources`;

export let APK_PATH: string = "./apks";
export let ADB_PATH: string = "";
export const USER_OS = process.platform;

switch (USER_OS) {
case 'darwin':
    console.log('MacOS');
    //APK_PATH = './apks';
    exec("which adb", (error, stdout, stderr) => {
        if (error) {
        console.error(`exec error: ${error}`);
        console.log(stderr);
        return;
        }
        ADB_PATH = stdout.toString(); 
    });
    console.log(ADB_PATH); 	
    break;

case 'win32':
    console.log('Windows operating system');
    APK_PATH = `C:\\Users\\${USERNAME}\\AppData\\Local\\Programs\\android-toolkit\\apks\\`;
    ADB_PATH = `C:\\Users\\${USERNAME}\\AppData\\Local\\Programs\\android-toolkit\\platform-tools\\`;
    break;

case 'linux':
    console.log('Linux operating system');
    //APK_PATH = './apks/';
    exec("which adb", (error, stdout, stderr) => {
	if (error) {
        console.error(`exec error: ${error}`);
	console.log(stderr);
        return;
    	}
    	ADB_PATH = stdout.toString(); 
    });    	
    console.log(ADB_PATH);
    break;

default:
    console.log('other operating system');
    break;
}
