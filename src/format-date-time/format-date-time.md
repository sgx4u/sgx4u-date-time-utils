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
formatDateTime({ date, format, useUTC, paddedValues }): string;
```

### Props

-   `date` The date to format. `Default` - new Date(). `Optional`
-   `format` Format of the output. `Default` - 'HH:mm:ss | dd/MM/yyyy'. `Optional`
-   `useUTC` Local value or UTC value. By default it will show local value. `Default` - false. `Optional`
-   `paddedValues` The values are padded or not with 0. `Default` - true. `Optional`
-   All the props are optional, so the function can be called like `formatDateTime()`.

### Formats

-   `hh` - Hour 12h (01-12)
-   `HH` - Hour 24h (00-23)
-   `mm` - Minute (00-59)
-   `ss` - Second (00-59)
-   `SSS` - Millisecond (000-999)
-   `EEE` - Day in week short (Sun-Sat)
-   `EEEE` - Day in week full (Sunday-Saturday)
-   `dd` - Date in month (01-31)
-   `MM` - Month (01-12)
-   `MMM` - Month short (Jan-Dec)
-   `MMMM` - Month full (January-December)
-   `yy` - Year short (00-99)
-   `yyyy` - Year full (0000-9999)
-   `aa` - AM/PM
-   `full` - Full date

### Example

-   Date Input: Sat Jan 01 2050 13:14:15 GMT+0530 (India Standard Time)
-   `Format`: 'HH:mm:ss | dd/MM/yyyy', `Result`: 13:14:15 | 01/01/2050
-   `Format`: 'hh-mm-ss / dd-MMM-yy', `Result`: 01-14-15 / 01/Jan/50
-   `Format`: 'HH:mm:ss -- dd MMMM yyyy', `Result`: 13:14:15 -- 01 January 2050

### Caution

-   If there are any unknown characters then it will be shown as it is.
-   `Format`: 'HH:mm:ss:ABC ||| dd/MM/yyyy/XYZ', `Result`: 13:14:15:ABC ||| 01/01/2050/XYZ
-   Invalid date output will be `Invalid Date`
