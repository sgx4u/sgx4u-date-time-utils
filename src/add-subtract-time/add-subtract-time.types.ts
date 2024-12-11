/**
 * @type
 * @description Add/Subtract time value from a given time and get the new value in different formats.
 */
export type AddSubtractTimePropsType = {
	/**
	 * @description The base date.
	 * @type unknown
	 * @default new Date()
	 * @optional
	 * @summary I have allowed unknown type here, because if the given data is not of a supported type, it will return Invalid Date. So you can use the function even if you are not sure about the data type and you will not have to deal with TypeScript error.
	 */
	date?: unknown;

	/**
	 * @description The value to add/subtract.
	 * @type number
	 */
	value: number;

	/**
	 * @description The type of value that is provided to be added/subtracted.
	 * @type 'year' | 'month' | 'day' | 'hour' | 'min' | 'sec'
	 */
	type: 'year' | 'month' | 'day' | 'hour' | 'min' | 'sec' | 'msec';

	/**
	 * @description The format to convert the date to.
	 * @type string
	 * @default 'full'
	 * @optional
	 * @format 'h', 'hh', 'H', 'HH', 'm', 'mm', 's', 'ss', 'S', 'SS', 'SSS', 'EEE', 'EEEE', 'd', 'dd', 'M', 'MM', 'MMM', 'MMMM', 'yy', 'yyyy', 'aa', 'full', 'UTC', 'ISO', 'date-string', 'time-string', 'local', 'local-date', 'local-time'.
	 */
	format?: string;

	/**
	 * @description Format as UTC instead of local time.
	 * @type boolean
	 * @default false
	 * @optional
	 */
	useUTC?: boolean;
};
