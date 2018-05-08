const path = require('path')
const fs = require('fs')

const {
    sortDependencies,
    installDependencies,
    runLintFix,
    printMessage,
} = require('./utils')
const pkg = require('./package.json')

const templateVersion = pkg.version

const {
    addTestAnswers
} = require('./scenarios')

module.exports = {
    metalsmith: {
        // When running tests for the template, this adds answers for the selected scenario
        before: addTestAnswers
    },
    helpers: {
        if_or(v1, v2, options) {

            if (v1 || v2) {
                return options.fn(this)
            }

            return options.inverse(this)
        },
        template_version() {
            return templateVersion
        },
    },

    prompts: {
        autoInstall: {
            when: 'isNotTest',
            type: 'list',
            message: 'run `npm install`?',
            choices: [{
                    name: 'Yes, use cnpm',
                    value: 'cnpm',
                    short: 'cnpm',
                },
                {
                    name: 'Yes, use NPM',
                    value: 'npm',
                    short: 'npm',
                },
                {
                    name: 'Yes, use Yarn',
                    value: 'yarn',
                    short: 'yarn',
                },
                {
                    name: 'No, I will handle that myself',
                    value: false,
                    short: 'no',
                },
            ],
        },
    },
    filters: {


    },
    complete: function (data, {
        chalk
    }) {
        const green = chalk.green

        sortDependencies(data, green)

        const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

        if (data.autoInstall) {
            installDependencies(cwd, data.autoInstall, green)
                .then(() => {
                    return runLintFix(cwd, data, green)
                })
                .then(() => {
                    printMessage(data, green)
                })
                .catch(e => {
                    console.log(chalk.red('Error:'), e)
                })
        } else {
            printMessage(data, chalk)
        }
    },
}