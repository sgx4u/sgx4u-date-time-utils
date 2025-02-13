import { describe, expect, test } from '@jest/globals';

import { isLeapYear } from './is-leap-year';

describe('isLeapYear utility function', () => {
	// Check if the date is valid
	test('Should return true/false according to the value', () => {
		// Test 1: Invalid Input
		expect(isLeapYear('ABC')).toBe(false);
		// Test 2: Year that is divisible by both 4 and 100
		expect(isLeapYear(1700)).toBe(false);
		// Test 3: Year in string format
		expect(isLeapYear('1700')).toBe(false);
		// Test 4: Negative value
		expect(isLeapYear(-2000)).toBe(false);
		// Test 5: Leap year in string format
		expect(isLeapYear('2024')).toBe(true);
		// Test 6: Non-leap year in string format
		expect(isLeapYear('2025')).toBe(false);
	});
});
