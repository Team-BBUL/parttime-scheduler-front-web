import React, { useState } from "react";
import "./WorkingTime.css";
import { ScheduleTimeDataArray } from "../../../../pages/api/ScheduleTimeDataArray";
import { ScheduleEmployeeArray } from "../../../../pages/api/ScheduleEmployeeArray";
function WorkingTime() {
	const countTrueValues = (timeArray) => {
		return timeArray.filter((value) => value).length;
	};

	const getTrueCountsByWorkerId = (dataArray) => {
		const counts = {};

		dataArray.forEach((schedule) => {
			const { time, workers } = schedule;

			workers.forEach((workerId) => {
				if (!counts[workerId]) {
					counts[workerId] = 0;
				}
				counts[workerId] += countTrueValues(time);
			});
		});

		return counts;
	};

	const resultCounts = getTrueCountsByWorkerId(ScheduleTimeDataArray);

	// Convert the counts object to a key-value pair array
	const convertCountsToArray = (counts) => {
		return Object.entries(counts).map(([key, value]) => ({
			name: parseInt(key, 10), // converting the key to integer
			time: value,
		}));
	};

	// const resultArray = convertCountsToArray(resultCounts);
	const [workTime, setWorkTime] = useState([
		...convertCountsToArray(resultCounts),
	]);

	const idNameMapping = ScheduleEmployeeArray.reduce((acc, employee) => {
		acc[employee.id] = employee.name;
		return acc;
	}, {});

	// console.log(idNameMapping);

	return (
		<div style={{ marginTop: "20px" }}>
			<div className="table-container">
				<h2>주 근로시간</h2>
				<table>
					<thead>
						<tr>
							<th>Items</th>
							<th>Values</th>
						</tr>
					</thead>
					<tbody>
						{workTime.map((item, index) => (
							<tr key={index}>
								<td>{idNameMapping[item.name]}</td>
								<td>{`${item.time}시간`}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export { WorkingTime };
