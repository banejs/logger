import chalk from 'chalk';

import ILogger from './types/ILogger';
import IAdditionalData from './types/IAdditionalData';
import ILoggerColorSettings from './types/ILoggerColorSettings';
import { MessageType } from './types/MessageType';
import { ChalkColorType } from './types/ChalkColorType';
import { LogLevel } from './types/LogLevel';

const SETTINGS: Record<LogLevel, ILoggerColorSettings> = {
    [LogLevel.ERROR]: {
        color: 'red',
        type: 'stderr'
    },
    [LogLevel.WARNING]: {
        color: 'yellow',
        type: 'stderr'
    },
    [LogLevel.INFO]: {
        color: 'blue',
        type: 'stdout'
    },
    [LogLevel.DEBUG]: {
        color: 'cyan',
        type: 'stdout'
    }
};

export default class LoggerColorConsole implements ILogger {
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

    private colorize(str: string, color: ChalkColorType | undefined): string {
        if (color && typeof chalk[color] !== 'undefined') {
            return chalk[color](str);
        }

        return str;
    }

    private getTime(): string {
        const date: Date = new Date();
        const hours: string = String(date.getHours()).padStart(2, '0');
        const minutes: string = String(date.getMinutes()).padStart(2, '0');
        const seconds: string = String(date.getSeconds()).padStart(2, '0');
        const milliseconds: string = String(date.getMilliseconds()).padStart(3, '0');

        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    public log(level: LogLevel, message: MessageType, additionalData?: IAdditionalData): void {
        const levelSettings: ILoggerColorSettings = SETTINGS[level];
        const time: string = this.colorize(this.getTime(), 'yellow');
        const levelType: string = this.colorize(`[${level}]`, levelSettings.color);
        let str: string = `${time} ${levelType} ${message instanceof Error && message.stack ? message.stack : message}`;
        let additionalDataJson: string | undefined;

        try {
            additionalDataJson = JSON.stringify(additionalData, null, 2);
        } catch (e) {}

        if (Object.prototype.toString.call(additionalDataJson) !== '[object Undefined]') {
            str += `\n${additionalDataJson}`;
        }

        str += '\n\n';

        process[levelSettings.type].write(str);
    }
}
