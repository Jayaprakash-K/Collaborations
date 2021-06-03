// npm install js-yaml
const yaml = require('js-yaml');
const fs = require('fs');

class YamlModule {
  // default email data
  email = {
    email: []
  };
  
  // default user data
  names = {
    names: []
  };
  
  createFile = (filename) => {
    let data = (filename.inclues('email')) ? this.email : this.names;
    let yamlStr = yaml.dump(data);
    fs.writeFileSync(filename, yamlStr, 'utf8');
  }
  
  updateFile = (filename, data) => {
    try {
      let tag = (filename.includes('email')) ? 'email' : 'names';
      const doc = yaml.load(fs.readFileSync(filename, 'utf8'));
      doc[tag].push(data);
      console.log(doc);
      let yamlStr = yaml.dump(doc);
      fs.writeFileSync(filename, yamlStr, 'utf8');
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new YamlModule();
