const file = require('./Reacher.S01E01.Welcome.to.Margrave.srt');

export const FILE_NAME = 'Reacher.S01E01.Welcome.to.Margrave';

export function getExampleFile() {
  return fetch(file).then((response) => response.text());
}
