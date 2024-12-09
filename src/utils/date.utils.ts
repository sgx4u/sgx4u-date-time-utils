import { DateGetterMethodOptionsType, DateGetterMethodType } from '../format-date-time/format-date-time.types';

export const getValueFromDate = ({
	date,
	method,
	useUTC,
}: {
	date: Date;
	method: DateGetterMethodOptionsType;
	useUTC?: boolean;
}): number => {
	const localOrUtc: DateGetterMethodType = useUTC ? `getUTC${method}` : `get${method}`;
	return date[localOrUtc]() as number;
};
