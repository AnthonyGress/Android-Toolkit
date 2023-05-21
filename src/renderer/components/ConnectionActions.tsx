import React from 'react'

export const ConnectionActions = ({adbCommand}: {adbCommand: Function}) => {
    const [ipAddress, setIpAddress] = React.useState('');

    const onSubmit = (e: any) => {
        e.preventDefault();
        adbCommand(`adb connect ${ipAddress}`);
    };

    const updateIp = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setIpAddress(event.target.value);
    };

    return (
        <>
            <form className="connect-ip" onSubmit={onSubmit}>
                <input
                    type="text"
                    value={ipAddress}
                    onChange={updateIp}
                    placeholder="Enter your Firestick's ip address"
                    className="ip-input"
                />
                <button
                    className="connect-btn"
                    type="submit"
                    onClick={() =>
                        adbCommand(`adb connect ${ipAddress}`)
                    }
                >
                            Connect
                </button>
            </form>
            <div className="button-group group1">
                <button
                    type="button"
                    onClick={() => adbCommand('adb disconnect')}
                >
                            Disconnect
                </button>
                <button
                    type="button"
                    onClick={() => adbCommand('adb devices')}
                >
                            Connected Devices
                </button>
            </div>
        </>
    )
}
