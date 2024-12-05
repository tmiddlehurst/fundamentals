type Format = 'UTC_MILLIS' | 'DATESTRING' | 'LOCALE_DATESTRING' | 'ISO';

export function format(isoDateString: string | Date | number, format?: Format) {
  let date;
  if (isoDateString instanceof Date) {
    date = isoDateString;
  } else if (typeof isoDateString === 'number') {
    date = new Date(isoDateString);
  } else {
    const parsedMilliseconds = Date.parse(isoDateString);
    if (Number.isNaN(parsedMilliseconds)) {
      console.error("Invalid date string passed to format()");
      return 'Invalid Date';
    }
    date = new Date(parsedMilliseconds);
  }
  switch (format) {
    case 'UTC_MILLIS':
      return date.valueOf();
    case 'DATESTRING':
      return date.toDateString();
    case "LOCALE_DATESTRING":
      return date.toLocaleDateString();
    default: // ISO or otherwise
      return date.toISOString();
  }
}