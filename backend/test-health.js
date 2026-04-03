const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/health',
  method: 'GET',
};

const req = http.request(options, (res) => {
  console.log(`Health status: ${res.statusCode}`);
  if (res.statusCode === 200) {
    console.log('Test Passed!');
    process.exit(0);
  } else {
    console.log('Test Failed!');
    process.exit(1);
  }
});

req.on('error', (e) => {
  console.error(`Error connecting to server: ${e.message}`);
  process.exit(1);
});

req.end();
