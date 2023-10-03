import type { Logger as LoggerType, transport as Transport } from 'winston';
import winston from 'winston';
import pathModule from 'path';
import 'winston-daily-rotate-file';

import Environment from './Environment';

type LogLevel = 'info' | 'ok' | 'error' | 'fatal';

interface LoggerMetadata {
  levels: Record<LogLevel, number>;
  colors: Record<LogLevel, string>;
  colorCodes: Record<LogLevel, string>;
}

const loggerMetadata: LoggerMetadata = {
  levels: {
    info: 0,
    ok: 1,
    error: 2,
    fatal: 3,
  },
  colors: {
    info: 'blue',
    ok: 'green',
    error: 'magenta',
    fatal: 'red',
  },
  colorCodes: {
    info: '\u001b[34mINFO\u001b[39m',
    ok: '\u001b[32mOK\u001b[39m',
    error: '\u001b[35mERROR\u001b[39m',
    fatal: '\u001b[31mFATAL\u001b[39m',
  },
};

winston.addColors(loggerMetadata.colors);

class Logger {
  private path: string;
  log: LoggerType;

  constructor(path = '') {
    if (path == null) {
      throw new Error('Caller path is required.');
    }
    this.path = path;

    const formatter = [
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.printf((log) => {
        return `${
          loggerMetadata.colorCodes[log.level as LogLevel] ??
          loggerMetadata.colorCodes.error
        } | ${log.timestamp} | ${log.message} ${
          log.stack ? `| ${log.stack}` : ''
        }| ${this.path}`;
      }),
    ];

    const transports: Transport[] = [
      new winston.transports.DailyRotateFile({
        filename: pathModule.join(__dirname, '..', 'logs', '%DATE%', 'server'),
        extension: '.log',
        datePattern: 'YYYY-MM-DD',
        maxSize: '10m',
        format: winston.format.combine(
          ...[...formatter, winston.format.json()],
        ),
        utc: true,
        level: 'fatal',
      }),
    ];

    if (Environment.isDebugMode) {
      transports.push(new winston.transports.Console({ level: 'fatal' }));
    }

    this.log = winston.createLogger({
      levels: loggerMetadata.levels,
      exitOnError: false,
      transports,
      format: winston.format.combine(...formatter),
    });

    if (Environment.isLoggingDisabled) {
      this.log.transports.forEach((transport) => {
        transport.silent = true;
      });
    }

    this.log.on('error', (error) => {
      console.error('\x1b[31m%s\x1b[0m', '> Logger Error', { error });
    });
  }
}

export default Logger;
