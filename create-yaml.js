// npm install js-yaml
const fs = require('fs');
const yaml = require('js-yaml');

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

let yamlStr = yaml.dump(data);
fs.writeFileSync('output.yaml', yamlStr, 'utf8');
