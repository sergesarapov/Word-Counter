import wordCounter from '../src/wordCounter';

describe('checking success output', () => {
  it('call wordCounter with test.txt with 5 words', () => {
    const expectedOutput = [['a: 1'], ['is: 1'], ['narrator: 1'], ['student: 1'], ['The: 1']]
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    wordCounter('./tests/test.txt');
    expect(consoleSpy).toHaveBeenCalledTimes(5);
    expect(consoleSpy.mock.calls).toEqual(expectedOutput);
    consoleSpy.mockRestore();
  });
});

describe('checking errors handling', () => {
  it('call wordCounter without path', () => {
    const expectedError = 'Error: The path argument is missing.\nPlease run the code: npm run counter <file path>.';
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    wordCounter('');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenLastCalledWith(expectedError);
    consoleSpy.mockRestore();
  });
  it('call wordCounter with file which contains only numbers', () => {
    const expectedError = 'Error: The provided file does not contain any words.';
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    wordCounter('tests/numbers.md');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenLastCalledWith(expectedError);
    consoleSpy.mockRestore();
  });
  it('call wordCounter with the bad path', () => {
    const expectedError = 'Error: There is no file by the provided path.\nPlease make sure to provide the file name with the extension.';
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    wordCounter('tests/');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenLastCalledWith(expectedError);
    consoleSpy.mockRestore();
  });
});
