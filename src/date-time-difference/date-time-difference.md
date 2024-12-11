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

-   `timeFrom` The starting time to calculate the difference from, `type`: unknown, `default` - new Date(), `optional`
-   `timeTo` The end time to calculate the difference to, `type`: unknown, `default` - new Date(), `optional`
-   `format` The format to convert the difference to, `type`: 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year' | 'full' | 'full-short-unit' | 'object' | 'object-total', `default` - full, `optional`
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

-   Date From: '2024-01-01T01:01:01.000Z'
-   Date To: '2025-01-01T01:01:01.000Z'
-   `format`: 'day', `result`: 366
-   `format`: 'object', `result`: { millisecond: 0, second: 0, minute: 0, hour: 0, day: 1, month: 0, year: 1 }
-   `format`: 'object-total', `result`: { millisecond: 31622400000, second: 31622400, minute: 527040, hour: 8784, day: 366, month: 12.2, year: 1.0166666666666666 }
