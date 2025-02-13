import { daysFull } from '../data/date.data';

type DayType = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

/**
 * @function
 * @description - Find the next occurrence of the given day.
 * @param day - The day to find the next occurrence of; type: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'
 * @param startDate - The date to start checking from; type: Date | string | number; default: current date; optional
 * @returns { string } Returns UTC value of the result date; type: string
 */
export const getNextOccurrence = (day: DayType, startDate: Date | string | number = new Date()): string => {
	const date = new Date(startDate);
	if (!(date instanceof Date) || isNaN(date.getTime())) return 'Invalid date';

	const requiredDayIndex = daysFull.indexOf(day);
	const currentDayIndex = date.getUTCDay();

	const daysToAdd = requiredDayIndex - currentDayIndex + (requiredDayIndex < currentDayIndex ? 7 : 0);
	date.setUTCDate(date.getUTCDate() + daysToAdd);
	return date.toUTCString();
};
