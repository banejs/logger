import { ContextType } from '../Types/ContextType';

const VARIABLE_REGEXP: RegExp = /{{([a-z][a-z0-9]*)}}/gi;

export default function replaceContextVariables(message: string, context: ContextType = {}): string {
    return message.replace(
        VARIABLE_REGEXP,
        (match: string, variable: string): string => (
            Object.prototype.toString.call(context[variable]) !== '[object Undefined]' ?
                String(context[variable]) :
                match
        )
    );
}
