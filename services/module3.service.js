const { spawn } = require('child_process');

const scraper = async (url) => {
    return new Promise((resolve, reject) => {
        const pythonScript = spawn('python', ['./services/module3.py', url]);
    
        let result = '';
    
        pythonScript.stdout.on('data', (data) => {
          result += data.toString().trim();
        });
    
        pythonScript.stderr.on('data', (data) => {
          console.error(`Error: ${data}`);
        });
    
        pythonScript.on('close', (code) => {
          if (code === 0) {
            resolve(result);
          } else {
            reject(`Python script exited with code ${code}`);
          }
        });
      });
};
module.exports = {
    scraper
}