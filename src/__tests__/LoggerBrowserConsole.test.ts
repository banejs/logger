/* tslint:disable:no-console no-unbound-method */

import ILogger from '../types/ILogger';
import { MessageType } from '../types/MessageType';

import LoggerBrowserConsole from '../LoggerBrowserConsole';

describe('LoggerBrowserConsole', () => {
    describe('#error(message, additionalData)', () => {
        const originalConsoleError: Console['error'] = console.error;

        beforeEach(() => {
            console.error = jest.fn((message: MessageType): MessageType => message);
        });

        afterAll(() => {
            console.error = originalConsoleError;
        });

        test('should display message with an error level', () => {
            const logger: ILogger = new LoggerBrowserConsole();

            logger.error('some message');
            expect((console.error as jest.Mock).mock.results[0].value).toBe('some message');
        });

        test('should display message with an error level with additional data', () => {
            const logger: ILogger = new LoggerBrowserConsole();

            logger.error('some message', { foo: 'bar' });
            expect((console.error as jest.Mock).mock.results[0].value).toBe('some message');
            expect((console.error as jest.Mock).mock.results[1].value).toEqual({ foo: 'bar' });
        });

        test('should display error message with an error level', () => {
            const logger: ILogger = new LoggerBrowserConsole();
            const errorInstance: Error = new Error('some message');

            logger.error(errorInstance);
            expect((console.error as jest.Mock).mock.results[0].value).toBe(errorInstance);
        });

        test('should display error message with an error level with additional data', () => {
            const logger: ILogger = new LoggerBrowserConsole();
            const errorInstance: Error = new Error('some message');

            logger.error(errorInstance, { foo: 'bar' });
            expect((console.error as jest.Mock).mock.results[0].value).toBe(errorInstance);
            expect((console.error as jest.Mock).mock.results[1].value).toEqual({ foo: 'bar' });
        });
    });

    describe('#warning(message, additionalData)', () => {
        const originalConsoleWarn: Console['warn'] = console.warn;

        beforeEach(() => {
            console.warn = jest.fn((message: MessageType): MessageType => message);
        });

        afterAll(() => {
            console.warn = originalConsoleWarn;
        });

        test('should display message with a warning level', () => {
            const logger: ILogger = new LoggerBrowserConsole();

            logger.warning('some message');
            expect((console.warn as jest.Mock).mock.results[0].value).toBe('some message');
        });

        test('should display message with a warning level with additional data', () => {
            const logger: ILogger = new LoggerBrowserConsole();

            logger.warning('some message', { foo: 'bar' });
            expect((console.warn as jest.Mock).mock.results[0].value).toBe('some message');
            expect((console.warn as jest.Mock).mock.results[1].value).toEqual({ foo: 'bar' });
        });

        test('should display error message with a warning level', () => {
            const logger: ILogger = new LoggerBrowserConsole();
            const errorInstance: Error = new Error('some message');

            logger.warning(errorInstance);
            expect((console.warn as jest.Mock).mock.results[0].value).toBe(errorInstance);
        });

        test('should display error message with a warning level with additional data', () => {
            const logger: ILogger = new LoggerBrowserConsole();
            const errorInstance: Error = new Error('some message');

            logger.warning(errorInstance, { foo: 'bar' });
            expect((console.warn as jest.Mock).mock.results[0].value).toBe(errorInstance);
            expect((console.warn as jest.Mock).mock.results[1].value).toEqual({ foo: 'bar' });
        });
    });

    describe('#info(message, additionalData)', () => {
        const originalConsoleInfo: Console['info'] = console.info;

        beforeEach(() => {
            console.info = jest.fn((message: MessageType): MessageType => message);
        });

        afterAll(() => {
            console.info = originalConsoleInfo;
        });

        test('should display message with an info level', () => {
            const logger: ILogger = new LoggerBrowserConsole();

            logger.info('some message');
            expect((console.info as jest.Mock).mock.results[0].value).toBe('some message');
        });

        test('should display message with an info level with additional data', () => {
            const logger: ILogger = new LoggerBrowserConsole();

            logger.info('some message', { foo: 'bar' });
            expect((console.info as jest.Mock).mock.results[0].value).toBe('some message');
            expect((console.info as jest.Mock).mock.results[1].value).toEqual({ foo: 'bar' });
        });

        test('should display error message with an info level', () => {
            const logger: ILogger = new LoggerBrowserConsole();
            const errorInstance: Error = new Error('some message');

            logger.info(errorInstance);
            expect((console.info as jest.Mock).mock.results[0].value).toBe(errorInstance);
        });

        test('should display error message with an info level with additional data', () => {
            const logger: ILogger = new LoggerBrowserConsole();
            const errorInstance: Error = new Error('some message');

            logger.info(errorInstance, { foo: 'bar' });
            expect((console.info as jest.Mock).mock.results[0].value).toBe(errorInstance);
            expect((console.info as jest.Mock).mock.results[1].value).toEqual({ foo: 'bar' });
        });
    });

    describe('#debug(message, additionalData)', () => {
        const originalConsoleDebug: Console['debug'] = console.debug;

        beforeEach(() => {
            console.debug = jest.fn((message: MessageType): MessageType => message);
        });

        afterAll(() => {
            console.debug = originalConsoleDebug;
        });

        test('should display message with a debug level', () => {
            const logger: ILogger = new LoggerBrowserConsole();

            logger.debug('some message');
            expect((console.debug as jest.Mock).mock.results[0].value).toBe('some message');
        });

        test('should display message with a debug level with additional data', () => {
            const logger: ILogger = new LoggerBrowserConsole();

            logger.debug('some message', { foo: 'bar' });
            expect((console.debug as jest.Mock).mock.results[0].value).toBe('some message');
            expect((console.debug as jest.Mock).mock.results[1].value).toEqual({ foo: 'bar' });
        });

        test('should display error message with a debug level', () => {
            const logger: ILogger = new LoggerBrowserConsole();
            const errorInstance: Error = new Error('some message');

            logger.debug(errorInstance);
            expect((console.debug as jest.Mock).mock.results[0].value).toBe(errorInstance);
        });

        test('should display error message with a debug level with additional data', () => {
            const logger: ILogger = new LoggerBrowserConsole();
            const errorInstance: Error = new Error('some message');

            logger.debug(errorInstance, { foo: 'bar' });
            expect((console.debug as jest.Mock).mock.results[0].value).toBe(errorInstance);
            expect((console.debug as jest.Mock).mock.results[1].value).toEqual({ foo: 'bar' });
        });
    });
});
