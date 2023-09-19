import React, { useState } from "react";
import { Button, Label } from "../../atoms";
import styles from "./ScheduleHeader.module.scss";

const ScheduleHeader = ({ startDate, endDate, changeDateFromCurrentDate }) => {
	const beforeSevenDaysFromCurrentDate = () => {
		changeDateFromCurrentDate(-7);
	};

	const afterSevenDaysFromCurrentDate = () => {
		changeDateFromCurrentDate(7);
	};

	return (
		<div className={styles.schedule__header}>
			<Button img={"ARROWLEFT"} onClickEvent={beforeSevenDaysFromCurrentDate} />
			<Label
				text={`${startDate?.getMonth() + 1}월 ${startDate?.getDate()}일 ~ ${
					endDate?.getMonth() + 1
				}월 ${endDate?.getDate()}일`}
			/>
			<Button img={"ARROWRIGHT"} onClickEvent={afterSevenDaysFromCurrentDate} />

			<Button img={"WRITE"} />
		</div>
	);
};

export { ScheduleHeader };
