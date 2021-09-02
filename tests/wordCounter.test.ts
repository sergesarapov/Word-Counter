import wordCounter from '../src/wordCounter';

describe('Call wordCounter() with correct data', () => {
  it('should print 5 messages to the console with counted words', () => {
    const expectedOutput = [['a: 1'], ['is: 1'], ['narrator: 1'], ['student: 1'], ['The: 1']]
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    wordCounter('./tests/test.txt');
    expect(consoleSpy).toHaveBeenCalledTimes(5);
    expect(consoleSpy.mock.calls).toEqual(expectedOutput);
    consoleSpy.mockRestore();
  });
});

describe('Call wordCounter() with faulty arguments', () => {
  it('should print that path argument is missing', () => {
    const expectedError = 'Error: The path argument is missing.\nPlease run the code: npm run counter <file path>.';
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    wordCounter('');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenLastCalledWith(expectedError);
    consoleSpy.mockRestore();
  });
  it('should print that file does not contain words', () => {
    const expectedError = 'Error: The provided file does not contain any words.';
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    wordCounter('tests/numbers.md');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenLastCalledWith(expectedError);
    consoleSpy.mockRestore();
  });
  it('should print that the path is bad', () => {
    const expectedError = 'Error: There is no file by the provided path.\nPlease make sure to provide the file name with the extension.';
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    wordCounter('tests/');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenLastCalledWith(expectedError);
    consoleSpy.mockRestore();
  });
});
