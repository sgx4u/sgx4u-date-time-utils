## `isValidDate`

Check if the given date is valid or not.

## Usage

```tsx
import { isValidDate } from '@sgx4u/date-time-utils';

const Demo = () => {
	const isValid = isValidDate(new Date());
	return <p>Is valid: {isValid}</p>;
};
```

## Reference

```ts
isValidDate(date, format): boolean;
```

### Props

-   `date` The date to check, `type`: unknown
-   `format` Format of the date in string format, `optional`

### Formats

-   `EEE` - Day short (Sun-Sat)
-   `EEEE` - Day full (Sunday-Saturday)
-   `day` - Day in short/full
-   `dd` - Date in digits
-   `MM` - Month in digits
-   `MMM` - Month short (Jan-Dec)
-   `MMMM` - Month full (January-December)
-   `month` - Month in digits/short/full
-   `yy` - Year short (00-99)
-   `yyyy` - Year full (0000-9999)
-   `year` - Year in short/full

### Example

-   `isValidDate('')` - false
-   `isValidDate(new Date())` - true
-   `isValidDate('2025-02-13T14:36:27.565Z')` - true
-   `isValidDate(1739457559735)` - true
-   `isValidDate('28/02/2025', 'dd/MM/yyyy')` - true
-   `isValidDate('28/02/2025', 'dd/MM/yy')` - false
-   `isValidDate('29/02/25', 'dd/MM/yy')` - false
-   `isValidDate('31/03/25', 'dd/MM/yy')` - true
-   `isValidDate('25-31-03', 'yy-dd-MM')` - true
-   `isValidDate('Sun-24-29-01', 'EEE-yy-dd-MM')` - true

### Caution

-   `year` range is 0-9999, any value outside the range will return `false`
