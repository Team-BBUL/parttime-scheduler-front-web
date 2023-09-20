import React, { useState } from "react";

import { ScheduleEmployee, ScheduleTimeLayout } from "../../molecules";
import styles from "./ScheduleContent.module.scss";
import { Warning, WorkingTime } from "../index";
import { ScheduleEmployeeArray } from "../../../pages/api/ScheduleEmployeeArray";
import { getDateArray } from "../../../pages/api/getDayArray";
import { ScheduleTimeDataArray } from "../../../pages/api/ScheduleTimeDataArray";
import { deleteSchedule } from "../../../pages/api/schedule/scheduleAPI";

const ScheduleContent = ({ startDate, endDate, dateArray }) => {
	// const [scheduleData, setScheduleData] = useState([]);
	// const storeId = 1;
	// const yourRoleId = 5;
	// const ver = new Date("2023-09-10 09:30:00.000000");
	// const year = 2023;
	// const month = 9;
	// const apiday = 10;

	const [userList, setUserList] = useState([...ScheduleEmployeeArray]); //api 연결해서 데이터 넣어서 state로 관리.

	const [isDraggingOver, setIsDraggingOver] = useState(false);

	const dragFunction = (event, type) => {
		event.preventDefault();
		event.stopPropagation();
		console.log(type);
	};
	const handleDrop = (event) => {
		event.preventDefault();
		setIsDraggingOver(false);
		event.target.style.background = "#C275FF";
		const droppedData = event.dataTransfer.getData("data");
	};
	const handleDragOver = (event) => {
		event.preventDefault();
		setIsDraggingOver(false);
		event.target.style.backgroundColor = "gray";
		const droppedData = event.dataTransfer.getData("data");
	};
	const handleDragLeave = (event) => {
		event.preventDefault();
		setIsDraggingOver(false);
		event.target.style.backgroundColor = "#EFEFEF";
		const droppedData = event.dataTransfer.getData("data");
	};

	const deleteScheduleClickEvent = (workerId) => {
		if (window.confirm("정말로 스케줄을 삭제하시겠습니까?")) {
			deleteSchedule(workerId).then((response) => console.log(response));
		}
	};



	const convertFormattedDate = (value) => (value < 10 ? `0${value}` : value);
	/* dateArray = 일주일짜리 배열 / 인스턴스 = '2023-08-28', '2023-08-29' ... 
	getDateArray = 	year: currentDate.getFullYear(), / 2023 
					month: currentDate.getMonth() + 1, / 08 ? +1의 존재의 이유
					day: currentDate.getDate() / 28
	*/
	const dayArray = getDateArray(dateArray);

	const fullDayArray = dayArray.map(
		(current) =>
			`${current.year}-${convertFormattedDate(
				current.month
			)}-${convertFormattedDate(current.day)}`
	);
	
	
	/*
	{[...Array(28)].map((_, index) => (
		<option key={index + 1} value={index + 1}>
		{index + 1}일
		</option>
	))} 참고해서 api호출로 받은 store객체 open~closed로 바꾸기 
	*/
	const timeArray = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

	// let sum = 0;
	// ScheduleTimeDataArray.filter(
	// 	(current) => current.day === fullDayArray[3]
	// ).forEach((current) => (sum += current.workers.length));

	const getWorkerColor = (workerId) => {
		const worker = ScheduleEmployeeArray.find((emp) => emp.id === workerId);
		if (worker) {
			return worker.color;
		}
		// 만약 해당 workerId를 가진 worker가 없다면 기본 색상을 반환하도록 설정
		return "#000000"; // 예: 기본 검은색. 원하는 색상으로 변경 가능
	};

	const getWorkerName = (workerId) => {
		const worker = ScheduleEmployeeArray.find((emp) => emp.id === workerId);
		if (worker) {
			return worker.name;
		}
		return "";
	};

	return (
		<div className={styles.schedule__content} style={{ display: "flex" }}>
			<ScheduleTimeLayout timeArray={timeArray} />
			<div style={{ flex: 3 }}>
				<ul className={styles.schedule__day}>
					{dayArray.map((currentDay, dayIndex) => (
						<li key={dayIndex}>
							<p style={{textAlign: 'center'}}>{`${currentDay.day}일`}</p>
							{timeArray.map((currentHour, hourIndex) => {
								//
								const workersForThisTimeSlot = ScheduleTimeDataArray.filter(
									(schedule) =>
										schedule.day ===
											`${currentDay.year}-${convertFormattedDate(
												currentDay.month
											)}-${convertFormattedDate(currentDay.day)}` &&
										schedule.time[hourIndex]
								);

								return (
									<div
										className={styles.schedule__work}
										onDrop={handleDrop}
										onDragOver={handleDragOver}
										onDragEnter={(event) => dragFunction(event, "enter")}
										onDragLeave={handleDragLeave}
										key={hourIndex}
									>
										{workersForThisTimeSlot.map((workerSchedule) =>
											workerSchedule.workers.map((workerId) => (

												// 각 1시간 단위 div태그 
												<div
													key={workerId}
													style={{
														backgroundColor: getWorkerColor(workerId),
														padding: "2px",
														margin: "1px",
														cursor: "pointer",
													}}
													onClick={() => deleteScheduleClickEvent(workerId)}
												>
													{getWorkerName(workerId)} 
												</div>
											))
										)}
									</div>
								);
							})}
						</li>
					))}
				</ul>
			</div>
			<div style={{ flex: 1 }}>
				<div className="sidebar">
					<Warning />
					<WorkingTime />
				</div>
			</div>

			<ScheduleEmployee userList={userList} />
		</div>
	);
};

export { ScheduleContent };
