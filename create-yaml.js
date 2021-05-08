// npm install js-yaml
const fs = require('fs');
const yaml = require('js-yaml');

// let Javascript object to write in to Yaml file
let data = {
    title: 'Writing YAML',
    domain: 'stackabuse.com',
    port: 8080,
    'is-https': true,
    meta: {
        'published-at': 'May. 8th, 2021',
        author: {
            name: 'Jayaprakash',
            contact: 'jp@gmail.com'
        },
        tags: [
            'javascript', 'node.js', 'web development'
        ]
    }
};

// Dump object to yaml content
let yamlStr = yaml.dump(data);

// Write yaml content to yaml file
fs.writeFileSync('output.yaml', yamlStr, 'utf8');
