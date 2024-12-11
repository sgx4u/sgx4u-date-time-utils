/**
 * @type
 * @description Format date or time to a specific format.
 */
export type FormatDateTimePropsType = {
	/**
	 * @description The date to format.
	 * @type unknown
	 * @default new Date()
	 * @optional
	 * @summary I have allowed unknown type here, because if the given data is not of a supported type, it will return Invalid Date. So you can use the function even if you are not sure about the data type and you will not have to deal with TypeScript error.
	 */
	date?: unknown;

	/**
	 * @description The format to convert the date to.
	 * @type string
	 * @default 'HH:mm:ss | dd/MM/yyyy'
	 * @optional
	 * @format 'h', 'hh', 'H', 'HH', 'm', 'mm', 's', 'ss', 'S', 'SS', 'SSS', 'EEE', 'EEEE', 'd', 'dd', 'M', 'MM', 'MMM', 'MMMM', 'yy', 'yyyy', 'aa', 'full', 'UTC', 'ISO', 'dateString', 'timeString', 'locale', 'localeDate', 'localeTime'.
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

export type FormatOptionsType =
	| 'h'
	| 'hh'
	| 'H'
	| 'HH'
	| 'm'
	| 'mm'
	| 's'
	| 'ss'
	| 'S'
	| 'SS'
	| 'SSS'
	| 'EEE'
	| 'EEEE'
	| 'd'
	| 'dd'
	| 'M'
	| 'MM'
	| 'MMM'
	| 'MMMM'
	| 'yy'
	| 'yyyy'
	| 'aa'
	| 'full'
	| 'UTC'
	| 'ISO'
	| 'dateString'
	| 'timeString'
	| 'locale'
	| 'localeDate'
	| 'localeTime';

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
