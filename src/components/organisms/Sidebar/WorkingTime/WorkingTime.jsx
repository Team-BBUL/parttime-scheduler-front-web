import React, { useEffect, useState } from "react";
import "./WorkingTime.css";
import { ScheduleTimeDataArray } from "../../../../pages/api/ScheduleTimeDataArray";
import { ScheduleEmployeeArray } from "../../../../pages/api/ScheduleEmployeeArray";

const WorkingTime = ({ userList, scheduleList, timeStamp }) => {
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





	const countTrueValues = (timeArray) => {
		return timeArray.filter((value) => value).length;
	};

	const getTrueCountsByWorkerId = (dataArray) => {
		const counts = {};
		if(dataArray){
			dataArray.forEach((schedule) => {
				const { time, workers } = schedule;

				workers.forEach((worker) => {
					if (!counts[worker.id]) {
						counts[worker.id] = 0;
					}
					counts[worker.id] += countTrueValues(time);
				});
				
			});
		}
		
		return counts;
	};

	const resultCounts = getTrueCountsByWorkerId(scheduleList);
	// console.log(resultCounts);
	
	// Convert the counts object to a key-value pair array
	const convertCountsToArray = (counts) => {
		return Object.entries(counts).map(([key, value]) => ({
			name: parseInt(key, 10), // converting the key to integer
			time: value,
		}));
	};
	// Convert the counts object to a key-value pair array
	const countsArray = convertCountsToArray(resultCounts);

	// Create a map of worker IDs that are present in the counts array
	const workerIdsInCounts = countsArray.map((item) => item.name);

	// Iterate through userList and add any missing workers with 0 hours
	userList.forEach((worker) => {
	if (!workerIdsInCounts.includes(worker.id)) {
		countsArray.push({
		name: worker.id,
		time: 0,
		});
	}
	});
	// Sort the countsArray by time in descending order
	countsArray.sort((a, b) => b.time - a.time);

	// // const resultArray = convertCountsToArray(resultCounts);
	// const [workTime, setWorkTime] = useState([
	// 	convertCountsToArray(resultCounts),
	// ]);
	// console.log(resultCounts);
	// console.log(workTime);

	const idNameMapping = userList.reduce((acc, employee) => {
		acc[employee.id] = employee.alias;
		return acc;
	}, {});

	// console.log(idNameMapping);
	useEffect(() => {
		const resultCounts = getTrueCountsByWorkerId(scheduleList);
		const countsArray = convertCountsToArray(resultCounts);
		const workerIdsInCounts = countsArray.map((item) => item.name);
		userList.forEach((worker) => {
			if (!workerIdsInCounts.includes(worker.id)) {
				countsArray.push({
				name: worker.id,
				time: 0,
				});
			}
			});
			// Sort the countsArray by time in descending order
			countsArray.sort((a, b) => b.time - a.time);
	  }, [timeStamp]);

	return (
		<div style={{ marginTop: "20px" }}>
			<div className="table-container">
				<h2>주 근로시간</h2>
				<table>
					<thead>
						<tr>
							<th>근무자</th>
							<th>근로 시간</th>
						</tr>
					</thead>
					<tbody>
					{countsArray.map((item, index) => (
						<tr key={index} >
						<td >{idNameMapping[item.name]}</td>
						<td style={{ color: item.time > 15 ? 'red' : (item.time < 15 ? 'blue' : 'green') }}><b>{`${item.time}시간`}</b></td>
						</tr>
					))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export { WorkingTime };
