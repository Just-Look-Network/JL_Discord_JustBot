const morgan = require('morgan');
const chalk = require('chalk');

const Logger = morgan(function (tokens, req, res) {
    return [
        chalk.blue.bold(`/ ${tokens.method(req, res)}`),
        chalk.green.bold(' => '),
        chalk.red.bold(tokens.status(req, res)),
        chalk.green.bold(' => '),
        chalk.white(tokens.url(req, res)),
        chalk.green.bold(' => '),
        chalk.yellow(tokens['response-time'](req, res) + ' ms')
    ].join(' ');
});

module.exports = Logger;
