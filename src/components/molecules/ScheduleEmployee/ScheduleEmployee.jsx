import React, { useState } from "react";
import { Label } from "../../atoms";
import styles from "./ScheduleEmployee.module.scss";

const ScheduleEmployee = ({ userList, flex }) => {
	const getWorkerColor = (workerId) => {
		const worker = userList.find((emp) => emp.id === workerId);
		if (worker) {
			// 0xFFFFFFFF 형식의 16진수 색상 코드에서 각 부분 추출
			const alpha = (worker.color >> 24) & 0xFF;
			const red = (worker.color >> 16) & 0xFF;
			const green = (worker.color >> 8) & 0xFF;
			const blue = worker.color & 0xFF;
			
			// 추출한 부분을 CSS 형식으로 조합
			const cssColor = `rgba(${red}, ${green}, ${blue}, ${(alpha / 255).toFixed(2)})`;
			return cssColor;
		}
		// 만약 해당 workerId를 가진 worker가 없다면 기본 색상을 반환하도록 설정
		return "#000000"; // 예: 기본 검은색. 원하는 색상으로 변경 가능
	};
	const handleDragStart = (event) =>{
		const data = event.target.getAttribute("class");
		event.dataTransfer.setData('text/plain', JSON.stringify(data));
	  }
	return (
		<div className={styles.schedule__employee}>
			{userList.map((current, index) => (
				<div
					key={index}
					className={current.id}
					draggable="true"
					onDragStart={handleDragStart}
					style={{ backgroundColor: getWorkerColor(current.id)}}
				>
					<Label text={current.alias} />
					<Label text={`lv.${current.level}` }/>
				</div>
			))}
		</div>
	);
};

export { ScheduleEmployee };
