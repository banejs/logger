import { ChalkColorType } from './ChalkColorType';

export default interface LoggerColorSettingsInterface {
    color: ChalkColorType;
    type: 'stderr' | 'stdout';
}
