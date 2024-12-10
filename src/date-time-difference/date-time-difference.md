## `dateTimeDifference`

Get difference between 2 date/time in different formats.

## Usage

```tsx
import { dateTimeDifference } from '@sgx4u/date-time-utils';

const Demo = () => {
	const difference = dateTimeDifference({
		timeFrom: '2024-01-01T01:01:01.000Z',
		timeTo: '2025-01-01T01:01:01.000Z',
	});
	return <p>Difference: {difference}</p>;
};
```

## Reference

```ts
dateTimeDifference({ timeFrom, timeTo, format }): string | number | object;
```

### Props

-   `timeFrom` The starting time to calculate the difference from. `Default` - new Date(). `Optional`
-   `timeTo` The end time to calculate the difference to. `Default` - new Date(). `Optional`
-   `format` The format to convert the difference to. `Default` - full. `Optional`
-   All the props are optional, so the function can be called like `dateTimeDifference()`.

### Formats

-   `millisecond` - Total difference in Millisecond
-   `second` - Total difference in Second
-   `minute` - Total difference in Minute
-   `hour` - Total difference in Hour
-   `day` - Total difference in Day
-   `month` - Total difference in Month
-   `year` - Total difference in Year
-   `full` - Net difference in words where all the units are used
-   `full-short-unit` - Net difference in words where all the units are used in short form
-   `object` - Net difference in all formats as an object
-   `object-total` - Total difference in all formats as an object

### Example

-   Date From: Mon Jan 01 2024 06:31:01 GMT+0530 (India Standard Time)
-   Date To: Wed Jan 01 2025 06:31:01 GMT+0530 (India Standard Time)
-   `Format`: 'day', `Result`:
-   `Format`: 'object', `Result`:
-   `Format`: 'object-total', `Result`:
