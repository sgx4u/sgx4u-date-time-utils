import { describe, expect, test } from '@jest/globals';

import { isValidDate } from './is-valid-date';

describe('isValidDate utility function', () => {
	// Check if the date is valid
	test('Should return true/false according to the value', () => {
		// Test 1: Invalid Input
		expect(isValidDate('')).toBe(false);
		// Test 2: New Date
		expect(isValidDate(new Date())).toBe(true);
		// Test 3: ISO Date String
		expect(isValidDate('2025-02-13T14:36:27.565Z')).toBe(true);
		// Test 4: Timestamp
		expect(isValidDate(1739457559735)).toBe(true);
		// Test 5: Date String - dd/MM/yyyy format
		expect(isValidDate('28/02/2025', 'dd/MM/yyyy')).toBe(true);
		// Test 6: Date String - dd/MM/yy format
		expect(isValidDate('28/02/2025', 'dd/MM/yy')).toBe(false);
		// Test 7: Date String - dd/MM/yy format - Check February 29th
		expect(isValidDate('29/02/25', 'dd/MM/yy')).toBe(false);
		// Test 8: Date String - dd/MM/yy format - Check other dates and months
		expect(isValidDate('31/03/25', 'dd/MM/yy')).toBe(true);
		// Test 9: Date String - yy-dd-MM format
		expect(isValidDate('25-31-03', 'yy-dd-MM')).toBe(true);
		// Test 10: Date String -EEE-yy-dd-MM format
		expect(isValidDate('Sun-24-29-01', 'EEE-yy-dd-MM')).toBe(true);
	});
});
