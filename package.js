const { exec, execSync } = require("child_process");

const dt = (new Date()).toISOString().split('T')[0];
const git_cmd = 'git log -1 --pretty=format:"%h"';
const hash = execSync(git_cmd).toString();
const fname = "tars/dashboard-" + dt + "-" + hash + ".tgz";
const cmd = `tar -czf ${fname} build`;
exec(cmd);
