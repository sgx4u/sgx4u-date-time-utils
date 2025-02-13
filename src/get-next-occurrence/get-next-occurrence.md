## `getNextOccurrence`

Find the next occurrence of the given day.

## Usage

```tsx
import { getNextOccurrence } from '@sgx4u/date-time-utils';

const Demo = () => {
	const nextSunday = getNextOccurrence('Sunday');
	return <p>Next Sunday: {nextSunday}</p>;
};
```

## Reference

```ts
getNextOccurrence(day, startDate): string;
```

### Props

-   `day` The day to find the next occurrence of, `type`: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'
-   `startDate` The date to start checking from, `type`: Date | string | number, `optional`

### Example

-   `getNextOccurrence('Sunday')` - With no start date mentioned it will default to the current date, so lets say current date is 10th Jan 2025. Result - 'Sun, 12 Jan 2025 00:00:00 GMT'
-   `getNextOccurrence('Sunday', '2025-01-20T00:00:00.000Z')` - 'Sun, 26 Jan 2025 00:00:00 GMT'
-   `getNextOccurrence('Sunday', 'ABC')` - 'Invalid date'
