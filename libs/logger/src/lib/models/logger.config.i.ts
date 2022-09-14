export type MsgFormat = 'Default';
export type Targets = 'Console' | 'LocalStorage';

export interface ILoggerConfig {
  format: MsgFormat;
  targets: Targets[];
  production: boolean;
}

export class LoggerConfig implements ILoggerConfig {
  format = 'Default' as MsgFormat;
  targets = ['Console', 'LocalStorage'] as Targets[];
  production = false;
}
