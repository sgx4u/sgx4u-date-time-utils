import { describe, expect, test } from '@jest/globals';

import { addSubtractTime } from './add-subtract-time';

describe('addSubtractTime utility function', () => {
	// Test 1: Ensure 'Invalid Date' is returned for non-date object
	test('Should return "Invalid Date" when invalid date is provided', () => {
		expect(addSubtractTime({ date: undefined, value: 1, type: 'year' })).toBe('Invalid Date');
	});

	// Test 2: Check type variants
	test('Should return all the different possible values', () => {
		const result1 = addSubtractTime({ date: '2025-01-01T01:01:01.000Z', value: 1, type: 'year', format: 'ISO' });
		expect(result1).toBe('2026-01-01T01:01:01.000Z');

		const result2 = addSubtractTime({ date: '2025-01-01T01:01:01.000Z', value: 1, type: 'month', format: 'ISO' });
		expect(result2).toBe('2025-01-31T01:01:01.000Z');

		const result3 = addSubtractTime({ date: '2025-01-01T01:01:01.000Z', value: 1, type: 'day', format: 'ISO' });
		expect(result3).toBe('2025-01-02T01:01:01.000Z');

		const result4 = addSubtractTime({ date: '2025-01-01T01:01:01.000Z', value: 1, type: 'hour', format: 'ISO' });
		expect(result4).toBe('2025-01-01T02:01:01.000Z');

		const result5 = addSubtractTime({ date: '2025-01-01T01:01:01.000Z', value: 1, type: 'min', format: 'ISO' });
		expect(result5).toBe('2025-01-01T01:02:01.000Z');

		const result6 = addSubtractTime({ date: '2025-01-01T01:01:01.000Z', value: 1, type: 'sec', format: 'ISO' });
		expect(result6).toBe('2025-01-01T01:01:02.000Z');

		const result7 = addSubtractTime({ date: '2025-01-01T01:01:01.000Z', value: 1, type: 'msec', format: 'ISO' });
		expect(result7).toBe('2025-01-01T01:01:01.001Z');
	});

	// I am not testing the different format types here, because the format is already tested in the format-date-time utility function.
});
