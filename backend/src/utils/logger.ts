import chalk from 'chalk';
import moment from 'moment';
import util from 'util';

export default class Logger {
    static log(content, { color = 'grey', tag = 'Log' } = {}) {
        this.write(content, { color, tag });
    }

    static info(content, { color = 'green', tag = 'Info' } = {}) {
        this.write(content, { color, tag });
    }

    static warn(content, { color = 'yellow', tag = 'Warn' } = {}) {
        this.write(content, { color, tag });
    }

    static error(content, { color = 'red', tag = 'Error' } = {}) {
        this.write(content, { color, tag, error: true });
    }

    static stacktrace(content, { color = 'white', tag = 'Error' } = {}) {
        this.write(content, { color, tag, error: true });
    }

    static write(content, { color = 'grey', tag = 'Log', error = false } = {}) {
        const timestamp = chalk.cyan(`[${moment().format('DD-MM-YYYY | HH:mm:ss')}]:`);
        const levelTag = chalk.bold(`[${tag}]:`);
        const text = chalk[color](this.clean(content));
        const stream = error ? process.stderr : process.stdout;
        stream.write(`${timestamp} ${levelTag} ${text}\n`);
    }

    static clean(item) {
        if (typeof item === 'string') return item;
        const cleaned = util.inspect(item, { depth: Infinity });
        return cleaned;
    }
}
