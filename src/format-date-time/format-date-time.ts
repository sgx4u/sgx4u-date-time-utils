import { padNumber } from '../utils/number.utils';
import { getValueFromDate } from '../utils/date.utils';
import { daysFull, daysShort, monthsFull, monthsShort } from '../data/date.data';
import { DateGetterMethodOptionsType, FormatCharacterType, FormatDateTimePropsType } from './format-date-time.types';

/**
 * @function
 * @description Format date or time to a specific format
 * @returns { string | Date } The formatted date, type: string | Date
 */
export const formatDateTime = (props: FormatDateTimePropsType = {}): string => {
	const { date, format = 'HH:mm:ss | dd/MM/yyyy', useUTC = false } = props;

	const thisDate = !('date' in props) ? new Date() : date instanceof Date ? date : new Date(date as any);
	if (isNaN(thisDate.getTime())) return 'Invalid Date';

	if (format === 'full') return thisDate.toString();

	// Utility function to get a value from date
	const getValue = (method: DateGetterMethodOptionsType): number => {
		return getValueFromDate({ date: thisDate, method, useUTC });
	};

	// Utility to get stringified version of a number
	const getStringValue = (value: number): string => value.toString();

	// Cache object to store calculated values
	const formattedValueCache: Partial<{ [key in FormatCharacterType]: string }> = {};

	// Function to compute only necessary values
	const getFormattedValue = (type: FormatCharacterType): string => {
		if (formattedValueCache[type] !== undefined) return formattedValueCache[type];
		let value: string = '';

		switch (type) {
			// Hour 12h (1-12)
			case 'h':
				value = getStringValue(
					getValue('Hours') > 12 ? getValue('Hours') - 12 : getValue('Hours') === 0 ? 12 : getValue('Hours'),
				);
				break;
			// Hour 12h with leading 0 (01-12)
			case 'hh':
				value = padNumber(
					getValue('Hours') > 12 ? getValue('Hours') - 12 : getValue('Hours') === 0 ? 12 : getValue('Hours'),
				);
				break;
			// Hour 24h (0-23)
			case 'H':
				value = getStringValue(getValue('Hours'));
				break;
			// Hour 24h with leading 0 (00-23)
			case 'HH':
				value = padNumber(getValue('Hours'));
				break;
			// Minute (0-59)
			case 'm':
				value = getStringValue(getValue('Minutes'));
				break;
			// Minute with leading 0 (00-59)
			case 'mm':
				value = padNumber(getValue('Minutes'));
				break;
			// Second (0-59)
			case 's':
				value = getStringValue(getValue('Seconds'));
				break;
			// Second with leading 0 (00-59)
			case 'ss':
				value = padNumber(getValue('Seconds'));
				break;
			// Millisecond (0-999)
			case 'S':
				value = getStringValue(getValue('Milliseconds'));
				break;
			// Millisecond with 2 digits minimum (00-999)
			case 'SS':
				value = padNumber(getValue('Milliseconds'), 2);
				break;
			// Millisecond with 3 digits minimum (000-999)
			case 'SSS':
				value = padNumber(getValue('Milliseconds'), 3);
				break;
			// Day short (Sun-Sat)
			case 'EEE':
				value = daysShort[getValue('Day')];
				break;
			// Day full (Sunday-Saturday)
			case 'EEEE':
				value = daysFull[getValue('Day')];
				break;
			// Date (1-31)
			case 'd':
				value = getStringValue(getValue('Date'));
				break;
			// Date with leading 0 (01-31)
			case 'dd':
				value = padNumber(getValue('Date'));
				break;
			// Month (1-12)
			case 'M':
				value = getStringValue(getValue('Month') + 1);
				break;
			// Month with leading 0 (01-12)
			case 'MM':
				value = padNumber(getValue('Month') + 1);
				break;
			// Month short (Jan-Dec)
			case 'MMM':
				value = monthsShort[getValue('Month')];
				break;
			// Month full (January-December)
			case 'MMMM':
				value = monthsFull[getValue('Month')];
				break;
			// Year short (00-99)
			case 'yy':
				value = getValue('FullYear').toString().slice(-2);
				break;
			// Year full (0000-9999)
			case 'yyyy':
				value = getValue('FullYear').toString();
				break;
			// AM/PM
			case 'aa':
				value = getValue('Hours') >= 12 ? 'PM' : 'AM';
				break;
			// Default case
			default:
				value = '';
				break;
		}

		formattedValueCache[type] = value;
		return value;
	};

	const formattedDate = format.replace(
		/\b(h|hh|H|HH|m|mm|s|ss|S|SS|SSS|EEE|EEEE|d|dd|M|MM|MMM|MMMM|yy|yyyy|aa)\b/g,
		(match) => getFormattedValue(match as FormatCharacterType),
	);

	return formattedDate;
};
