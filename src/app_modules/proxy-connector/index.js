import os from 'os';
import cmd from 'node-cmd';

class ProxyPlatform {
  KEY_SERVER = 'ProxyServer';
  KEY_ENABLE = 'ProxyEnable';

  platform;
  proxyAddress;
  flag = false;

  supportPlatforms = ['win32'];
  registryPaths = {
    "win32": '"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /f v'
  };
  shell;

  constructor(platform) {
    platform = String(platform).trim().toLowerCase();

    this.supportPlatforms.push('browser');
    if (this.supportPlatforms.indexOf(platform) === -1) {
      throw new Error('Not Support Platform');
    }

    this.platform = platform;
    this.shell = this.registryPaths[platform];
    console.log('this.platform', this.platform);
    console.log('this.shell', this.shell);
  }

  ifSyntaxProxyAddress(proxyAddress) {
    return /^https?:\/\/(?:.*):(?:\d)+$/i.test(String(proxyAddress).trim());
  }

  // set proxyAddress(proxyAddress) {
  //   this.proxyAddress = proxyAddress;
  // }

  // get proxyAddress() {
  //   return this.proxyAddress;
  // }

  enable() {
    if (!this.proxyAddress) { 
      throw new Error('No set proxyAddress!');
    }

    let status = [];
    console.log(`reg add ${this.shell} ${this.KEY_SERVER} /t REG_SZ /d ${this.proxyAddress}`);
    cmd.run(`reg add ${this.shell} ${this.KEY_SERVER} /t REG_SZ /d ${this.proxyAddress}`);
    cmd.run(`reg add ${this.shell} ${this.KEY_ENABLE} /t REG_DWORD /d 1`);
    return status;
  }

  disable() {
    let status = [];
    status.push( cmd.run(`reg delete ${this.shell} /f /v ${this.KEY_SERVER}`) );
    status.push( cmd.run(`reg delete ${this.shell} /f /v ${this.KEY_ENABLE}`) );
    return status;
  }
}

class ProxyConnector extends ProxyPlatform {
  constructor(platform) {
    super(platform || os.platform());
  }

  setProxyAddress(proxyAddress) {
    if (super.ifSyntaxProxyAddress(proxyAddress)) {
      this.proxyAddress = proxyAddress;
      return true;
    }

    return false;
  }

  enable() {
    super.enable();
  }

  disable() {
    super.disable();
  }
}

export default ProxyConnector;