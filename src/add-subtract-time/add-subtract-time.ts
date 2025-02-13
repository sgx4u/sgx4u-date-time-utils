import { AddSubtractTimePropsType } from './add-subtract-time.types';
import { TIME_CONSTANTS } from '../constants/time.constants';
import { formatDateTime } from '../format-date-time/format-date-time';

/**
 * @function
 * @description Add/Subtract time value from a given time and get the new value in different formats.
 * @param {Object} props { date, value, type, format }
 * @property date - The date to format; type: unknown; default: new Date(); optional
 * @property value - The value to add/subtract; type: number
 * @property type - The type of value that is provided to be added/subtracted; type: 'year' | 'month' | 'day' | 'hour' | 'min' | 'sec' | 'msec'
 * @property format - The format of the date; type: string; default: 'full'; optional
 * @returns { string } The formatted date; type: string
 */
export const addSubtractTime = (props: AddSubtractTimePropsType): string => {
	const { date, value, type, format = 'full', useUTC } = props;

	const thisDate = !('date' in props) ? new Date() : date instanceof Date ? date : new Date(date as any);
	if (isNaN(thisDate.getTime())) return 'Invalid Date';

	const valueToMultiply = {
		year: TIME_CONSTANTS.YEAR_TO_MILLISECONDS,
		month: TIME_CONSTANTS.MONTH_TO_MILLISECONDS,
		day: TIME_CONSTANTS.DAY_TO_MILLISECONDS,
		hour: TIME_CONSTANTS.HOUR_TO_MILLISECONDS,
		min: TIME_CONSTANTS.MINUTE_TO_MILLISECONDS,
		sec: TIME_CONSTANTS.SECOND_TO_MILLISECONDS,
		msec: 1,
	};

	const givenTimeInMilliseconds = thisDate.getTime();
	const newTimeInMilliseconds = givenTimeInMilliseconds + value * valueToMultiply[type];

	const outputFormat = formatDateTime({ date: newTimeInMilliseconds, format, useUTC });
	return outputFormat;
};
