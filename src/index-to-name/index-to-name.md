## `indexToDay, indexToMonth`

Get day from day/month from index.

## Usage

```tsx
import { indexToDay, indexToMonth } from '@sgx4u/date-time-utils';

const Demo = () => {
	const dayName = indexToDay(0);
	const monthName = indexToMonth(0);
	return (
		<p>
			Day: {dayName} | Month: {monthName}
		</p>
	);
};
```

## Reference

```ts
indexToDay(index, format): string;
indexToMonth(index, format): string;
```

### Props

-   `index` The index of day/month, `type`: number
-   `format` Use short/long name, `type`: 'short' | 'long', `default` - long, `optional`

### Example

-   `indexToDay` - index: 0, `result`: Sunday, ShortName: Sun
-   `indexToMonth` - index: 0, `result`: January, ShortName: Jan

### Caution

-   `indexToDay` index range is 0-6, any value outside the range will show `Invalid Index`
-   `indexToMonth` index range is 0-11, any value outside the range will show `Invalid Index`
