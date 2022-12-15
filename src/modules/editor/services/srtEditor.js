import _ from 'lodash';

const NEW_LINE_SPLIT = '\n\n';

function resolveSubtitle(subtitle, rest) {
  if (!_.isEmpty(rest)) {
    return `${subtitle.trim()} ${rest[0].trim()}`;
  }

  return subtitle.trim();
}

export function parseSrt(srt) {
  // TODO: Look into splitting by \n\r\n
  const lines = srt.split(NEW_LINE_SPLIT);

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
