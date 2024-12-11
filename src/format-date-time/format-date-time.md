## `formatDateTime`

Format a date-time.

## Usage

```tsx
import { formatDateTime } from '@sgx4u/date-time-utils';

const Demo = () => {
	const formattedDateTime = formatDateTime();
	return <p>Time: {formattedDateTime}</p>;
};
```

## Reference

```ts
formatDateTime({ date, format, useUTC }): string;
```

### Props

-   `date` The date to format, `type`: unknown `default` - new Date(). `optional`
-   `format` Format of the output, `type`: string `default` - 'HH:mm:ss | dd/MM/yyyy'. `optional`
-   `useUTC` Local value or UTC value. By default it will show local value. If the format provided is UTC then it will be same as useUTC = true, `type`: boolean, `default` - false. `optional`
-   All the props are optional, so the function can be called like `formatDateTime()`.

### Formats

-   `h` - Hour 12h (1-12)
-   `hh` - Hour 12h with leading 0 (01-12)
-   `H` - Hour 24h (0-23)
-   `HH` - Hour 24h with leading 0 (00-23)
-   `m` - Minute (0-59)
-   `mm` - Minute with leading 0 (00-59)
-   `s` - Second (0-59)
-   `ss` - Second with leading 0 (00-59)
-   `S` - Millisecond (0-999)
-   `SS` - Millisecond with 2 digits minimum (00-999)
-   `SSS` - Millisecond with 3 digits minimum (000-999)
-   `EEE` - Day short (Sun-Sat)
-   `EEEE` - Day full (Sunday-Saturday)
-   `d` - Date (1-31)
-   `dd` - Date with leading 0 (01-31)
-   `M` - Month (1-12)
-   `MM` - Month with leading 0 (01-12)
-   `MMM` - Month short (Jan-Dec)
-   `MMMM` - Month full (January-December)
-   `yy` - Year short (00-99)
-   `yyyy` - Year full (0000-9999)
-   `aa` - AM/PM
-   `full` - Full date
-   `UTC` - Default toUTCString
-   `ISO` - Default toISOString
-   `dateString` - Default toDateString
-   `timeString` - Default toTimeString
-   `locale` - Default toLocaleString
-   `localeDate` - Default toLocaleDateString
-   `localeTime` - Default toLocaleTimeString

### Example

-   Date Input: Sat Jan 01 2050 13:14:15 GMT+0530 (India Standard Time)
-   `format`: 'HH:mm:ss | dd/MM/yyyy', `result`: 13:14:15 | 01/01/2050
-   `format`: 'hh-mm-ss / dd-MMM-yy', `result`: 01-14-15 / 01/Jan/50
-   `format`: 'HH:mm:ss -- dd MMMM yyyy', `result`: 13:14:15 -- 01 January 2050

### Caution

-   If there are any unknown characters then it will be shown as it is.
-   `format`: 'HH:mm:ss:ABC ||| dd/MM/yyyy/XYZ', `result`: 13:14:15:ABC ||| 01/01/2050/XYZ
-   Invalid date output will be `Invalid Date`
