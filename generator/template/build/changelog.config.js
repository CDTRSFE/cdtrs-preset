const config = require('./version');
const [prefix, env, version] = config.version.split('-');
const fs = require('fs');
const path = require('path');

const commitPartial = fs.readFileSync(path.resolve(__dirname, './commit.hbs'), 'utf-8');

module.exports = {
    options: {
        outputUnreleased: true,
    },
    writerOpts: {
        generateOn: function(commit) {
            return !!commit.version;
        },
        finalizeContext: function(context) {
            if (context.version === '0.1.0') {
                context.version = version;
            }
            return context;
        },
        commitPartial: commitPartial,
    },
    gitRawCommitsOpts: {
        merges: null,
    },
};
