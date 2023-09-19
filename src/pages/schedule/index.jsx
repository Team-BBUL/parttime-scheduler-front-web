import React, { useEffect, useState } from "react";
import { ScheduleHeader, ScheduleTimeLayout } from "../../components/molecules";
import {
	ScheduleContent,
	Warning,
	WorkingTime,
} from "../../components/organisms";
import { getMondayOfTheWeek } from "../api/getDayArray";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SchedulePage = () => {
	const navigate = useNavigate();
	useEffect(() => {
		const token = localStorage.getItem('jwtToken');
		if (!token) {
		  navigate('/login');
		}
	  }, []);

	const [roleForm] = useState({
		role: 'MANAGER'
	});
  useEffect(() => {
	const token = localStorage.getItem('jwtToken');
	const axiosConfig = {
		headers: {
		  'Authorization': `${token}`, // 토큰을 헤더파일에 추가
		},
	  };
	  
    // API 요청 보내기
    axios.get('/store/my-list?role=MANAGER',  axiosConfig)
      .then((response) => {

		if(response.data.data){
			console.log('Store 존재');
		} else{
			navigate('/registStore'); // 이동할 페이지 경로 설정
		}

      })
      .catch((error) => {
        console.error('API 요청 실패:', error);
        // 에러 처리 로직 추가
      });
  }, [navigate]);



	const [date, setDate] = useState(new Date("2023-08-28"));
	const [startDate, setStartDate] = useState(new Date(date));
	const [dateArray, setDateArray] = useState([]);
	const [endDate, setEndDate] = useState(dateArray[dateArray.length - 1]);

	useEffect(() => {
		setStartDate(new Date(date));

		const newArray = Array(7)
			.fill(null)
			.map((_, idx) => {
				const newDate = new Date(date);
				newDate.setDate(date.getDate() + idx);
				return newDate;
			});

		setDateArray(newArray);
		setEndDate(newArray[newArray.length - 1]);
	}, [date]);
	
	const changeDateFromCurrentDate = (changeDay) => {
		const newDate = new Date(date);
		newDate.setDate(newDate.getDate() + changeDay);
		setDate(newDate);
	};

	return (
		<section className="schedule">
			<ScheduleHeader
				startDate={startDate}
				endDate={endDate}
				changeDateFromCurrentDate={changeDateFromCurrentDate}
			/>
			<div className="schedule__divide__line"></div>

			<ScheduleContent
				startDate={startDate}
				endDate={endDate}
				dateArray={dateArray}
			/>
		</section>
	);
};

export default SchedulePage;
