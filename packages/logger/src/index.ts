enum LogLevel {
  Info = 'INFO',
  Error = 'ERROR',
  Warning = 'WARNING',
}

export class Logger {
  public static info(message: string) {
    const formattedMessage = Logger.getFormattedMessage(LogLevel.Info, message);
    console.info(formattedMessage);
  }

  public static error(message: string) {
    const formattedMessage = Logger.getFormattedMessage(
      LogLevel.Error,
      message,
    );
    console.error(formattedMessage);
    console.trace();
  }

  public static warning(message: string) {
    const formattedMessage = Logger.getFormattedMessage(
      LogLevel.Warning,
      message,
    );
    console.warn(formattedMessage);
  }

  private static getFormattedMessage(level: LogLevel, message: string) {
    const date = new Date();
    const dateString = date.toLocaleString();

    return `[${level}][${dateString}] ${message}`;
  }
}
