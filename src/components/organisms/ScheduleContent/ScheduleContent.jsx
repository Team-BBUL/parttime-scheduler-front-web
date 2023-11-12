import React, { useEffect, useState } from "react";
import axios from 'axios';
import { ScheduleEmployee, ScheduleTimeLayout } from "../../molecules";
import styles from "./ScheduleContent.module.scss";
import {  WorkingTime } from "../index";
// import { ScheduleEmployeeArray } from "../../../pages/api/ScheduleEmployeeArray";
import { getDateArray } from "../../../pages/api/getDayArray";
// import { ScheduleTimeDataArray } from "../../../pages/api/ScheduleTimeDataArray";
// import { deleteSchedule } from "../../../pages/api/schedule/scheduleAPI";
import { SelectableGroup } from "react-selectable-fast";
import Box from "./Box";
import SavedModal from "../../molecules/SavedModal/SavedModal";

const ScheduleContent = ({ startDate, endDate, dateArray, aiMakedSchedule }) => {
	const serverURL = "https://sidam-scheduler.link";
	const [changed, setChanged] = useState(new Date());
	const [userList, setUserList] = useState([]); //api 연결해서 데이터 넣어서 state로 관리.
	
	const [timeStamp, setTimeStamp] = useState(new Date().toISOString().split('.')[0]);
	useEffect(() => {
		const token = localStorage.getItem('jwtToken');
		const axiosConfig = {
			headers: {
			  'Authorization': `${token}`, 
			},
		};
		const storeId = localStorage.getItem('storeId');
		axios.get(`${serverURL}/api/employees/${storeId}`, axiosConfig)
		  .then((response) => {
			const employeesArray = response.data.data;
			// console.log(response.data.data);

			// role이 MANAGER인 애들 제외
			const filteredUserList = employeesArray.filter((employee) => employee.role !== "MANAGER");

			// date 배열을 scheduleList 상태에 저장
			setUserList(filteredUserList);
			console.log(startDate);
		  })
		  .catch((error) => {
			console.error('API 요청 에러:', error);
		  });
	  }, []);
	// console.log(userList);
	const [isDraggingOver, setIsDraggingOver] = useState(false);

	const dragFunction = (event, type) => {
		event.preventDefault();
		event.stopPropagation();
		// console.log(type);
	};
	
	const handleDragOver = (event) => {
		event.preventDefault();
		setIsDraggingOver(false);
		// event.target.style.backgroundColor = "gray";
		const droppedData = event.dataTransfer.getData("data");
	};
	const handleDragLeave = (event) => {
		event.preventDefault();
		setIsDraggingOver(false);
		// event.target.style.backgroundColor = "#EFEFEF";
		const droppedData = event.dataTransfer.getData("data");
	};

	const handleSaveSchedule = (workerId) => {
		if (window.confirm("현재 스케줄을 저장하시겠습니까?")) {
			// deleteSchedule(workerId).then((response) => console.log(response));
		}
	};



	const convertFormattedDate = (value) => (value < 10 ? `0${value}` : value);
	/* dateArray = 일주일짜리 배열 / 인스턴스 = '2023-08-28', '2023-08-29' ... 
	getDateArray = 	year: currentDate.getFullYear(), / 2023 
					month: currentDate.getMonth() + 1, / 08 
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


	//DB에 있는 색상코드 -> css 색상코드 변환
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

	const getWorkerName = (workerId) => {
		const worker = userList.find((emp) => emp.id === workerId);
		if (worker) {
			return worker.alias;
		}
		return "";
	};
	const [currentVersion, setCurrentVersion] = useState();
	const [scheduleList, setScheduleList] = useState([]);
	useEffect(() => {
		setScheduleList([]);
		if(aiMakedSchedule.length!==0){
			console.log("자동편성 완료");
			console.log(aiMakedSchedule);
			setScheduleList(aiMakedSchedule);
		} else {
		const token = localStorage.getItem('jwtToken');
		const axiosConfig = {
			headers: {
			  'Authorization': `${token}`, 
			},
		};
		const year = startDate.getFullYear();
		const month = startDate.getMonth() + 1;
		const day = startDate.getDate();		
		const storeId = localStorage.getItem('storeId');
		const roleId = localStorage.getItem('roleId');
		const version = '2023-06-11T22:03:58';
		setCurrentVersion();

		
			axios.get(`${serverURL}/api/schedule/${storeId}?id=${roleId}&version=${version}&year=${year}&month=${month}&day=${day}`, axiosConfig)
			.then((response) => {
				
				if (response.status_code === 204) {
					console.log("204 found");
					// 상태 코드가 204인 경우 에러를 발생시킴
					throw new Error('No content found');
				}
				
				// 응답에서 date 배열 추출  
				const resScheduleList = response.data.date;
				setCurrentVersion(response.data.time_stamp);
				console.log(currentVersion);
				// console.log(response.data.date);
				// date 배열을 scheduleList 상태에 저장
				setScheduleList(resScheduleList);
				// console.log(scheduleList);
				// console.log(scheduleList.length);
				// console.log(scheduleList);
			})
			.catch((error) => {
				console.error('API 요청 에러:', error);
			});
		}
	  }, [dateArray, aiMakedSchedule]);

	  const [isSelectionMode, setIsSelectionMode] = useState(false);
	  const handleSelecting = (items) => {
		console.log("selecting:", items);
	  };
	  const toggleSelectionMode = () => {
		setIsSelectionMode(!isSelectionMode);
	  };

	  const checkForError = (scheduleList, formattedDate, workerId) => {
		for (const schedule of scheduleList) {
		  if (schedule.day == formattedDate && schedule.workers[0].id == workerId) {
			console.log(schedule.day);
			throw new Error("이미 해당 날짜에 근무중입니다.");
		  }
		}
	  };

	  const handleDrop = (event) => {

		const workerId = JSON.parse(event.dataTransfer.getData('text/plain'));


		const worker = userList.find((emp) => emp.id == workerId);
		const hourIndex = event.currentTarget.getAttribute("id");
		const date = event.currentTarget.parentElement.className;
		// 날짜 문자열을 파싱
		const parts = date.split(' ')[0].split('-');
		const year = parts[0];
		const month = parts[1];
		const day = parts[2];

		// 두 자릿수로 만든 날짜 문자열 생성
		const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;		
		try {
			const newTime = Array(14).fill(false);
			newTime[hourIndex] = true;
			const newSchedule = {
				id: 1, // 새로운 ID로 설정
				day: formattedDate.trim(), 
				time: newTime,
				workers: [{ id: worker.id, alias: worker.alias, color: worker.color, cost: worker.cost }]
			};
			if(scheduleList){
			// 오류 발생 여부 확인
			checkForError(scheduleList, formattedDate, workerId);
			// 여기에서 오류가 발생하지 않았을 때 실행할 코드
			console.log("오류가 발생하지 않았습니다.");			
			// 새로운 scheduleList 생성
			const newScheduleList = [...scheduleList, newSchedule];

			// date 기준으로 정렬
			const sortedScheduleList = newScheduleList.sort((a, b) => {
				const dateA = new Date(a.day);
				const dateB = new Date(b.day);
			
				return dateA - dateB;
			});
			// scheduleList 업데이트
			setScheduleList(sortedScheduleList);
			} else {
				const newScheduleList = [newSchedule];
				setScheduleList(newScheduleList);
			}
			
			
			console.log(scheduleList);
		  } catch (error) {
			// 오류가 발생했을 때 실행할 코드
			console.error(error.message);
		  }
	};	  
	// 
	// useEffect(() => {
	// 	const token = localStorage.getItem('jwtToken');
	// 	const axiosConfig = {
	// 		headers: {
	// 		  'Authorization': `${token}`, 
	// 		},
	// 	};
	// 	const year = startDate.getFullYear();
	// 	const month = startDate.getMonth() + 1;
	// 	const day = startDate.getDate();		
	// 	const storeId = localStorage.getItem('storeId');
	// 	const roleId = localStorage.getItem('roleId');
	// 	const version = '2023-06-11T22:03:58';


		
	// 		axios.get(`/api/schedule/${storeId}?id=${roleId}&version=${version}&year=${year}&month=${month}&day=${day}`, axiosConfig)
	// 		.then((response) => {
				
	// 			if (response.status === 204) {
	// 				// 상태 코드가 204인 경우 에러를 발생시킴
	// 				throw new Error('No content found');
	// 			}
				
	// 			// 응답에서 date 배열 추출  
	// 			const dateArray = response.data.date;
	// 			console.log(response.data.date);
	// 			// date 배열을 scheduleList 상태에 저장
	// 			setScheduleList(dateArray);
	// 			// console.log(scheduleList);
	// 			// console.log(scheduleList.length);
	// 			// console.log(scheduleList);
	// 		})
	// 		.catch((error) => {
	// 			console.error('API 요청 에러:', error);
	// 		});
	//   }, [dateArray]);
	
	const [postData, setPostData] = useState([]);
	useEffect(()=>{
		setTimeStamp(new Date().toISOString().split('.')[0]);
		if(scheduleList){
		const tempSchedule = JSON.parse(JSON.stringify(scheduleList));
		console.log(tempSchedule);
		tempSchedule.map((schedule)=>{
			if(schedule.id){
				delete schedule.id;
			}
			// console.log(schedule.workers[0]);
			const workerId = schedule.workers[0].id;
			if(schedule.workers[0].id){
			delete schedule.workers[0].id;
			}
			// delete schedule.workers[0].alias;
			// delete schedule.workers[0].color;
			// delete schedule.workers[0].cost;
			schedule.workers = [workerId];
		});
		console.log("1111111:   ");
		console.log(tempSchedule);
		console.log(scheduleList);
		setPostData({
			timeStamp: timeStamp,
			data: tempSchedule
		});
		console.log(postData);
	}
	}, [scheduleList, changed]);
	
	// const tempScheduleList = scheduleList.map((schedule)=>{
	// 	const temp = delete schedule.id;
		
	// })
	// const formattedScheduleList = tempSchedule.map((schedule)=>{
		
	// });
	// const postData = {
	// 	timeStamp: timeStamp,
	// 	data: formattedScheduleList
	// };
	const handleDelete=()=>{
		const token = localStorage.getItem('jwtToken');
		const axiosConfig = {
			headers: {
			  'Authorization': `${token}`, 
			},
		};
		const year = startDate.getFullYear();
		const month = startDate.getMonth() + 1;
		const day = startDate.getDate();		
		const roleId = localStorage.getItem('roleId');
		const storeId = localStorage.getItem('storeId');
		
			try{
				axios.delete(`/api/schedule/${storeId}?id=${roleId}&version=${currentVersion}&year=${year}&month=${month}&day=${day}`, axiosConfig)
				.then((response) =>{
					console.log("삭제성공");
					setScheduleList([]);
				});
			} catch (error){
				console.error('API 요청 에러:', error);
			}
	};
	
	const handleSave=()=>{
		const token = localStorage.getItem('jwtToken');
		const axiosConfig = {
			headers: {
			  'Authorization': `${token}`, 
			},
		};
		const year = startDate.getFullYear();
		const month = startDate.getMonth() + 1;
		const day = startDate.getDate();		
		const roleId = localStorage.getItem('roleId');
		const storeId = localStorage.getItem('storeId');
		if(currentVersion){
			try{
				axios.delete(`${serverURL}/api/schedule/${storeId}?id=${roleId}&version=${currentVersion}&year=${year}&month=${month}&day=${day}`, axiosConfig)
				.then((response) =>{
					console.log("삭제성공");
					axios.post(`${serverURL}/api/schedule/${storeId}`, postData, axiosConfig)
					.then((response) => {
						console.log("등록성공");
						openModal();
					});
				});
			} catch (error){
				console.error('API 요청 에러:', error);
			}
		} else {
			try{
				axios.post(`${serverURL}/api/schedule/${storeId}`, postData, axiosConfig)
				.then((response) => {
					console.log("등록성공");
					openModal();
				});
			} catch (error){
				console.error('API 요청 에러:', error);
			}
		}
	};
	const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
	useEffect(() => {
		if (showModal) {
		  openModal();
		}
	  }, [showModal]);
	const isMobile = window.innerWidth < 1920;
	useEffect(() => {
		if (isMobile) {
			document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=1080, height=2480, initial-scale=0.35, maximum-scale=0.35, user-scalable=no');
		  }
		}, []);
	return (
		<div>
		<div className={styles.schedule__content} style={{ display: "flex" }}>
			<ScheduleTimeLayout timeArray={timeArray} />
			<div style={{ flex: 3 }}>
				<ul className={styles.schedule__day}>
					{dayArray.map((currentDay, dayIndex) => (
						<li 
							key={dayIndex}
							// style={{display: 'flex'}}
						>
							<div></div>
							<p style={{textAlign: 'center'}}>{`${currentDay.day}일`}</p>
							<div className="scheduleList" style={{display: 'flex'}}>

							
							<SelectableGroup 
								className={`${currentDay.year}-${currentDay.month}-${currentDay.day}`}
								clickClassName="tick"
								enableDeselect
								tolerance={0}
								globalMouse={false}
								allowClickWithoutSelected={false}
								style={{width: '100%'}}
								onSelectionFinish={(items)=>{
									// console.log(items);
									
									
									const date =`${currentDay.year}-${currentDay.month}-${currentDay.day}`;
									const parts = date.split('-');
									const year = parts[0];
									const month = parts[1];
									const day = parts[2];
									
									// 두 자릿수로 만든 날짜 문자열 생성
									const tempDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;									
									const formattedDate = tempDate.trim();
									scheduleList.map((schedule)=>{
										if(schedule.day === formattedDate){
											schedule.time.fill(false);
											// console.log(schedule);
										}
									})
									items.map((item)=>{
										const workerId = item.props.id;
										// console.log(item._reactInternals.key-workerId*20);
										const hourIndex = item._reactInternals.key-workerId*20;
										const foundScheduleIdx = scheduleList.findIndex((schedule) => schedule.day === formattedDate  && schedule.workers[0].id === workerId);
										if(foundScheduleIdx !== -1){
											scheduleList[foundScheduleIdx].time[hourIndex] = true;
										}
										const allFalse = scheduleList[foundScheduleIdx].time.every(timeValue => timeValue === false);
										console.log("allFalse : ", allFalse);
										if(allFalse){
											scheduleList.splice(foundScheduleIdx, 1);
										}
										setScheduleList(scheduleList.filter(schedule => !schedule.time.every(timeValue => timeValue === false)));
										console.log("foundScheduleIdx : ",foundScheduleIdx);
										console.log("scheduleList[foundScheduleIdx] : ",scheduleList[foundScheduleIdx]);
										// console.log(hourIndex);
									})	
									setChanged(new Date());
									setTimeStamp(new Date().toISOString().split('.')[0]);

								}}
							>
							{timeArray.map((currentHour, hourIndex) => {
								let workersForThisTimeSlot = []; 
								if(scheduleList){
									
									workersForThisTimeSlot = scheduleList.filter(
										(schedule) =>
											schedule.day ===
												`${currentDay.year}-${convertFormattedDate(
													currentDay.month
												)}-${convertFormattedDate(currentDay.day)}`
									);
								}
								return (
									<div
										className={styles.schedule__work}
										onDrop={handleDrop}
										onDragOver={handleDragOver}
										onDragEnter={(event) => dragFunction(event, "enter")}
										onDragLeave={handleDragLeave}
										id={hourIndex}
										key={hourIndex}
										// style={!workersForThisTimeSlot.length ? { width: '90px' } : { width: '100%' }}
									>
										{workersForThisTimeSlot.map((workerSchedule) =>{
											const worker = workerSchedule.workers[0];
											if(worker){
												if(workerSchedule.time[hourIndex]){
													return (
														<Box 
														padding={2}
														margin={1}
														cursor={"pointer"}
														borderRadius={5}
														backgroundColor={getWorkerColor(worker.id)}
														background={"#EFEFEF"}
														isSelected={true}
														id={worker.id}
														key={worker.id*20+hourIndex}
														
													>
														 {getWorkerName(worker.id)} 
														</Box>
														// // 각 1시간 단위 div태그 
														// <div
														// 	key={worker.id}
														// 	style={{
														// 		backgroundColor: getWorkerColor(worker.id),
														// 		padding: "2px",
														// 		margin: "1px",
														// 		cursor: "pointer",
														// 		borderRadius: '5px',
														// 	}}
														// 	onClick={() => deleteScheduleClickEvent(worker.id)}
														// >
														// 	{getWorkerName(worker.id)} 
														// </div>													
													)
												} else {
													return(
													<Box 
													padding={2}
													margin={1}
													cursor={"pointer"}
													borderRadius={5}
													backgroundColor={getWorkerColor(worker.id)}
													background={"#EFEFEF"}
													isSelected={false}
													isSelecting={false}
													id={worker.id}
													key={worker.id*20+hourIndex}
													>
													 {getWorkerName(worker.id)} 
													</Box>
													)													
												}

											}
										}
										)}
									</div>
								);
							})}
							</SelectableGroup>
							</div>
						</li>
					))}
					
				</ul>
			</div>
			{isMobile ?  null : (
            // Render the WorkingTime component only if not on a mobile device
			<div style={{ flex: 1 }}>
				<div className="sidebar">
					{/* <Warning /> */}
					<WorkingTime userList={userList} scheduleList={scheduleList} timeStamp={timeStamp}/>

				</div>
			</div>
          	)}


		</div>
		<div style={{ display: "flex", textAlign: 'center' }}>
			<div
				style={{width: '40px', backgroundColor: 'white'}}
			></div>
			<ScheduleEmployee userList={userList}  />
			<button className="delete-button" style={{flex: 1, fontsize: '20medium', margin: '20px', justifyContent: 'center', backgroundColor: 'gray'}} onClick={handleDelete}>
			삭제
			</button>			
			<button className="save-button" style={{flex: 1, fontsize: '20medium', margin: '20px', justifyContent: 'center'}} onClick={handleSave}>
      		저장
    		</button>
		</div>
		{showModal &&(			
			<SavedModal
				closeModal={closeModal}
				headerTitle={<div>
					저장이 완료되었습니다.
				</div>}

			>
			</SavedModal>
			)
		}

		</div>
	);
};

export { ScheduleContent };
