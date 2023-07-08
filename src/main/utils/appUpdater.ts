// import log from 'electron-log';
// import { autoUpdater } from 'electron-updater';
import { downloadFile } from './downloadFile';
const { exec } = require('child_process');
import packageJson from '../../../release/app/package.json';
import semverCompare from 'semver/functions/compare';
import { Octokit } from 'octokit';
import util from 'node:util';
const execPromise = util.promisify(exec);
const userOS = process.platform;
import fs from 'fs';

// Cannot use updater unless codesigning with paid credentials for macOS
// export default class AppUpdater {
//     constructor() {
//         log.transports.file.level = 'info'
//         autoUpdater.logger = log;
//         autoUpdater.checkForUpdatesAndNotify();
//     }
// }

export const checkForUpdates = async () => {
    let updateAvailable = false;
    const octokit = new Octokit();

    const res = await octokit.request('GET /repos/{owner}/{repo}/releases/latest', {
        owner: 'AnthonyGress',
        repo: packageJson.name,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    const latestVersion = res.data.name;
    const runningVersion = packageJson.version;

    if (latestVersion){
        const newVersionAvailable = semverCompare(latestVersion, runningVersion);

        if (newVersionAvailable === 1) {
            updateAvailable = true;
        }
    }
    return updateAvailable;
};


export const startUpdate = async () => {
    if (userOS === 'win32') {
        updateWindows();
    } else if (userOS === 'darwin' || userOS === 'linux') {
        await nixUpdate();
    }
};

export const updateWindows = () => {
    const username = process.env.USERNAME;

    const downloadPathWin = `C:\\Users\\${username}\\Downloads`;
    console.log('running windows update');
    const { execFile } = require('child_process');


    downloadFile(`https://github.com/anthonygress/${packageJson.name}/releases/latest/download/${packageJson.name}-setup.exe`, `${downloadPathWin}\\Android-Toolkit-Update\\Android-Toolkit-Setup.exe`).then(() => {
        fs.opendir(`${downloadPathWin}\\Android-Toolkit-Update\\`, (err) => {
            if (err) console.log('Error:', err);
        });
    });
};


export const nixUpdate = async () => {
    let updateCompleted = false;
    console.log('running *nix update');
    await execPromise('/bin/bash -c "$(curl -sL https://raw.githubusercontent.com/AnthonyGress/Android-Toolkit/main/install.sh)"');
    updateCompleted = true;
    return updateCompleted;
};
