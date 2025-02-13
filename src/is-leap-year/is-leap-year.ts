/**
 * @function
 * @description - Check if the given year is a leap year.
 * @param year - The year to check; type: number | string; optional
 * @returns { boolean } True if the year is leap year, otherwise false; type: boolean
 */
export const isLeapYear = (year?: number | string): boolean => {
	const value = Number(typeof year === 'undefined' ? new Date().getFullYear() : year);
	if (isNaN(value) || value < 0) return false;
	return (value % 4 === 0 && value % 100 !== 0) || value % 400 === 0;
};
