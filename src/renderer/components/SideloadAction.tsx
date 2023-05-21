import React from 'react';

export const SideloadAction = ({adbCommand}: {adbCommand: Function}) => {
    const [selectedFile, setSelectedFile] = React.useState<string>('');

    const sideload = (filePath: string) => {
        console.log(`Selected file - ${filePath}`);
        adbCommand(`adb install "${filePath}"`);
    };

    return (
        <div className="vcenter">
            <h2>Sideload Files</h2>
            <div className="button-group">
                <input
                    onChange={(e: any) =>
                        setSelectedFile(e.currentTarget.files[0].path)
                    }
                    type="file"
                    id="files"
                    name="files"
                    className="form-control"
                />
                <button
                    type="submit"
                    onClick={() => sideload(selectedFile)}
                >
                            Sideload
                </button>
            </div>
        </div>
    )
}

export default SideloadAction
