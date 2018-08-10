const createInstaller = require('electron-installer-squirrel-windows');

createInstaller({
  name : 'iProxy',
  path: './src/windows/index.js',
  out: './build/installer',
  authors: 'byzz',
  exe: 'iProxy.exe',
  appDirectory: './build/',
  overwrite: true,
	setup_icon: './build/favicon-32x32.png'
}, function done (e) {
  console.log('Build success !!');
});