export type DateTimeDifferenceFormatType =
	| 'millisecond'
	| 'second'
	| 'minute'
	| 'hour'
	| 'day'
	| 'month'
	| 'year'
	| 'full'
	| 'full-short-unit'
	| 'object'
	| 'object-total';

/**
 * @type
 * @description Calculate the difference between two dates.
 */
export type DateTimeDifferencePropsType<T> = {
	/**
	 * @description The starting time to calculate the difference from.
	 * @type unknown
	 * @default new Date()
	 * @optional
	 * @summary I have allowed unknown type here, because if the given data is not of a supported type, it will return Invalid Date. So you can use the function even if you are not sure about the data type and you will not have to deal with TypeScript error.
	 */
	timeFrom?: unknown;

	/**
	 * @description The end time to calculate the difference to.
	 * @type unknown
	 * @default new Date()
	 * @optional
	 * @summary I have allowed unknown type here, because if the given data is not of a supported type, it will return Invalid Date. So you can use the function even if you are not sure about the data type and you will not have to deal with TypeScript error.
	 */
	timeTo?: unknown;

	/**
	 * @description The format to convert the difference to.
	 * @type string
	 * @default 'full'
	 * @optional
	 * @format 'millisecond', 'second', 'minute', 'hour', 'day', 'month', 'year', 'full', 'object', 'object-total'.
	 */
	format?: T;
};

export type NumberFormatType = Exclude<
	DateTimeDifferenceFormatType,
	'full' | 'full-short-unit' | 'object' | 'object-total'
>;

export type DateTimeDifferenceReturnType<T> = T extends 'object' | 'object-total'
	? object
	: T extends NumberFormatType
	? number
	: string;
