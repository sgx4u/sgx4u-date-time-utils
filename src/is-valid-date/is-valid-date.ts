import { daysFull, daysShort, monthsFull, monthsShort } from '../data/date.data';
import { isLeapYear } from '../is-leap-year/is-leap-year';
import { padNumber } from '../utils/number.utils';

// Check if the format and date separators are the same.
const checkIfAllSeparatorsAreValid = (date: string, format: string): boolean => {
	const dateSeparators = date.match(/[^a-zA-Z0-9]+/g) || [];
	const formatSeparators = format.match(/[^a-zA-Z0-9]+/g) || [];

	// Check if the length of separators are same
	if (formatSeparators.length !== dateSeparators.length) return false;

	// Check if the separators are same
	for (const [index, separator] of formatSeparators.entries()) {
		if (separator !== dateSeparators[index]) return false;
	}

	return true;
};

// Check if the tokens are valid.
const checkIfAllTokensAreValid = (tokens: string[], tokenValues: string[]): boolean => {
	const allowedCharacters = ['EEE', 'EEEE', 'day', 'dd', 'MM', 'MMM', 'MMMM', 'month', 'yy', 'yyyy', 'year'];

	// Check if the number of tokens and token values are the same
	if (tokens.length !== tokenValues.length) return false;

	// Check if all tokens are valid
	for (const token of tokens) {
		if (!allowedCharacters.includes(token)) return false;
	}

	return true;
};

// Get the list of weekdays for the given date in every month in the given year.
const getDaysOfMonth = (date: number, year: number): string[] => {
	const weekdays: string[] = [];

	Array.from({ length: 12 }, (_, month) => {
		const shortDay = new Date(year, month, date).toLocaleDateString('en-US', { weekday: 'short' });
		const fullDay = new Date(year, month, date).toLocaleDateString('en-US', { weekday: 'long' });
		if (!weekdays.includes(shortDay)) weekdays.push(shortDay);
		if (!weekdays.includes(fullDay)) weekdays.push(fullDay);
	});

	return weekdays;
};

/**
 * @function
 * @description - Check if the given date is valid or not.
 * @param date - The date to check; type: unknown
 * @param format - Format of the date in string format; values - 'EEE', 'EEEE', 'day', 'dd', 'MM', 'MMM', 'MMMM', 'month', 'yy', 'yyyy', 'year'; optional
 * @returns { boolean } True if the date is valid, otherwise false; type: boolean
 */
export const isValidDate = (date: unknown, format?: string): boolean => {
	let isValid = false;

	try {
		const newDate = new Date(date as any);
		if (newDate instanceof Date && !isNaN(newDate.getTime())) isValid = true;
	} catch (error) {
		console.error(error);
	}

	if (!format || typeof date !== 'string') return isValid;

	// Check if the format and date separators are the same.
	if (!checkIfAllSeparatorsAreValid(date, format)) return false;

	const tokens = format.match(/[a-zA-Z0-9]+/g) || [];
	const tokenValues = date.match(/[a-zA-Z0-9]+/g) || [];

	// Check if the tokens are valid.
	if (!checkIfAllTokensAreValid(tokens, tokenValues)) return false;

	const monthsWith31Days = ['00', '02', '04', '06', '07', '09', '11'];

	let yearValue: string | undefined = undefined;
	let monthValue: number | undefined = undefined;
	let dateValue: number | undefined = undefined;
	let dayValue: number | undefined = undefined;

	// Check if the values are valid.
	for (const [index, token] of tokens.entries()) {
		const value = tokenValues[index];
		if (!value) return false;

		// Validate year
		if (token === 'yy' || token === 'yyyy' || token === 'year') {
			// Check if the year value is valid
			if (token === 'yy' && value.length !== 2) return false;
			if (token === 'yyyy' && value.length !== 4) return false;
			if (token === 'year' && value.length !== 2 && value.length !== 4) return false;

			const yearInNumber = parseInt(value);
			if (isNaN(yearInNumber) || yearInNumber < 0 || yearInNumber > 9999) return false;

			const yearValuePadded = padNumber(yearInNumber, 4);
			if (yearValue === undefined) yearValue = yearValuePadded;
			else if (yearValue.slice(-2) !== yearValuePadded.slice(-2)) return false;
		}

		// Validate month
		if (token === 'MM' || token === 'MMM' || token === 'MMMM' || token === 'month') {
			let monthIndex = -1;

			// Check if the month value in digit is valid
			const evaluateMonthInDigits = () => {
				const monthInNumber = parseInt(value);
				if (isNaN(monthInNumber) || monthInNumber < 1 || monthInNumber > 12) return false;
				monthIndex = monthInNumber - 1;
			};

			if (token === 'MM') evaluateMonthInDigits();
			if (token === 'MMM') monthIndex = monthsShort.indexOf(value);
			if (token === 'MMMM') monthIndex = monthsFull.indexOf(value);
			if (token === 'month') {
				if (!isNaN(parseInt(value))) evaluateMonthInDigits();

				if (value.length === 3) {
					const valueFromShort = monthsShort.indexOf(value);
					if (valueFromShort !== -1) monthIndex = valueFromShort;
				} else {
					const valueFromFull = monthsFull.indexOf(value);
					if (valueFromFull !== -1) monthIndex = valueFromFull;
				}
			}

			if (monthIndex === -1) return false;
			if (monthValue === undefined) monthValue = monthIndex;
			else if (monthValue !== monthIndex) return false;
		}

		// Validate date
		if (token === 'dd') {
			const dateInNumber = parseInt(value);
			if (isNaN(dateInNumber) || dateInNumber < 1 || dateInNumber > 31) return false;

			if (dateValue === undefined) dateValue = dateInNumber;
			else if (dateValue !== dateInNumber) return false;
		}

		// Validate day
		if (token === 'EEE' || token === 'EEEE' || token === 'day') {
			let dayIndex = -1;

			if (token === 'EEE') dayIndex = daysShort.indexOf(value);
			if (token === 'EEEE') dayIndex = daysFull.indexOf(value);
			if (token === 'day') {
				if (value.length === 3) {
					const valueFromShort = daysShort.indexOf(value);
					if (valueFromShort !== -1) dayIndex = valueFromShort;
				} else {
					const valueFromFull = daysFull.indexOf(value);
					if (valueFromFull !== -1) dayIndex = valueFromFull;
				}
			}

			if (dayIndex === -1) return false;
			if (dayValue === undefined) dayValue = dayIndex;
			else if (dayValue !== dayIndex) return false;
		}
	}

	// Check if the date is valid
	if (dateValue && monthValue) {
		if (dateValue > 29 && monthValue === 1) return false;
		if (dateValue === 29 && monthValue === 1 && yearValue && !isLeapYear(yearValue)) return false;
		if (dateValue === 31 && !monthsWith31Days.includes(padNumber(monthValue))) return false;
	}

	// Check if the day is valid
	if (dayValue && dateValue && yearValue) {
		if (monthValue) {
			const dayShort = new Date(parseInt(yearValue), monthValue, dateValue).toLocaleDateString('en-US', {
				weekday: 'short',
			});
			const dayLong = new Date(parseInt(yearValue), monthValue, dateValue).toLocaleDateString('en-US', {
				weekday: 'long',
			});
			if (dayShort !== daysShort[dayValue] && dayLong !== daysFull[dayValue]) return false;
		} else {
			const possibleDaysWithThisDate = getDaysOfMonth(dateValue, parseInt(yearValue));
			if (
				!possibleDaysWithThisDate.includes(daysShort[dayValue]) &&
				!possibleDaysWithThisDate.includes(daysFull[dayValue])
			) {
				return false;
			}
		}
	}

	return true;
};
