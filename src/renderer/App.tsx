import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { SingleEntryPlugin } from 'webpack';
import icon from '../../assets/techx.png';
import './App.css';

const Hello = () => {
  const getIp = () => {
    window.api.ipAddress('Hello from the front');
  };
  getIp();

  const adbCommand = (command) => {
    window.api.adbCommand(command);
  };

  const ip = '192.168.7.173';

  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>FireTV Toolkit</h1>
      <div className="Hello">
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              🙏
            </span>
            Donate
          </button>
        </a>
        <button type="button" onClick={() => adbCommand(`adb connect ${ip}`)}>
          Connect over ADB
        </button>
        <button
          type="button"
          onClick={() =>
            adbCommand('adb shell settings get secure screensaver_components')
          }
        >
          Check Screen Saver
        </button>
        <button
          type="button"
          onClick={() =>
            adbCommand('adb shell settings get secure sleep_timeout')
          }
        >
          Time Until Screensaver Goes Blank
        </button>
        <button
          type="button"
          onClick={() =>
            adbCommand('adb shell settings get system screen_off_timeout')
          }
        >
          Time Until Screensaver Starts
        </button>
        <button type="button" onClick={() => adbCommand('adb disconnect')}>
          Disconnect
        </button>
        <button type="button" onClick={() => adbCommand('adb devices')}>
          Connected Devices
        </button>
        <button
          type="button"
          onClick={() => {
            adbCommand(
              'adb shell settings put secure screensaver_components uk.co.liamnewmarch.daydream/uk.co.liamnewmarch.daydream.WebsiteDaydreamService '
            );
            adbCommand(
              'sleep 1 & adb shell settings get secure screensaver_components'
            );
            //  setTimeout(adbCommand('adb shell settings get secure screensaver_components'), 2000)
          }}
        >
          Set Screensaver
        </button>
        <button
          type="button"
          onClick={() => {
            adbCommand(
              'adb shell settings put secure screensaver_components com.amazon.bueller.photos/.daydream.ScreenSaverService'
            );
            adbCommand(
              'sleep 1 & adb shell settings get secure screensaver_components'
            );
          }}
        >
          Reset Screensaver
        </button>
        <button type="button" onClick={() => debloat()}>
          Debloat
        </button>
        <div className="text-center">
          <input
            onChange={() => onChange()}
            type="file"
            id="files"
            name="files"
            className="form-control"
          />
        </div>
        <button
          type="button"
          onClick={() =>
            adbCommand(
              `osascript -e 'tell application "Terminal" to activate'`
              //-e 'tell application "Terminal" to do script "ls"'
            )
          }
        >
          Shell
        </button>
        <button
          type="button"
          onClick={() => adbCommand('adb shell dumpsys diskstats')}
        >
          Disk Info
        </button>
        <button
          type="button"
          onClick={() => adbCommand('adb shell dumpsys wifi')}
        >
          WiFi Info
        </button>
        <button
          type="button"
          onClick={() => adbCommand('adb shell dumpsys cpuinfo')}
        >
          CPU Info
        </button>
        <button
          type="button"
          onClick={() => adbCommand('adb shell dumpsys usagestats')}
        >
          Usage Info
        </button>
        <button
          type="button"
          onClick={() => adbCommand('adb shell dumpsys meminfo')}
        >
          Memory Info
        </button>
        <button
          type="button"
          onClick={() => adbCommand('adb shell cat /system/build.prop')}
        >
          Hardware Info
        </button>
        <button
          type="button"
          onClick={() =>
            adbCommand('adb shell getprop ro.build.version.release')
          }
        >
          OS Version
        </button>
        <button
          type="button"
          onClick={() =>
            adbCommand('adb shell screencap -p "/sdcard/screenshot.png"')
          }
        >
          Screenshot on Device
        </button>
        <a
          href="https://clients3.google.com/cast/chromecast/home/v/c9541b08"
          rel="noreferrer"
          target="_blank"
        >
          <button type="button">Google Screensaver Demo</button>
        </a>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
