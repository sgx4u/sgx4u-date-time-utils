import { describe, expect, test } from '@jest/globals';

import { getNextOccurrence } from './get-next-occurrence';

describe('getNextOccurrence utility function', () => {
	// Test 1: Test for next occurrence of a weekday
	test('Should return the correct next Monday from today', () => {
		const today = new Date();
		const result = getNextOccurrence('Monday');
		expect(new Date(result).getTime()).toBeGreaterThan(today.getTime()); // Ensure it's a future date
	});

	// Test 2: Test with a specific start date
	test('Should return the next occurrence of Sunday from a given date', () => {
		const result = getNextOccurrence('Sunday', new Date('2025-02-10')); // Monday
		expect(result).toBe('Sun, 16 Feb 2025 00:00:00 GMT');
	});

	// Test 3: Test if the function correctly rolls over to the next week
	test('Should return the correct next Friday when today is Saturday', () => {
		const result = getNextOccurrence('Monday', new Date('2025-02-28')); // Friday
		expect(result).toBe('Mon, 03 Mar 2025 00:00:00 GMT');
	});

	// Test 4: Test for invalid date
	test('Should return "Invalid date" for an invalid date', () => {
		const result = getNextOccurrence('Monday', 'ABC');
		expect(result).toBe('Invalid date');
	});
});
