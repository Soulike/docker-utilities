import {Logger} from '../src';
import {describe, expect} from '@jest/globals';

describe('Logger', () => {
  it('should log info level message', () => {
    const infoSpy = jest.spyOn(console, 'info');
    const message = 'This is a info level message.';
    Logger.info(message);
    expect(infoSpy).toBeCalledWith(expect.stringContaining('INFO'));
    expect(infoSpy).toBeCalledWith(expect.stringContaining(message));
    infoSpy.mockRestore();
  });

  it('should log error level message and print trace', () => {
    const errorSpy = jest.spyOn(console, 'error');
    const traceSpy = jest.spyOn(console, 'trace');
    const message = 'This is a error level message.';
    Logger.error(message);
    expect(errorSpy).toBeCalledWith(expect.stringContaining('ERROR'));
    expect(errorSpy).toBeCalledWith(expect.stringContaining(message));
    expect(traceSpy).toBeCalledTimes(1);
    errorSpy.mockRestore();
    traceSpy.mockRestore();
  });

  it('should log warning level message', () => {
    const warnSpy = jest.spyOn(console, 'warn');
    const message = 'This is a warning level message.';
    Logger.warning(message);
    expect(warnSpy).toBeCalledWith(expect.stringContaining('WARNING'));
    expect(warnSpy).toBeCalledWith(expect.stringContaining(message));
    warnSpy.mockRestore();
  });
});
