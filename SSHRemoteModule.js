// npm install ssh2
const Client = require('ssh2').Client;
const fs = require('fs');
const config = require('./config.json');

class SSHRemoteModule {
  
  sftp;
  conn;
  
  constructor() {
    console.log('SSHRemote module');
  }
  
  uploadFile = (filename) => {
    return new Promise((resolve, reject) => {
      var readStream = fs.createReadStream(filename);
      var writeStream = this.sftp.createWriteStream(config.remotePath +"/"+ filename);
      
      writeStream.on('close', function() {
        console.log('File transferred succesfully : '+ filename);
        resolve(true);
      });
      
      writeStream.on('end', function() {
        console.log('sftp connection closed');
        resolve(true);
      });
      
      writeStream.on('error', function() {
        console.log('File write failed : '+ filename);
        resolve(false);
      });
      
      readStream.pipe(writeStream);
    });
  }
  
  isRemoteFile = (filename) => {
    return new Promise((resolve, reject) => {
      this.sftp.readdir(config.remotePath, function(err, list){
        var resFiles = new Object();
        if (err) {
          console.log('Unable to connect to SFTP remote system');
          resFiles.error = err;
          resFiles.exists = false;
          resolve(resFiles);
        } else {
          var result = list.find(file => file.filename === filename);
          console.log(result);
          resFiles.exists = result === undefined ? false : true;
          resFiles.files = result;
          resolve(resFiles);
        }
      });
    });
  }
  
  disconnect = () => {
    if (this.conn) {
      this.conn.end();
    }
  }
  
  remoteConnect = async () => {
    var resConnt = await this.mConnect();
    this.sftp = resConnt.sftp;
    this.conn = resConnt.conn;
    return this.sftp === undefined ? false : true;
  }
  
  mConnect = () => {
    return new Promise((resolve, reject) => {
      var conn = new Client();
      conn.on('ready', function() {
        conn.sftp(function(err, sftp) {
          if (err) {
            console.log('Unable to connect to SFTP remote system');
          } else {
            console.log('Remote connection success');
          }
          resolve({ conn: conn, sftp: sftp });
        });
      }).connect(config.connSettings);
    });
  }
}

module.exports = new SSHRemoteModule();
