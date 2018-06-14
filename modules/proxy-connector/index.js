/**
 * ProxyConnector
 */
module.exports = (function () {
  const KEY_SERVER = 'ProxyServer';
  const KEY_ENABLE = 'ProxyEnable';
  const REGISTRY_PATHS = {
    "win32": '"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings"'
  };
  const PLATFORM_WIN32 = 'win32';

  const os = require('os');
  const exec = require('fallback-exec-sync').exec;

  let SHELL = null;

  function registryIsExists(key) {
    return exec(`reg query ${SHELL} /v ${key}`).code === 0;
  }

  function registryQuery(type, options) {
    let statusChanged = { result: [], type: type };
    let res;
    type = String(type).trim().toLowerCase();

    switch (type) {
      case 'enable':
        res = exec(`reg add ${SHELL} /f /v ${KEY_SERVER} /t REG_SZ /d ${options}`);
        statusChanged.result.push(res);
        res = exec(`reg add ${SHELL} /f /v ${KEY_ENABLE} /t REG_DWORD /d 1`);
        statusChanged.result.push(res);
        break;
      case 'disable':
        res = exec(`reg delete ${SHELL} /f /v ${KEY_SERVER}`);
        statusChanged.result.push(res);
        res = exec(`reg delete ${SHELL} /f /v ${KEY_ENABLE}`);
        statusChanged.result.push(res);
        break;
      default:
    }

    return statusChanged;
  }

  (function () {
    let platform = os.platform();

    if (platform !== PLATFORM_WIN32) {
      throw new Error("This is not support platform");
    }

    SHELL = REGISTRY_PATHS[platform];
  })();

  return {
    /**
     * Enable Proxy Connector
     */
    enable: (proxyAddress) => {
      return registryQuery('enable', proxyAddress);
    },
    /**
     * Disable Proxy Connector
     */
    disable: () => {
      return registryQuery('disable');
    }
  };
})();