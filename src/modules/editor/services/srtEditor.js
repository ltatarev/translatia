import _ from 'lodash';

function resolveSubtitle(subtitle, rest) {
  if (!_.isEmpty(rest)) {
    return `${subtitle.trim()} ${rest[0].trim()}`;
  }

  return subtitle.trim();
}

export function parseSrt(srt) {
  const lines = srt.split('\n\r\n');

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
    // eslint-disable-next-line
    (result, line) => `${result}${line.counter}\n${line.time}\n${line.subtitle}\n\r\n`,
    '',
  );
}
