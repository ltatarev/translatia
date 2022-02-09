import _ from 'lodash';

export function parseSrt(srt) {
  const lines = srt.split('\n\r\n');

  return _.reduce(
    lines,
    (result, line) => {
      const [counter, time, subtitle] = line.split('\n');

      if (counter && time && subtitle) {
        result.push({
          counter: counter.trim(),
          time: time.trim(),
          subtitle: subtitle.trim(),
        });
      }

      return result;
    },
    [],
  );
}
