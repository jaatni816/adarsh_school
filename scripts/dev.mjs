import { spawn, spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const apiPort = process.env.API_PORT ?? '3001';
const webPort = process.env.PORT ?? '5173';

const isWindows = process.platform === 'win32';
const pnpmCmd = isWindows ? 'pnpm.cmd' : 'pnpm';

const children = new Set();

function run(name, args, extraEnv) {
  const child = spawn(pnpmCmd, args, {
    cwd: root,
    env: { ...process.env, ...extraEnv },
    stdio: 'inherit',
    shell: isWindows,
  });
  children.add(child);
  child.on('exit', (code) => {
    children.delete(child);
    console.log(`[dev] ${name} exited (code ${code}).`);
    if (children.size === 0) process.exit(0);
    killAll();
  });
  child.on('error', (err) => {
    console.error(`[dev] Failed to spawn ${name}:`, err);
    killAll();
  });
}

function killAll() {
  for (const child of children) {
    try {
      child.kill();
    } catch {}
  }
  if (isWindows) {
    spawnSync('taskkill', ['/pid', String(process.pid), '/f', '/t'], { stdio: 'ignore' });
  }
  process.exit(0);
}

process.on('SIGINT', () => {
  console.log('\n[dev] Shutting down...');
  killAll();
});
process.on('SIGTERM', () => killAll());

run('backend', ['--filter', '@workspace/api-server', 'run', 'dev'], {
  PORT: apiPort,
});

run('frontend', ['--filter', '@workspace/school-website', 'run', 'dev'], {
  PORT: webPort,
  API_PORT: apiPort,
});