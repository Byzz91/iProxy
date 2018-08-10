# iProxy 2

GUI로 작성된 프록시 서버
실행하면 자동으로 프록시 서버가 동작
`VM` 호스트 주소가 `192.168.50.5`으로 고정되었다는 단점이 있음. (패치 예정)

## 기타

### Compile with electron

> 참고: https://www.christianengvall.se/electron-packager-tutorial/
> 참고: https://proinlab.com/archives/1928

electron-packager로 파일 생성 후

`node ./node_modules/electron-packager/cli.js ./build iProxy --platform=win32 --arch x64 --out dist --prune`

`node ./node_modules/electron-packager/cli.js ./build iProxy --platform=win32 --arch x64 --out dist --prune --overwrite --icon=./build/icon.ico --version-string.CompanyName=Inven --version-string.FileDescription=Inven --version-string.ProductName="Inven Proxy"`

해당 파일을 electron-winstaller로 인스톨 파일을 만든다.

`node install-windows.js`

```js
var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
  appDirectory: './dist/iProxy-win32-x64',
  outputDirectory: './dist/installer-win32-x64',
  exe: 'iProxy.exe',
  setupExe: 'iProxySetup.exe'
});

resultPromise.then(function () {
  console.log("It worked!");
}, function (e) {
  console.log('No dice: ' + e.message);
});
```