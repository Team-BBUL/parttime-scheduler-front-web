import React, { useState } from "react";
import "./WorkingTime.css";
import { ScheduleTimeDataArray } from "../../../../pages/api/ScheduleTimeDataArray";
import { ScheduleEmployeeArray } from "../../../../pages/api/ScheduleEmployeeArray";

const WorkingTime = ({ userList, scheduleList }) => {
	const countTrueValues = (timeArray) => {
		return timeArray.filter((value) => value).length;
	};

	const getTrueCountsByWorkerId = (dataArray) => {
		const counts = {};

		dataArray.forEach((schedule) => {
			const { time, workers } = schedule;

			workers.forEach((worker) => {
				if (!counts[worker.id]) {
					counts[worker.id] = 0;
				}
				counts[worker.id] += countTrueValues(time);
			});
		});

		return counts;
	};

	const resultCounts = getTrueCountsByWorkerId(scheduleList);
	console.log(resultCounts);
	
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

	console.log(idNameMapping);

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
					{countsArray.map((item, index) => (
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
