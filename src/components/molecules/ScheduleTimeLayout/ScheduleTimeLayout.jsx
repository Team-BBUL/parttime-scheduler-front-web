import React from "react";
import styles from "./ScheduleTimeLayout.module.scss";

const ScheduleTimeLayout = ({ timeArray }) => {
	// const timeArray = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

	return (
		<ul className={styles.schedule__time}>
			{timeArray.map((current) => (
				<li key={current}>{`${current}:00`}</li>
			))}
		</ul>
	);
};

export { ScheduleTimeLayout };
