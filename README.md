# CMLLogger

CMLLogger is a flexible and easy-to-use logging class for TypeScript web applications. It allows developers to log messages at different levels (e.g., debug, info, warning, error) and supports logging to the console or to a file. The logger is designed with simplicity and future extensibility in mind.

## Features

- Log messages at various levels: debug, info, warning, error.
- Configurable logging destinations: console or file.
- Singleton pattern to ensure a single logger instance.
- Default file logging to the root of the project if no filepath is specified.

## Installation

1. Clone the repository or download the source code.
2. Ensure you have Node.js installed.

3. If you're using TypeScript, make sure to install the type definitions for Node.js:

```bash
npm install --save-dev @types/node
```

## Usage

### Importing the Logger

First, import the `CMLLogger` class and `LogOptions` type in your TypeScript file:

```typescript
import CMLLogger from './src/logger';
import { LogOptions } from './src/utils/logOptions';
```

### Configuring the Logger

Create an instance of the logger with the desired configuration. The `LogOptions` type allows you to specify the logging destination and optionally a filepath if logging to a file.

#### Logging to Console

```typescript
const consoleLogger = CMLLogger.getLogger();

consoleLogger.info('This is an info message logged to the console.');
consoleLogger.error('This is an error message logged to the console.');
```

#### Logging to File (with Default Path)

If you specify the destination as `"file"` without a filepath, the logger will default to logging in `cml.log` in the root directory of the project.

```typescript
const fileLogOptions: LogOptions = { destination: "file" };
const fileLogger = CMLLogger.getLogger(fileLogOptions);

fileLogger.info('This is an info message logged to the default file.');
fileLogger.error('This is an error message logged to the default file.');
```

#### Logging to File (with Custom Path)

You can also specify a custom filepath:

```typescript
const customFileLogOptions: LogOptions = { destination: "file", filepath: "mycustomlog.log" };
const customFileLogger = CMLLogger.getLogger(customFileLogOptions);

customFileLogger.warning('This is a warning message logged to a custom file.');
customFileLogger.debug('This is a debug message logged to a custom file.');
```

## API

### Methods

- `static getLogger(options: LogOptions): CMLLogger`: Returns the singleton instance of the logger configured with the specified options.
- `debug(message: string): void`: Logs a debug message.
- `error(message: string): void`: Logs an error message.
- `info(message: string): void`: Logs an informational message.
- `verbose(message: string): void`: Logs a verbose message.
- `warning(message: string): void`: Logs a warning message.

### LogOptions Type

The `LogOptions` type allows you to configure the logging destination and filepath:

```typescript
export type LogOptions = 
  | { destination: "console" }
  | { destination: "file"; filepath?: string };
```

## Future Enhancements

- **File Rotation**: Implement file rotation to handle large log files.
- **Multiple Destinations**: Support logging to multiple destinations simultaneously.
- **Asynchronous Logging**: Implement asynchronous logging for improved performance.