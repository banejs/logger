/* tslint:disable:no-console no-unbound-method */

jest.mock('supports-color', () => ({
    stdout: {
        level: 3,
        hasBasic: true,
        has256: true,
        has16m: true
    }
}));

import LoggerInterface from '../types/LoggerInterface';
import { MessageType } from '../types/MessageType';

import LoggerColorConsole from '../LoggerColorConsole';

const colors: {
    [key: string]: [number, number];
} = {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39]
};

function open(color: [number, number]): string {
    return `\u001B[${color[0]}m`;
}

function close(color: [number, number]): string {
    return `\u001B[${color[1]}m`;
}

const time: string = `${open(colors.yellow)}14:07:43.041${close(colors.yellow)}`;
const additionalDataStringDevelopment: string = `{
  "foo": "bar"
}`;
const additionalDataStringNonDevelopment: string = '{"foo": "bar"}';

describe('LoggerColorConsole', () => {
    const originalDateGetHours: Date['getHours'] = Date.prototype.getHours;
    const originalDateGetMinutes: Date['getMinutes'] = Date.prototype.getMinutes;
    const originalDateGetSeconds: Date['getSeconds'] = Date.prototype.getSeconds;
    const originalDateGetMilliseconds: Date['getMilliseconds'] = Date.prototype.getMilliseconds;

    beforeEach(() => {
        Date.prototype.getHours = jest.fn(() => 14);
        Date.prototype.getMinutes = jest.fn(() => 7);
        Date.prototype.getSeconds = jest.fn(() => 43);
        Date.prototype.getMilliseconds = jest.fn(() => 41);
    });

    afterAll(() => {
        Date.prototype.getHours = originalDateGetHours;
        Date.prototype.getMinutes = originalDateGetMinutes;
        Date.prototype.getSeconds = originalDateGetSeconds;
        Date.prototype.getMilliseconds = originalDateGetMilliseconds;
    });

    describe('#error(message, additionalData)', () => {
        const originalProcessStdErrWrite: NodeJS.WriteStream['write'] = process.stderr.write;
        const level: string = `${open(colors.red)}[error]${close(colors.red)}`;

        beforeEach(() => {
            // @ts-ignore
            process.stderr.write = jest.fn((message: MessageType): MessageType => message);
        });

        afterAll(() => {
            process.stderr.write = originalProcessStdErrWrite;
        });

        test('should display message with an error level', () => {
            const logger: LoggerInterface = new LoggerColorConsole();

            logger.error('some message');
            expect((process.stderr.write as jest.Mock).mock.results[0].value).toBe(`${time} ${level} some message\n\n`);
        });

        test('should display message with an error level with additional data', () => {
            const logger: LoggerInterface = new LoggerColorConsole();

            logger.error('some message', { foo: 'bar' });
            expect((process.stderr.write as jest.Mock).mock.results[0].value).toBe(`${time} ${level} some message\n${additionalDataStringDevelopment}\n\n`);
        });

        test('should display error message with an error level', () => {
            const logger: LoggerInterface = new LoggerColorConsole();
            const errorInstance: Error = new Error('some message');

            logger.error(errorInstance);
            expect((process.stderr.write as jest.Mock).mock.results[0].value).toBe(`${time} ${level} ${errorInstance.stack}\n\n`);
        });

        test('should display error message with an error level with additional data', () => {
            const logger: LoggerInterface = new LoggerColorConsole();
            const errorInstance: Error = new Error('some message');

            logger.error(errorInstance, { foo: 'bar' });
            expect((process.stderr.write as jest.Mock).mock.results[0].value).toBe(`${time} ${level} ${errorInstance.stack}\n${additionalDataStringDevelopment}\n\n`);
        });
    });

    describe('#warning(message, additionalData)', () => {
        const originalProcessStdErrWrite: NodeJS.WriteStream['write'] = process.stderr.write;
        const level: string = `${open(colors.yellow)}[warning]${close(colors.yellow)}`;

        beforeEach(() => {
            // @ts-ignore
            process.stderr.write = jest.fn((message: MessageType): MessageType => message);
        });

        afterAll(() => {
            process.stderr.write = originalProcessStdErrWrite;
        });

        test('should display message with a warning level', () => {
            const logger: LoggerInterface = new LoggerColorConsole();

            logger.warning('some message');
            expect((process.stderr.write as jest.Mock).mock.results[0].value).toBe(`${time} ${level} some message\n\n`);
        });

        test('should display message with a warning level with additional data', () => {
            const logger: LoggerInterface = new LoggerColorConsole();

            logger.warning('some message', { foo: 'bar' });
            expect((process.stderr.write as jest.Mock).mock.results[0].value).toBe(`${time} ${level} some message\n${additionalDataStringDevelopment}\n\n`);
        });

        test('should display error message with a warning level', () => {
            const logger: LoggerInterface = new LoggerColorConsole();
            const errorInstance: Error = new Error('some message');

            logger.warning(errorInstance);
            expect((process.stderr.write as jest.Mock).mock.results[0].value).toBe(`${time} ${level} ${errorInstance.stack}\n\n`);
        });

        test('should display error message with a warning level with additional data', () => {
            const logger: LoggerInterface = new LoggerColorConsole();
            const errorInstance: Error = new Error('some message');

            logger.warning(errorInstance, { foo: 'bar' });
            expect((process.stderr.write as jest.Mock).mock.results[0].value).toBe(`${time} ${level} ${errorInstance.stack}\n${additionalDataStringDevelopment}\n\n`);
        });
    });

    describe('#info(message, additionalData)', () => {
        const originalProcessStdOutWrite: NodeJS.WriteStream['write'] = process.stdout.write;
        const level: string = `${open(colors.blue)}[info]${close(colors.blue)}`;

        beforeEach(() => {
            // @ts-ignore
            process.stdout.write = jest.fn((message: MessageType): MessageType => message);
        });

        afterAll(() => {
            process.stdout.write = originalProcessStdOutWrite;
        });

        test('should display message with an info level', () => {
            const logger: LoggerInterface = new LoggerColorConsole();

            logger.info('some message');
            expect((process.stdout.write as jest.Mock).mock.results[0].value).toBe(`${time} ${level} some message\n\n`);
        });

        test('should display message with an info level with additional data', () => {
            const logger: LoggerInterface = new LoggerColorConsole();

            logger.info('some message', { foo: 'bar' });
            expect((process.stdout.write as jest.Mock).mock.results[0].value).toBe(`${time} ${level} some message\n${additionalDataStringDevelopment}\n\n`);
        });

        test('should display error message with an info level', () => {
            const logger: LoggerInterface = new LoggerColorConsole();
            const errorInstance: Error = new Error('some message');

            logger.info(errorInstance);
            expect((process.stdout.write as jest.Mock).mock.results[0].value).toBe(`${time} ${level} ${errorInstance.stack}\n\n`);
        });

        test('should display error message with an info level with additional data', () => {
            const logger: LoggerInterface = new LoggerColorConsole();
            const errorInstance: Error = new Error('some message');

            logger.info(errorInstance, { foo: 'bar' });
            expect((process.stdout.write as jest.Mock).mock.results[0].value).toBe(`${time} ${level} ${errorInstance.stack}\n${additionalDataStringDevelopment}\n\n`);
        });
    });

    describe('#debug(message, additionalData)', () => {
        const originalProcessStdOutWrite: NodeJS.WriteStream['write'] = process.stdout.write;
        const level: string = `${open(colors.cyan)}[debug]${close(colors.cyan)}`;

        beforeEach(() => {
            // @ts-ignore
            process.stdout.write = jest.fn((message: MessageType): MessageType => message);
        });

        afterAll(() => {
            process.stdout.write = originalProcessStdOutWrite;
        });

        test('should display message with a debug level', () => {
            const logger: LoggerInterface = new LoggerColorConsole();

            logger.debug('some message');
            expect((process.stdout.write as jest.Mock).mock.results[0].value).toBe(`${time} ${level} some message\n\n`);
        });

        test('should display message with a debug level with additional data', () => {
            const logger: LoggerInterface = new LoggerColorConsole();

            logger.debug('some message', { foo: 'bar' });
            expect((process.stdout.write as jest.Mock).mock.results[0].value).toBe(`${time} ${level} some message\n${additionalDataStringDevelopment}\n\n`);
        });

        test('should display error message with a debug level', () => {
            const logger: LoggerInterface = new LoggerColorConsole();
            const errorInstance: Error = new Error('some message');

            logger.debug(errorInstance);
            expect((process.stdout.write as jest.Mock).mock.results[0].value).toBe(`${time} ${level} ${errorInstance.stack}\n\n`);
        });

        test('should display error message with a debug level with additional data', () => {
            const logger: LoggerInterface = new LoggerColorConsole();
            const errorInstance: Error = new Error('some message');

            logger.debug(errorInstance, { foo: 'bar' });
            expect((process.stdout.write as jest.Mock).mock.results[0].value).toBe(`${time} ${level} ${errorInstance.stack}\n${additionalDataStringDevelopment}\n\n`);
        });
    });
});
