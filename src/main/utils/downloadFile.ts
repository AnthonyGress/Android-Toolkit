import axios from 'axios';
import { createWriteStream } from 'fs';

export const downloadFile = async (fileUrl: string, outputLocationPath: string) => {
    const writer = createWriteStream(outputLocationPath);

    return axios({
        method: 'get',
        url: fileUrl,
        responseType: 'stream',
        headers: { 'User-Agent':'OpenGApps APKMirrorCrawler/1.0' }
    }).then(response => {
        return new Promise((resolve, reject) => {
            response.data.pipe(writer);
            let error: Error | null = null;
            writer.on('error', (err: Error) => {
                error = err;
                writer.close();
                reject(err);
            });
            writer.on('close', () => {
                if (!error) {
                    resolve(true);
                }
            });
        });
    });
};
