import * as fs from "fs";
import * as path from "path";
import { LogOptions } from "./utils/logOptions";
import { LogLevel } from "./utils/logLevels";

/**
 * Class representing a logger for a Typescript web application.
 */
export default class CMLLogger {
  private static instance: CMLLogger;
  private static logOptions: LogOptions;
  private static defaultLogFilePath: string;

  private constructor() {}

  /**
   * Returns the singleton instance of the logger.
   * @param options LogOptions
   * @returns {CMLLogger} The singleton instance of the logger.
   */
  public static getLogger(options?: LogOptions): CMLLogger {
    if (!this.instance) {
      this.logOptions = options || { destination: "console" };
      if (this.logOptions.destination === "file") {
        this.defaultLogFilePath = this.logOptions.filepath || path.join(__dirname, "cml.log");
      }
      this.instance = new CMLLogger();
    }

    return this.instance;
  }

  /**
   * Logs a message at the specified log level.
   * @param {LogLevel} level - The level at which to log the message.
   * @param {string} message - The message to log.
   */
  private log(level: LogLevel, message: string): void {
    const logMessage = `[${new Date().toISOString()}] [${level}] ${message}`;
    switch (CMLLogger.logOptions.destination) {
      case "console":
        console.log(logMessage);
        break;
      case "file":
        this.logToFile(logMessage);
        break;
      default:
        console.log(logMessage);
        break;
    }
  }

  private logToFile(message: string) {
    fs.appendFileSync(CMLLogger.defaultLogFilePath, message + "\n");
  }

  /**
   * Logs a debug message.
   * @param {string} message - The debug message to log.
   */
  public debug(message: string): void {
    this.log(LogLevel.DEBUG, message);
  }

  /**
   * Logs an error message.
   * @param {string} message - The error message to log.
   */
  public error(message: string): void {
    this.log(LogLevel.ERROR, message);
  }

  /**
   * Logs an informational message.
   * @param {string} message - The informational message to log.
   */
  public info(message: string): void {
    this.log(LogLevel.INFO, message);
  }

  /**
   * Logs a verbose message.
   * @param {string} message - The verbose message to log.
   */
  public verbose(message: string): void {
    this.log(LogLevel.VERBOSE, message);
  }

  /**
   * Logs a warning message.
   * @param {string} message - The warning message to log.
   */
  public warning(message: string): void {
    this.log(LogLevel.WARNING, message);
  }
}
