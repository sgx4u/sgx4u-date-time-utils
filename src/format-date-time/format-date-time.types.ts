/**
 * @type
 * @description Format date or time to a specific format
 * @returns {string | Date} The formatted date, type: string | Date
 */
export type FormatDateTimePropsType = {
	/**
	 * @description The date to format
	 * @type unknown
	 * @default undefined
	 * @optional
	 */
	date?: unknown;

	/**
	 * @description The format to convert the date to.
	 * @type string
	 * @default 'HH:mm:ss | dd/MM/yyyy'
	 * @optional
	 * @format 'hh', 'HH', 'mm', 'ss', 'SSS', 'EEE', 'EEEE', 'dd', 'MM', 'MMM', 'MMMM', 'yy', 'yyyy', 'aa', 'full'.
	 */
	format?: string;

	/**
	 * @description Format as UTC instead of local time
	 * @type boolean
	 * @default false
	 * @optional
	 */
	useUTC?: boolean;

	/**
	 * @description By default the values are padded with 0, set this to false to disable padding
	 * @type boolean
	 * @default true
	 * @optional
	 */
	paddedValues?: boolean;
};

export type DateGetterMethodType = Extract<keyof Date, `get${string}`>;

export type DateGetterMethodOptionsType =
	| 'Hours'
	| 'Minutes'
	| 'Seconds'
	| 'Milliseconds'
	| 'Day'
	| 'Date'
	| 'Month'
	| 'FullYear';
