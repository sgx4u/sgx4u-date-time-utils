import { TIME_CONSTANTS } from '../constants/time.constants';
import {
	DateTimeDifferenceFormatType,
	DateTimeDifferencePropsType,
	DateTimeDifferenceReturnType,
	NumberFormatType,
} from './date-time-difference.types';

export function dateTimeDifference(): string;

/**
 * @function
 * @description Calculate the difference between two dates.
 * @param {Object} props { timeFrom, timeTo, format }
 * @property timeFrom - The starting date/time, type: unknown, default: new Date(), optional
 * @property timeTo - The ending date/time, type: unknown, default: new Date(), optional
 * @property format - The format of the difference, type: 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year' | 'full' | 'full-short-unit' | 'object' | 'object-total', default: 'full', optional
 * @returns { string | number | object } The difference, type: string | number | object
 */
export function dateTimeDifference<T extends DateTimeDifferenceFormatType>(
	props: DateTimeDifferencePropsType<T>,
): DateTimeDifferenceReturnType<T>;

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
	const multiplyValue = calculateTimeTo < calculateTimeFrom ? -1 : 1;

	// Cache object to store calculated values
	const totalDiffCache: Partial<{ [key in NumberFormatType]: number }> = {};

	// Function to compute total difference
	const getTotalDiff = (type: NumberFormatType): number => {
		if (totalDiffCache[type] !== undefined) return totalDiffCache[type];
		let value: number = 0;

		switch (type) {
			// Millisecond
			case 'millisecond':
				value = totalMillisecond * multiplyValue;
				break;
			// Second
			case 'second':
				value = (totalMillisecond / 1000) * multiplyValue;
				break;
			// Minute
			case 'minute':
				value = (totalMillisecond / (1000 * 60)) * multiplyValue;
				break;
			// Hour
			case 'hour':
				value = (totalMillisecond / (1000 * 60 * 60)) * multiplyValue;
				break;
			// Day
			case 'day':
				value = (totalMillisecond / (1000 * 60 * 60 * 24)) * multiplyValue;
				break;
			// Month
			case 'month':
				value = (totalMillisecond / (1000 * 60 * 60 * 24 * 30)) * multiplyValue;
				break;
			// Year
			case 'year':
				value = (totalMillisecond / TIME_CONSTANTS.YEAR_TO_MILLISECONDS) * multiplyValue;
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
		const { millisecond, second, minute, hour, day, month, year } = diff;

		if (year <= 0 && month <= 0 && day <= 0 && hour <= 0 && minute <= 0 && second <= 0 && millisecond <= 0) {
			return 'Same Time' as DateTimeDifferenceReturnType<T>;
		}

		const yearValue = year > 0 ? `${year * multiplyValue}year ` : '';
		const monthValue = month > 0 ? `${month * multiplyValue}month ` : '';
		const dayValue = day > 0 ? `${day * multiplyValue}day ` : '';
		const hourValue = hour > 0 ? `${hour * multiplyValue}hour ` : '';
		const minuteValue = minute > 0 ? `${minute * multiplyValue}minute ` : '';
		const secondValue = second > 0 ? `${second * multiplyValue}second ` : '';
		const millisecondValue = millisecond > 0 ? `${millisecond * multiplyValue}millisecond` : '';

		const result =
			`${yearValue}${monthValue}${dayValue}${hourValue}${minuteValue}${secondValue}${millisecondValue}`.trim();

		return result as DateTimeDifferenceReturnType<T>;
	}

	if (format === 'full-short-unit') {
		const diff = getNetDiff();
		const { year, month, day, hour, minute, second, millisecond } = diff;

		if (year === 0 && month === 0 && day === 0 && hour === 0 && minute === 0 && second === 0 && millisecond === 0) {
			return 'Same Time' as DateTimeDifferenceReturnType<T>;
		}

		const yearValue = year > 0 ? `${year * multiplyValue}yr ` : '';
		const monthValue = month > 0 ? `${month * multiplyValue}mo ` : '';
		const dayValue = day > 0 ? `${day * multiplyValue}day ` : '';
		const hourValue = hour > 0 ? `${hour * multiplyValue}hr ` : '';
		const minuteValue = minute > 0 ? `${minute * multiplyValue}min ` : '';
		const secondValue = second > 0 ? `${second * multiplyValue}sec ` : '';
		const millisecondValue = millisecond > 0 ? `${millisecond * multiplyValue}msec` : '';

		const result =
			`${yearValue}${monthValue}${dayValue}${hourValue}${minuteValue}${secondValue}${millisecondValue}`.trim();

		return result as DateTimeDifferenceReturnType<T>;
	}

	if (format === 'object') {
		const diff = getNetDiff();
		const { year, month, day, hour, minute, second, millisecond } = diff;

		return {
			millisecond: millisecond * multiplyValue,
			second: second * multiplyValue,
			minute: minute * multiplyValue,
			hour: hour * multiplyValue,
			day: day * multiplyValue,
			month: month * multiplyValue,
			year: year * multiplyValue,
		} as DateTimeDifferenceReturnType<T>;
	}

	if (format === 'object-total') {
		return {
			millisecond: totalMillisecond * multiplyValue,
			second: (totalMillisecond / 1000) * multiplyValue,
			minute: (totalMillisecond / (1000 * 60)) * multiplyValue,
			hour: (totalMillisecond / (1000 * 60 * 60)) * multiplyValue,
			day: (totalMillisecond / (1000 * 60 * 60 * 24)) * multiplyValue,
			month: (totalMillisecond / (1000 * 60 * 60 * 24 * 30)) * multiplyValue,
			year: (totalMillisecond / (1000 * 60 * 60 * 24 * 30 * 12)) * multiplyValue,
		} as DateTimeDifferenceReturnType<T>;
	}

	return getTotalDiff(format) as DateTimeDifferenceReturnType<T>;
}
