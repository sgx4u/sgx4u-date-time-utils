import { padNumber } from '../utils/number.utils';
import { getValueFromDate } from '../utils/date.utils';
import { daysFull, daysShort, monthsFull, monthsShort } from '../data/month.data';
import { DateGetterMethodOptionsType, FormatDateTimePropsType } from './format-date-time.types';

export const formatDateTime = (props: FormatDateTimePropsType = {}): string => {
	const { date, format = 'HH:mm:ss | dd/MM/yyyy', useUTC = false, paddedValues = true } = props;

	const thisDate = !('date' in props) ? new Date() : date instanceof Date ? date : new Date(date as any);
	if (isNaN(thisDate.getTime())) return 'Invalid Date';

	if (format === 'full') return thisDate.toString();

	const getValue = (method: DateGetterMethodOptionsType): number => {
		return getValueFromDate({ date: thisDate, method, useUTC });
	};

	const paddedValue = (value: number, digits: number = 2): string => {
		return paddedValues ? padNumber(value, digits) : value.toString();
	};

	const formattedValues: Record<string, string> = {
		// Hour 12h (01-12)
		hh: paddedValue(
			getValue('Hours') > 12 ? getValue('Hours') - 12 : getValue('Hours') === 0 ? 12 : getValue('Hours'),
		),
		// Hour 24h (00-23)
		HH: paddedValue(getValue('Hours')),
		// Minute (00-59)
		mm: paddedValue(getValue('Minutes')),
		// Second (00-59)
		ss: paddedValue(getValue('Seconds')),
		// Millisecond (000-999)
		SSS: paddedValue(getValue('Milliseconds'), 3),
		// Day (Sun-Sat)
		EEE: daysShort[getValue('Day')],
		// Day full (Sunday-Saturday)
		EEEE: daysFull[getValue('Day')],
		// Date (01-31)
		dd: paddedValue(getValue('Date')),
		// Month (01-12)
		MM: paddedValue(getValue('Month') + 1),
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
		/\b(hh|HH|mm|ss|SSS|EEE|EEEE|dd|MM|MMM|MMMM|yy|yyyy|aa)\b/g,
		(match) => formattedValues[match],
	);

	return formattedDate;
};
