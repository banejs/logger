import AdditionalDataInterface from './AdditionalDataInterface';
import { MessageType } from './MessageType';
import { LogLevel } from './LogLevel';

/**
 * Describes a logger instance.
 *
 * The message MUST be a string or object implementing toString().
 *
 * The message MAY contain placeholders in the form: {foo} where foo
 * will be replaced by the context data in key "foo".
 *
 * The context array can contain arbitrary data. The only assumption that
 * can be made by implementors is that if an Exception instance is given
 * to produce a stack trace, it MUST be in a key named "exception".
 */
export default interface LoggerInterface {
    /**
     * Runtime errors.
     *
     * @param {MessageType} message
     * @param {AdditionalDataInterface} [additionalData]
     *
     * @return {void}
     */
    error(message: MessageType, additionalData?: AdditionalDataInterface): void;

    /**
     * Exceptional occurrences that are not errors.
     *
     * Example: Use of deprecated APIs, poor use of an API, undesirable things
     * that are not necessarily wrong.
     *
     * @param {MessageType} message
     * @param {AdditionalDataInterface} [additionalData]
     *
     * @return {void}
     */
    warning(message: MessageType, additionalData?: AdditionalDataInterface): void;

    /**
     * Interesting events.
     *
     * Example: User logs in, SQL logs.
     *
     * @param {MessageType} message
     * @param {AdditionalDataInterface} [additionalData]
     *
     * @return {void}
     */
    info(message: MessageType, additionalData?: AdditionalDataInterface): void;

    /**
     * Detailed debug information.
     *
     * @param {MessageType} message
     * @param {AdditionalDataInterface} [additionalData]
     *
     * @return {void}
     */
    debug(message: MessageType, additionalData?: AdditionalDataInterface): void;

    /**
     * Logs with an arbitrary level.
     *
     * @param {LogLevel} level
     * @param {MessageType} message
     * @param {AdditionalDataInterface} [additionalData]
     *
     * @return {void}
     */
    log(level: LogLevel, message: MessageType, additionalData?: AdditionalDataInterface): void;
}
