const shell = require('child_process').execSync;
const pkg = require('../package.json');

shell(`git tag ${pkg.version}`);
shell(`git push`);
shell(`git push origin ${pkg.version}`);