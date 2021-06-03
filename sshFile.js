const sshRemote = require('./SSHRemoteModule');
const yamlModule = require('./YamlModule');

const userEmail = 'useremails.yml';
const userData = 'rahil.shaikh@ericsson.com';
const userNames = 'usernames.yml';
const emailData = 'ehrasah';

checkConn();
async function checkConn() {
  if (await sshRemote.remoteConnect()) {
    createFiles(userEmail, emailData);
    createFiles(userNames, userData);
  } else {
    console.log('Unable to connect to remote system');
  }
}

async function createFiles(filename, data) {
  if ((await sshRemote.isRemoteFile(filename)).exists) {
    yamlModule.updateFile(filename, data);
  } else {
    yamlModule.createFile(filename);  
  }
  await sshRemote.uploadFile(filename);
}
