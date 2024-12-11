## `addSubtractTime`

Add/Subtract time value from a given time and get the new value in different formats.

## Usage

```tsx
import { addSubtractTime } from '@sgx4u/date-time-utils';

const Demo = () => {
	const newTime = addSubtractTime({ value: 1, type: 'day' });
	return <p>Time: {newTime}</p>;
};
```

## Reference

```ts
addSubtractTime({ date, value, type, format, useUTC }): string;
```

### Props

-   `date` The date to format, `type`: unknown, `default` - new Date(). `optional`
-   `value` The value to add/subtract, `type`: number
-   `type` The type of value that is provided to be added/subtracted, `type`: 'year' | 'month' | 'day' | 'hour' | 'min' | 'sec' | 'msec'
-   `format` Format of the output, `type`: string, `default` - 'HH:mm:ss | dd/MM/yyyy'. `optional`
-   `useUTC` Local value or UTC value. By default it will show local value, `type`: boolean, `default` - false, `optional`
-   All the props are optional, so the function can be called like `formatDateTime()`.

### Formats

-   Check out this [`reference`](../format-date-time/format-date-time.md)

### Example

-   Date Input: Sat Jan 01 2050 13:14:15 GMT+0530 (India Standard Time)
-   `value`: 1, `type`: hour, `result`: Sat Jan 01 2050 14:14:15 GMT+0530 (India Standard Time)
