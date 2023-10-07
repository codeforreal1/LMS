import fs from 'fs';
import path from 'path';

interface DefaultOptions {
  findAllFilesInADirectory: {
    baseFilename?: string;
    ignoreFileStartingWith?: string[];
    extension?: string;
  };
}

const DEFAULT_OPTIONS: DefaultOptions = {
  findAllFilesInADirectory: {
    baseFilename: undefined,
    ignoreFileStartingWith: ['_'],
    extension: 'js',
  },
};

class FileSystemService {
  static findAllFilesInADirectory(
    directory: string,
    options = DEFAULT_OPTIONS.findAllFilesInADirectory,
  ) {
    options = { ...DEFAULT_OPTIONS.findAllFilesInADirectory, ...options };

    if (directory == null) {
      throw new Error('Directory path is required');
    }

    return fs
      .readdirSync(path.join(directory), { withFileTypes: true })
      .filter(
        ({ name: file }) =>
          !fs.statSync(path.join(directory, file)).isDirectory() &&
          file.split('.')?.[file.split('.').length - 1] === options.extension &&
          !options?.ignoreFileStartingWith?.includes(file.slice(0, 1)) &&
          (options.baseFilename == null ? true : file !== options.baseFilename),
      )
      .map(({ name }) => name);
  }

  static findAllFoldersInADirectory(directory: string) {
    if (directory == null) {
      throw new Error('Directory path is required');
    }
    return fs
      .readdirSync(path.join(directory), { withFileTypes: true })
      .filter(({ name: folder }) =>
        fs.statSync(path.join(directory, folder)).isDirectory(),
      )
      .map(({ name }) => name);
  }
}

export default FileSystemService;
