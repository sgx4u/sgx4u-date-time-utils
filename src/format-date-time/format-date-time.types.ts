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
	 * @format 'h', 'hh', 'H', 'HH', 'm', 'mm', 's', 'ss', 'S', 'SS', 'SSS', 'EEE', 'EEEE', 'd', 'dd', 'M', 'MM', 'MMM', 'MMMM', 'yy', 'yyyy', 'aa', 'full'.
	 */
	format?: string;

	/**
	 * @description Format as UTC instead of local time
	 * @type boolean
	 * @default false
	 * @optional
	 */
	useUTC?: boolean;
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
