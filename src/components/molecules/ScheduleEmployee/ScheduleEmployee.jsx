import React, { useState } from "react";
import { Label } from "../../atoms";
import styles from "./ScheduleEmployee.module.scss";

const ScheduleEmployee = ({ userList }) => {
	return (
		<div className={styles.schedule__employee}>
			{userList.map((current, index) => (
				<div
					key={index}
					className={current.id}
					draggable="true"
					style={{ backgroundColor: current.color }}
				>
					<Label text={current.name} />
					{/* <Label text={`${current.totalTime}시간`} /> */}
				</div>
			))}
		</div>
	);
};

export { ScheduleEmployee };
