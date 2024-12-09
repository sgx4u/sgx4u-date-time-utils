import { describe, expect, test } from '@jest/globals';

import { formatDateTime } from './format-date-time';

describe('FormatDateTime utility function', () => {
	// Test 1: Default format
	test('Should return default formatted date when no arguments are provided', () => {
		const result1 = formatDateTime();
		expect(result1).toMatch(/^\d{2}:\d{2}:\d{2} \| \d{2}\/\d{2}\/\d{4}$/);

		const date = new Date();
		const result2 = formatDateTime({ date });
		expect(result2).toMatch(/^\d{2}:\d{2}:\d{2} \| \d{2}\/\d{2}\/\d{4}$/);
	});

	// Test 2: Ensure 'Invalid Date' is returned for non-date object
	test('Should return "Invalid Date" when invalid date is provided', () => {
		expect(formatDateTime({ date: undefined })).toBe('Invalid Date');
		expect(formatDateTime({ date: 'invalid-date' })).toBe('Invalid Date');
		expect(formatDateTime({ date: null })).toMatch(/^\d{2}:\d{2}:\d{2} \| \d{2}\/\d{2}\/\d{4}$/);
	});

	// Test 3: Check all the format tokens
	test('Should return all the different possible values', () => {
		const date = new Date(Date.UTC(2024, 11, 9, 8, 38, 16, 79));

		const result1 = formatDateTime({ date, format: 'full', useUTC: true });
		expect(result1).toBe(date.toString());

		const result2 = formatDateTime({
			date,
			format: 'hh:HH:mm:ss:SSS:EEE:EEEE:dd:MM:MMM:MMMM:yy:yyyy:aa',
			useUTC: true,
		});
		expect(result2).toBe('08:08:38:16:079:Mon:Monday:09:12:Dec:December:24:2024:AM');

		const result3 = formatDateTime({
			date,
			format: 'hh-HH-mm-ss-SSS-EEE-EEEE-dd-MM-MMM-MMMM-yy-yyyy-aa',
			useUTC: true,
		});
		expect(result3).toBe('08-08-38-16-079-Mon-Monday-09-12-Dec-December-24-2024-AM');

		const result4 = formatDateTime({
			date,
			format: 'hh HH mm ss SSS EEE EEEE dd MM MMM MMMM yy yyyy aa',
			useUTC: true,
		});
		expect(result4).toBe('08 08 38 16 079 Mon Monday 09 12 Dec December 24 2024 AM');
	});

	// Test 4: Test padded values
	test('Should pad values when paddedValues is true', () => {
		const date = new Date(Date.UTC(2024, 11, 9, 8, 38, 16, 79));
		const result = formatDateTime({ date, format: 'HH:mm:ss', useUTC: true });
		expect(result).toBe('08:38:16');
	});

	// Test 5: Test non-padded values
	test('Should not pad values when paddedValues is false', () => {
		const date = new Date(Date.UTC(2024, 11, 9, 8, 38, 16, 79));
		const result = formatDateTime({ date, format: 'HH:mm:ss', useUTC: true, paddedValues: false });
		expect(result).toBe('8:38:16');
	});
});
