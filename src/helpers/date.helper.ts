import { sub, format } from "date-fns";

export const lastWeekDate = () => {
	const today = new Date();
	const lastWeek = sub(today, {
		days: 7,
	});

	return format(lastWeek, "yyyy-MM-dd");
};

export const timeConvert = (n: number) => {
	const num = n;
	const hours = num / 60;
	const rhours = Math.floor(hours);
	const minutes = (hours - rhours) * 60;
	const rminutes = Math.round(minutes);

	return `${rhours ? `${rhours}h ` : ""} ${rminutes}m`;
};
