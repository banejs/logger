import { ChalkColorType } from './ChalkColorType';

export default interface ILoggerColorSettings {
    color: ChalkColorType;
    type: 'stderr' | 'stdout';
}
