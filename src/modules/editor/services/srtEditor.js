import _ from 'lodash';

const NEW_LINE_SPLIT = '\n\r\n';
const ALTERNATIVE_SPLIT = '\n\n';

const REPLACE_CHARS = {
  č: 'c',
  ć: 'c',
  è: 'c',
  æ: 'c',
  Č: 'C',
  Ć: 'C',
  š: 's',
  Š: 's',
  đ: 'd',
  Đ: 'D',
  ž: 'z',
  Ž: 'z',
};

const REPLACE_REGEX = new RegExp(Object.keys(REPLACE_CHARS).join('|'), 'g');

function clearUnrecognizableLetters(subtitle) {
  return subtitle.replace(REPLACE_REGEX, (match) => REPLACE_CHARS[match]);
}

function resolveSubtitle(subtitle, rest) {
  let resolvedSubtitle = subtitle.trim();

  if (!_.isEmpty(rest)) {
    resolvedSubtitle = `${subtitle.trim()} ${rest[0].trim()}`;
  }

  return clearUnrecognizableLetters(resolvedSubtitle);
}

export function parseSrt(srt) {
  // TODO: Clean up a lil bit
  const lines = srt.split(NEW_LINE_SPLIT).length > 1
    ? srt.split(NEW_LINE_SPLIT)
    : srt.split(ALTERNATIVE_SPLIT);

  return _.reduce(
    lines,
    (result, line) => {
      const [counter, time, subtitle, ...rest] = line.split('\n');

      if (counter && time && subtitle) {
        result.push({
          counter: counter.trim(),
          time: time.trim(),
          subtitle: resolveSubtitle(subtitle, rest),
        });
      }

      return result;
    },
    [],
  );
}

export function arrayToSrt(subtitles) {
  return _.reduce(
    subtitles,
    (result, line) => `${result}${line.counter}\n${line.time}\n${line.subtitle}${NEW_LINE_SPLIT}`,
    '',
  );
}
