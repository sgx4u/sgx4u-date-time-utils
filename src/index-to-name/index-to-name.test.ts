import { describe, expect, test } from '@jest/globals';

import { indexToDay, indexToMonth } from './index-to-name';

describe('FormatDateTime utility function', () => {
	// Test 1: Check if the day/month name is returned correctly
	test('Should return the day/month name', () => {
		const dayName = indexToDay(0);
		expect(dayName).toBe('Sunday');

		const monthName = indexToMonth(0);
		expect(monthName).toBe('January');
	});

	// Test 2: Ensure 'Invalid Index' is returned for outside range values
	test('Should return "Invalid Index" when index is outside range', () => {
		const dayName1 = indexToDay(-1);
		expect(dayName1).toBe('Invalid Index');

		const dayName2 = indexToDay(7);
		expect(dayName2).toBe('Invalid Index');

		const monthName1 = indexToDay(-1);
		expect(monthName1).toBe('Invalid Index');

		const monthName2 = indexToDay(12);
		expect(monthName2).toBe('Invalid Index');
	});

	// Test 3: Check short form of the day/month name
	test('Should return short form of the day/month name', () => {
		const dayName = indexToDay(0, 'short');
		expect(dayName).toBe('Sun');

		const monthName = indexToMonth(0, 'short');
		expect(monthName).toBe('Jan');
	});
});
