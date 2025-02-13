# @sgx4u/date-time-utils - Changelog

## 2.3.0

### Minor Release

-   Added function - `getNextOccurrence`
-   Bug fix in isValidDate where it should stop further checks when valid date is already confirmed

## 2.2.1

### Documentation

-   Updated documentation

## 2.2.0

### Minor Release

-   Added function - `isValidDate`, `isLeapYear`

## 2.1.1

### Bug Fix

-   Bug fix in dateTimeDifference where formats "full" and "full-short-unit" were showing extra spaces

## 2.1.0

### Minor Release

-   Added function - `dateTimeDifference`, `indexToDay`, `indexToMonth`, `addSubtractTime`
-   Added features - `formatDateTime`. New format types: 'UTC', 'ISO', 'dateString', 'timeString', 'locale', 'localeDate', 'localeTime'
-   Optimized function - `formatDateTime`. Performance optimizations
-   Updated documentation

## 2.0.0

### Major Release

-   Modified function - `formatDateTime`. Removed `paddedValues` prop. For values without leading 0 new formats are added: h, H, m, s, S, SS, d, m

## 1.0.0

### First Release

-   Release v1.0.0
-   Added function - `formatDateTime` - Format a date
