// deno-lint-ignore-file no-explicit-any
export enum LogLevels {
  Debug,
  Info,
  Warn,
  Error,
  Fatal,
}

const prefixes = new Map<LogLevels, string>([
  [LogLevels.Debug, "DEBUG"],
  [LogLevels.Info, "INFO"],
  [LogLevels.Warn, "WARN"],
  [LogLevels.Error, "ERROR"],
  [LogLevels.Fatal, "FATAL"],
]);

export function logger({
  logLevel = LogLevels.Info,
  name,
}: {
  logLevel?: LogLevels;
  name?: string;
} = {}) {
  function log(level: LogLevels, ...args: any[]) {
    if (level < logLevel) return;

    const date = new Date();
    const log = [
      `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}]`,
      prefixes.get(level) || "DEBUG",
      name ? `${name} >` : ">",
      ...args,
    ];

    switch (level) {
      case LogLevels.Debug:
        return console.debug(...log);
      case LogLevels.Info:
        return console.info(...log);
      case LogLevels.Warn:
        return console.warn(...log);
      case LogLevels.Error:
        return console.error(...log);
      case LogLevels.Fatal:
        return console.error(...log);
      default:
        return console.log(...log);
    }
  }

  function setLevel(level: LogLevels) {
    logLevel = level;
  }

  function debug(...args: any[]) {
    log(LogLevels.Debug, ...args);
  }

  function info(...args: any[]) {
    log(LogLevels.Info, ...args);
  }

  function warn(...args: any[]) {
    log(LogLevels.Warn, ...args);
  }

  function error(...args: any[]) {
    log(LogLevels.Error, ...args);
  }

  function fatal(...args: any[]) {
    log(LogLevels.Fatal, ...args);
  }

  return {
    log,
    setLevel,
    debug,
    info,
    warn,
    error,
    fatal,
  };
}

export const log = logger({ name: "Main" });
export default log;
