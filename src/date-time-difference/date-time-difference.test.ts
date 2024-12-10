import { describe, expect, test } from '@jest/globals';

import { dateTimeDifference } from './date-time-difference';

describe('FormatDateTime utility function', () => {
	// Test 1: Default format
	test('Should return default formatted difference when no arguments are provided', () => {
		const result1 = dateTimeDifference();
		expect(result1).toBe('Same Time');
	});

	// Test 2: Ensure 'Invalid Date' is returned for non-date object
	test('Should return "Invalid From Date" and "Invalid To Date" when invalid date is provided', () => {
		expect(dateTimeDifference({ timeFrom: undefined })).toBe('Invalid From Date');
		expect(dateTimeDifference({ timeTo: undefined })).toBe('Invalid To Date');
		expect(dateTimeDifference({ timeFrom: undefined, timeTo: undefined })).toBe(
			'Invalid From Date & Invalid To Date',
		);
	});

	// Test 3: Check format tokens
	test('Should return all the different possible values', () => {
		const timeFrom = new Date('2024-01-01T01:01:01.000Z');
		const timeTo = new Date('2025-01-01T01:01:01.000Z');

		const result1 = dateTimeDifference({ timeFrom, timeTo, format: 'object' });
		expect(JSON.stringify(result1)).toBe(
			JSON.stringify({
				millisecond: 0,
				second: 0,
				minute: 0,
				hour: 0,
				day: 1,
				month: 0,
				year: 1,
			}),
		);

		const result2 = dateTimeDifference({ timeFrom, timeTo, format: 'object-total' });
		expect(JSON.stringify(result2)).toBe(
			JSON.stringify({
				millisecond: 31622400000,
				second: 31622400,
				minute: 527040,
				hour: 8784,
				day: 366,
				month: 12.2,
				year: 1.0166666666666666,
			}),
		);
	});
});
