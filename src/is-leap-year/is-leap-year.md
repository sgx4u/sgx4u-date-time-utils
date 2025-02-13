## `isLeapYear`

Check if the given year is a leap year.

## Usage

```tsx
import { isLeapYear } from '@sgx4u/date-time-utils';

const Demo = () => {
	const isValidLeapYear = isLeapYear(2025);
	return <p>Is leap-year: {isValidLeapYear}</p>;
};
```

## Reference

```ts
isLeapYear(year): boolean;
```

### Props

-   `year` The year to check, `type`: number | string

### Example

-   `isLeapYear()` - If current year is leap-year then returns true otherwise false
-   `isLeapYear('')` - false
-   `isLeapYear(1700)` - false
-   `isLeapYear(-2000)` - false
-   `isLeapYear('2024')` - true
-   `isLeapYear('2025')` - false
