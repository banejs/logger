import ILogger from './types/ILogger';
import IAdditionalData from './types/IAdditionalData';
import { MessageType } from './types/MessageType';
import { LogLevel } from './types/LogLevel';

type ConsoleMethodType = 'error' | 'warn' | 'info' | 'debug';

const LOG_LEVEL_METHOD: Record<LogLevel, ConsoleMethodType> = {
    [LogLevel.ERROR]: 'error',
    [LogLevel.WARNING]: 'warn',
    [LogLevel.INFO]: 'info',
    [LogLevel.DEBUG]: 'debug'
};

export default class LoggerBrowserConsole implements ILogger {
    public error(message: MessageType, additionalData?: IAdditionalData): void {
        this.log(LogLevel.ERROR, message, additionalData);
    }

    public warning(message: MessageType, additionalData?: IAdditionalData): void {
        this.log(LogLevel.WARNING, message, additionalData);
    }

    public info(message: MessageType, additionalData?: IAdditionalData): void {
        this.log(LogLevel.INFO, message, additionalData);
    }

    public debug(message: MessageType, additionalData?: IAdditionalData): void {
        this.log(LogLevel.DEBUG, message, additionalData);
    }

    public log(level: LogLevel, message: MessageType, additionalData?: IAdditionalData): void {
        const method: ConsoleMethodType = LOG_LEVEL_METHOD[level];

        console[method](message);

        if (Object.prototype.toString.call(additionalData) !== '[object Undefined]') {
            console[method](additionalData);
        }
    }
}
