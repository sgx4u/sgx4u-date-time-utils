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

-   `index` The index of day/month. `Required`
-   `format` Use short/long name. `Default` - long. `Optional`

### Example

-   `indexToDay` - index: 0, `Result`: Sunday, ShortName: Sun
-   `indexToMonth` - index: 0, `Result`: January, ShortName: Jan

### Caution

-   `indexToDay` index range is 0-6, any value outside the range will show `Invalid Index`
-   `indexToMonth` index range is 0-11, any value outside the range will show `Invalid Index`
