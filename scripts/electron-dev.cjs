const { spawn } = require('child_process');
const electron = require('electron');

const env = { ...process.env };
delete env.ELECTRON_RUN_AS_NODE;
env.ELECTRON_ENABLE_LOGGING = '1';
env.ELECTRON_ENABLE_STACK_DUMPING = '1';

const child = spawn(electron, [
  '--disable-gpu',
  '--disable-gpu-sandbox',
  '--no-sandbox',
  'dist-electron/electron/main.js',
], {
  stdio: 'inherit',
  env,
  windowsHide: false,
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
