import { padNumber } from '../utils/number.utils';
import { getValueFromDate } from '../utils/date.utils';
import { daysFull, daysShort, monthsFull, monthsShort } from '../data/month.data';
import { DateGetterMethodOptionsType, FormatDateTimePropsType } from './format-date-time.types';

export const formatDateTime = (props: FormatDateTimePropsType = {}): string => {
	const { date, format = 'HH:mm:ss | dd/MM/yyyy', useUTC = false } = props;

	const thisDate = !('date' in props) ? new Date() : date instanceof Date ? date : new Date(date as any);
	if (isNaN(thisDate.getTime())) return 'Invalid Date';

	if (format === 'full') return thisDate.toString();

	const getValue = (method: DateGetterMethodOptionsType): number => {
		return getValueFromDate({ date: thisDate, method, useUTC });
	};

	const getStringValue = (value: number): string => value.toString();

	const formattedValues: Record<string, string> = {
		// Hour 12h (1-12)
		h: getStringValue(
			getValue('Hours') > 12 ? getValue('Hours') - 12 : getValue('Hours') === 0 ? 12 : getValue('Hours'),
		),
		// Hour 12h with leading 0 (01-12)
		hh: padNumber(
			getValue('Hours') > 12 ? getValue('Hours') - 12 : getValue('Hours') === 0 ? 12 : getValue('Hours'),
		),
		// Hour 24h (0-23)
		H: getStringValue(getValue('Hours')),
		// Hour 24h with leading 0 (00-23)
		HH: padNumber(getValue('Hours')),
		// Minute (0-59)
		m: getStringValue(getValue('Minutes')),
		// Minute with leading 0 (00-59)
		mm: padNumber(getValue('Minutes')),
		// Second (0-59)
		s: getStringValue(getValue('Seconds')),
		// Second with leading 0 (00-59)
		ss: padNumber(getValue('Seconds')),
		// Millisecond (0-999)
		S: getStringValue(getValue('Milliseconds')),
		// Millisecond with 2 digits minimum (00-999)
		SS: padNumber(getValue('Milliseconds'), 2),
		// Millisecond with 3 digits minimum (000-999)
		SSS: padNumber(getValue('Milliseconds'), 3),
		// Day short (Sun-Sat)
		EEE: daysShort[getValue('Day')],
		// Day full (Sunday-Saturday)
		EEEE: daysFull[getValue('Day')],
		// Date (1-31)
		d: getStringValue(getValue('Date')),
		// Date with leading 0 (01-31)
		dd: padNumber(getValue('Date')),
		// Month (1-12)
		M: getStringValue(getValue('Month') + 1),
		// Month with leading 0 (01-12)
		MM: padNumber(getValue('Month') + 1),
		// Month short (Jan-Dec)
		MMM: monthsShort[getValue('Month')],
		// Month full (January-December)
		MMMM: monthsFull[getValue('Month')],
		// Year short (00-99)
		yy: getValue('FullYear').toString().slice(-2),
		// Year full (0000-9999)
		yyyy: getValue('FullYear').toString(),
		// AM/PM
		aa: getValue('Hours') >= 12 ? 'PM' : 'AM',
	};

	const formattedDate = format.replace(
		/\b(h|hh|H|HH|m|mm|s|ss|S|SS|SSS|EEE|EEEE|d|dd|M|MM|MMM|MMMM|yy|yyyy|aa)\b/g,
		(match) => formattedValues[match],
	);

	return formattedDate;
};
