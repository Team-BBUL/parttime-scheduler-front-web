import React, { useEffect, useState } from "react";
import { ScheduleHeader } from "../../components/molecules";
import {
	ScheduleContent,

} from "../../components/organisms";
import { getMondayOfTheWeek } from "../api/getDayArray";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AIMakedModal from "../../components/molecules/AIMakedModal/AIMakedModal";
// import LoadingModal from '../../components/molecules/LoadingModal/LoadingModal'

const SchedulePage = () => {
	const serverURL = "https://sidam-scheduler.link";
	const navigate = useNavigate();

	// JWT토큰이 발행된 것이 없다면 로그인 페이지로 이동 
	useEffect(() => {
		const token = localStorage.getItem('jwtToken');
		if (!token) {
		  navigate('/login');
		}
	  });
	
	// 헤더파일에 토큰 추가
	const token = localStorage.getItem('jwtToken');
	const axiosConfig = {
		headers: {
		'Authorization': `${token}`,
		},
	};

	// 매장이 등록되어 있는 것이 없으면 매장등록으로 이동 
  	useEffect(() => {
		// API 요청 보내기
		axios.get(`${serverURL}/store/my-list?role=MANAGER`,  axiosConfig)
		.then((response) => {

			if(!response.data.data){
				navigate('/registstore'); // 이동할 페이지 경로 설정
			}
		})
		.catch((error) => {
        console.error('my-list API 요청 실패:', error);
        // 에러 처리 로직 추가
      });
  	}, [navigate]);




	
	// const [date, setDate] = useState(new Date("2023-09-18"));
	const testDate = new Date();
	testDate.setDate(testDate.getDate()-7);
	// const [date, setDate] = useState(getMondayOfTheWeek(testDate));
	const [date, setDate] = useState(getMondayOfTheWeek(new Date()));
	// console.log(testDate);
	const [startDate, setStartDate] = useState(new Date(date));

	const [dateArray, setDateArray] = useState([]);
	const [endDate, setEndDate] = useState(dateArray[dateArray.length - 1]);

	useEffect(() => {
		setStartDate(new Date(date));
		setAiMake(false);
		setAiScheduleList([]);
		const newArray = Array(7)
			.fill(null)
			.map((_, idx) => {
				const newDate = new Date(date);
				newDate.setDate(date.getDate() + idx);
				return newDate;
			});

		setDateArray(newArray);
		setEndDate(newArray[newArray.length - 1]);
		// console.log(newArray);
		setAiMake(false);
		setAiScheduleList([]);
	}, [date]);
	
	const changeDateFromCurrentDate = (changeDay) => {
		// setAiMake(false);
		// setAiScheduleList([]);
		const newDate = new Date(date);
		newDate.setDate(newDate.getDate() + changeDay);
		setDate(newDate);
		// setAiMake(false);
		// setAiScheduleList([]);
	};

	const changeDate = (changeDay) => {
		const newDate = new Date(startDate);
		newDate.setDate(newDate.getDate() + changeDay);
		return newDate;
	};
	function addDays(date, days) {
		const result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	  }
	const [aiMake, setAiMake] = useState(false);
	const [aiScheduleList, setAiScheduleList] = useState([]);
	useEffect(()=>{
		if(aiMake){
			const token = localStorage.getItem('jwtToken');
			const axiosConfig = {
				headers: {
				'Authorization': `${token}`, 
				},
			};
			//s
			const year = startDate.getFullYear();
			const month = startDate.getMonth() + 1;
			const day = startDate.getDate();		
			const storeId = localStorage.getItem('storeId');
			axios.get(`${serverURL}/api/schedule/make/${storeId}?year=${year}&month=${month}&day=${day}`, axiosConfig)
			.then((response) => {
				// 응답에서 date 배열 추출  
				const dateArray = response.data.date;
				console.log(response.data.date);
				// date 배열을 scheduleList 상태에 저장
				dateArray.map((schedule)=>{
					const tempDate = new Date(schedule.day);
					const newDate = addDays(tempDate, 7);
					const formDay = newDate.toISOString().split('T')[0];
					console.log(formDay);
					schedule.day=formDay;
				})
				setAiScheduleList(dateArray);
				openModal();
			})
			.catch((error) => {
				openFailedModal();
				console.error('API 요청 에러:', error);
			});
		}
	}, [aiMake]);
	const [isLoading, setLoading] = useState(false);
	const handleAiMake= () =>{
		setAiMake(true);
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		  }, 500); // 0.5초 후에 로딩 상태를 false로 변경
		setAiScheduleList([]);

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
	  const [showFailedModal, setShowFailedModal] = useState(false);
	  const openFailedModal = () => {
		  setShowFailedModal(true);
	  };
  
	  const closeFailedModal = () => {
		  setShowFailedModal(false);
	  };
	  useEffect(() => {
		  if (showFailedModal) {
			openFailedModal();
		  }
		}, [showFailedModal]);
	return (
		<section className="schedule">
			<ScheduleHeader
				startDate={startDate}
				endDate={endDate}
				changeDateFromCurrentDate={changeDateFromCurrentDate}
				handleAiMake={handleAiMake}
			/>
			<div className="schedule__divide__line"></div>
			{showModal &&(			
			<AIMakedModal
				closeModal={closeModal}
				headerTitle={<div>
					자동편성이 완료되었습니다.
				</div>}

			>
			</AIMakedModal>)

			}
			{showFailedModal &&(			
			<AIMakedModal
				closeModal={closeFailedModal}
				headerTitle={
					<div>
					<div>
					자동편성을 실패했습니다.
					</div>
					<div>
					지난 주차의 스케줄이 존재하는지 확인해주세요.
					</div>
					</div>
				}
			>
			</AIMakedModal>)
			}

			<ScheduleContent
				startDate={startDate}
				endDate={endDate}
				dateArray={dateArray}
				aiMakedSchedule={aiScheduleList}
			/>
		</section>
	);
};

export default SchedulePage;
