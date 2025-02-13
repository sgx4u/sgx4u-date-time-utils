import { daysFull, daysShort, monthsFull, monthsShort } from '../data/date.data';

/**
 * @function
 * @description Get the day name from the day index.
 * @param index - Index of the day; type: number
 * @param format - Format of the day name; type: 'short' | 'long'; default: 'long'; optional
 * @returns { string } The day name; type: string
 */
export const indexToDay = (index: number, format: 'short' | 'long' = 'long'): string => {
	if (index < 0 || index > 6) return 'Invalid Index';
	return format === 'short' ? daysShort[index] : daysFull[index];
};

/**
 * @function
 * @description Get the month name from the month index.
 * @param index - Index of the month; type: number
 * @param format - Format of the month name; type: 'short' | 'long'; default: 'long'; optional
 * @returns { string } The month name; type: string
 */
export const indexToMonth = (index: number, format: 'short' | 'long' = 'long'): string => {
	if (index < 0 || index > 11) return 'Invalid Index';
	return format === 'short' ? monthsShort[index] : monthsFull[index];
};
