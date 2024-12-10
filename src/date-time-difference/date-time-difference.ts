import { TIME_CONSTANTS } from '../constants/time.constants';
import {
	DateTimeDifferenceFormatType,
	DateTimeDifferencePropsType,
	DateTimeDifferenceReturnType,
	NumberFormatType,
} from './date-time-difference.types';

export function dateTimeDifference(): string;

export function dateTimeDifference<T extends DateTimeDifferenceFormatType>(
	props: DateTimeDifferencePropsType<T>,
): DateTimeDifferenceReturnType<T>;

/**
 * @function
 * @description Calculate the difference between two dates.
 * @returns { string | number | object } The difference, type: string | number | object
 */
export function dateTimeDifference<T extends DateTimeDifferenceFormatType>(
	props: DateTimeDifferencePropsType<T> = {},
): DateTimeDifferenceReturnType<T> {
	const { timeFrom, timeTo, format = 'full' } = props;

	const calculateTimeFrom = !('timeFrom' in props) ? new Date().getTime() : new Date(timeFrom as any).getTime();
	const calculateTimeTo = !('timeTo' in props) ? new Date().getTime() : new Date(timeTo as any).getTime();

	if (isNaN(calculateTimeFrom) || isNaN(calculateTimeTo)) {
		const invalidTimeFrom = isNaN(calculateTimeFrom) ? `Invalid From Date` : '';
		const separator = isNaN(calculateTimeFrom) && isNaN(calculateTimeTo) ? ` & ` : '';
		const invalidTimeTo = isNaN(calculateTimeTo) ? `Invalid To Date` : '';

		return `${invalidTimeFrom}${separator}${invalidTimeTo}` as DateTimeDifferenceReturnType<T>;
	}

	const totalMillisecond = Math.abs(calculateTimeTo - calculateTimeFrom);
	const isNegativeValue = calculateTimeTo < calculateTimeFrom;

	// Cache object to store calculated values
	const totalDiffCache: Partial<{ [key in NumberFormatType]: number }> = {};

	// Function to compute total difference
	const getTotalDiff = (type: NumberFormatType): number => {
		if (totalDiffCache[type] !== undefined) return totalDiffCache[type];
		let value: number = 0;

		switch (type) {
			// Millisecond
			case 'millisecond':
				value = totalMillisecond;
				break;
			// Second
			case 'second':
				value = totalMillisecond / 1000;
				break;
			// Minute
			case 'minute':
				value = totalMillisecond / (1000 * 60);
				break;
			// Hour
			case 'hour':
				value = totalMillisecond / (1000 * 60 * 60);
				break;
			// Day
			case 'day':
				value = totalMillisecond / (1000 * 60 * 60 * 24);
				break;
			// Month
			case 'month':
				value = totalMillisecond / (1000 * 60 * 60 * 24 * 30);
				break;
			// Year
			case 'year':
				value = totalMillisecond / TIME_CONSTANTS.YEAR_TO_MILLISECONDS;
				break;
			// Default case
			default:
				value = 0;
				break;
		}

		totalDiffCache[type] = value;
		return value;
	};

	// Function to compute net difference
	const getNetDiff = (): { [key in NumberFormatType]: number } => {
		let millisecond = totalMillisecond % TIME_CONSTANTS.YEAR_TO_MILLISECONDS;
		let second = Math.floor(millisecond / 1000);
		let minute = Math.floor(second / 60);
		let hour = Math.floor(minute / 60);
		let day = Math.floor(hour / 24);
		let month = Math.floor(day / 30);
		const year = Math.floor(totalMillisecond / TIME_CONSTANTS.YEAR_TO_MILLISECONDS);

		millisecond = millisecond % 1000;
		second = second % 60;
		minute = minute % 60;
		hour = hour % 24;
		day = day % 30;
		month = month % 12;

		return {
			millisecond,
			second,
			minute,
			hour,
			day,
			month,
			year,
		};
	};

	if (format === 'full') {
		const diff = getNetDiff();
		const { year, month, day, hour, minute, second, millisecond } = diff;

		if (year <= 0 && month <= 0 && day <= 0 && hour <= 0 && minute <= 0 && second <= 0 && millisecond <= 0) {
			return 'Same Time' as DateTimeDifferenceReturnType<T>;
		}

		const result = `
			${year > 0 ? `${year * (isNegativeValue ? -1 : 1)}year ` : ''}
			${month > 0 ? `${month * (isNegativeValue ? -1 : 1)}month ` : ''}
			${day > 0 ? `${day * (isNegativeValue ? -1 : 1)}day ` : ''}
			${hour > 0 ? `${hour * (isNegativeValue ? -1 : 1)}hour ` : ''}
			${minute > 0 ? `${minute * (isNegativeValue ? -1 : 1)}minute ` : ''}
			${second > 0 ? `${second * (isNegativeValue ? -1 : 1)}second ` : ''}
			${millisecond > 0 ? `${millisecond * (isNegativeValue ? -1 : 1)}millisecond` : ''}
		`;
		return result.trim() as DateTimeDifferenceReturnType<T>;
	}

	if (format === 'full-short-unit') {
		const diff = getNetDiff();
		const { year, month, day, hour, minute, second, millisecond } = diff;

		if (year <= 0 && month <= 0 && day <= 0 && hour <= 0 && minute <= 0 && second <= 0 && millisecond <= 0) {
			return 'Same Time' as DateTimeDifferenceReturnType<T>;
		}

		const result = `
			${year > 0 ? `${year * (isNegativeValue ? -1 : 1)}yr ` : ''}
			${month > 0 ? `${month * (isNegativeValue ? -1 : 1)}mo ` : ''}
			${day > 0 ? `${day * (isNegativeValue ? -1 : 1)}day ` : ''}
			${hour > 0 ? `${hour * (isNegativeValue ? -1 : 1)}hr ` : ''}
			${minute > 0 ? `${minute * (isNegativeValue ? -1 : 1)}min ` : ''}
			${second > 0 ? `${second * (isNegativeValue ? -1 : 1)}sec ` : ''}
			${millisecond > 0 ? `${millisecond * (isNegativeValue ? -1 : 1)}msec` : ''}
		`;
		return result.trim() as DateTimeDifferenceReturnType<T>;
	}

	if (format === 'object') {
		const diff = getNetDiff();
		const { year, month, day, hour, minute, second, millisecond } = diff;

		return {
			millisecond: millisecond * (isNegativeValue ? -1 : 1),
			second: second * (isNegativeValue ? -1 : 1),
			minute: minute * (isNegativeValue ? -1 : 1),
			hour: hour * (isNegativeValue ? -1 : 1),
			day: day * (isNegativeValue ? -1 : 1),
			month: month * (isNegativeValue ? -1 : 1),
			year: year * (isNegativeValue ? -1 : 1),
		} as DateTimeDifferenceReturnType<T>;
	}

	if (format === 'object-total') {
		return {
			millisecond: totalMillisecond,
			second: totalMillisecond / 1000,
			minute: totalMillisecond / (1000 * 60),
			hour: totalMillisecond / (1000 * 60 * 60),
			day: totalMillisecond / (1000 * 60 * 60 * 24),
			month: totalMillisecond / (1000 * 60 * 60 * 24 * 30),
			year: totalMillisecond / (1000 * 60 * 60 * 24 * 30 * 12),
		} as DateTimeDifferenceReturnType<T>;
	}

	return getTotalDiff(format) as DateTimeDifferenceReturnType<T>;
}
