const { spawn } = require('child_process');

const surge = spawn('npx', ['surge', '.', 'cha-de-bebe-baby-monteiro.surge.sh'], {
  cwd: './out',
  stdio: ['pipe', 'inherit', 'inherit']
});

// Send email
surge.stdin.write('gian.giannotti@wisesolutions.uk\n');

// Wait a bit then send password
setTimeout(() => {
  surge.stdin.write('IsraelSon31s@\n');
  surge.stdin.end();
}, 1000);

surge.on('close', (code) => {
  console.log(`Deploy finished with code ${code}`);
});