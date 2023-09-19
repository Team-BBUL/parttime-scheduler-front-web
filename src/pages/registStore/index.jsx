import React, { useState } from 'react';
import axios from 'axios';
import "./index.css";
// import { useNavigate } from 'react-router-dom';

const RegistStorePage = () => {
	const [storeForm, setStoreForm] = useState({
		name: '',
		location: '',
		phone: '',
		open: 0,
		closed: 0,
		payday: 0,
		startDayOfWeek: 1,
		deadlineOfSubmit: 0,
	});
	//지역번호
	const [phoneForm, setPhoneForm] = useState({
		areaCode: '02',
		phoneMiddle: '',
		phoneLast: ''
	})
	
	const handlePhoneFormChange = async (e) => {
		const { name, value } = e.target;
		// 입력값이 숫자인지 확인
		if (!isNaN(value)) {
			setPhoneForm({
			...phoneForm,
			[name]: value,
			});
			// setPhoneError(''); // 숫자 입력이므로 에러 메시지 초기화
		}
		const phoneAdded = phoneForm.areaCode + '-' + phoneForm.phoneMiddle + '-' + phoneForm.phoneLast;
		console.log(phoneAdded);
		console.log(storeForm.phone);
		setStoreForm({
			...storeForm,
			phone: phoneAdded,
		});
	};	
	const handleKeyUp = (e) =>{
		
		const phoneAdded = phoneForm.areaCode + '-' + phoneForm.phoneMiddle + '-' + phoneForm.phoneLast;	
		console.log(phoneAdded);
		setStoreForm({
			...storeForm,
			phone: phoneAdded,
		});
		console.log(phoneForm.phone);
	}

	// 입력 폼의 변경 핸들러
	const handleChange = async (e) => {
	const { name, value } = e.target;
	const phoneAdded = phoneForm.areaCode + '-' + phoneForm.phoneMiddle + '-' + phoneForm.phoneLast;
	console.log(phoneAdded);
	setStoreForm({
		...storeForm,
		phone: phoneAdded,
	});
	console.log(phoneForm.phone);
	setStoreForm({
		...storeForm,
		[name]: value,
	});

	
	};



	//매장등록폼데이터 제출 핸들러 및 
	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem('jwtToken');
		const axiosConfig = {
			headers: {
			  'Authorization': `${token}`, // 토큰을 헤더파일에 추가
			},
		  };
		  
		try {
		  const response = await axios.post('/store/regist', storeForm, axiosConfig);
		  console.log('매장등록 성공:', response.data);
		  window.location.href = '/schedule';
		} catch (error) {
		  console.error('매장 등록 실패:', error);
		  }
	  };
	  
	return (
		<div className="App">
		<div className="register-container">
		  <h2 style={{textAlign:"center", width: "300px"}}>매장 등록</h2>

		  <form onSubmit={handleSubmit}>
			<div className="form-group">
			{/* <label htmlFor="name">매장명</label> */}
			<input
				type="text"
				id="name"
				name="name"
				placeholder='매장명'
				value={storeForm.name}
				onChange={handleChange}
			/>
			</div>
			<div className="form-group">
			{/* <label htmlFor="location">매장 위치</label> */}
			<input
				type="text"
				id="location"
				name="location"
				placeholder='매장 위치'
				value={storeForm.location}
				onChange={handleChange}
			/>
			</div>
			<div className="form-group">
			<label htmlFor="phone">매장 전화번호</label>
			<div className="phone-input">
			<select
				id="areaCode"
				name="areaCode"
				value={phoneForm.areaCode}
				onChange={handlePhoneFormChange}
				style={{margin: '10px', padding: '3px'}}
			>
				<option value="02">02</option>
				<option value="031">031</option>
				<option value="032">032</option>
				<option value="033">033</option>
				<option value="041">041</option>
				<option value="042">042</option>
				<option value="043">043</option>
				<option value="044">044</option>
				<option value="051">051</option>
				<option value="052">052</option>
				<option value="053">053</option>
				<option value="054">054</option>
				<option value="055">055</option>
				<option value="061">061</option>
				<option value="062">062</option>
				<option value="063">063</option>
				<option value="064">064</option>
			</select>
			<span style={{padding: '10px'}}>-</span>
			<input
			type="text"
			id="phoneMiddle"
			name="phoneMiddle"
			value={phoneForm.phoneMiddle}
			onChange={handlePhoneFormChange}
			style={{width: '20%'}}
			/>
			<span style={{padding: '10px'}}>-</span>
			<input
			type="text"
			id="phoneLast"
			name="phoneLast"
			value={phoneForm.phoneLast}
			onChange={handlePhoneFormChange}
			style={{width: '20%'}}
			onKeyUp={handleKeyUp}
			/>
			</div>
			</div>
			<div className="form-group">
			<label htmlFor="open">매장 운영시간</label>
			<select
				id="open"
				name="open"
				value={storeForm.open}
				onChange={handleChange}
				style={{margin: '10px', padding: '3px'}}
			>
				<option value={0}>00:00</option>
				<option value={1}>01:00</option>
				<option value={2}>02:00</option>
				<option value={3}>03:00</option>
				<option value={4}>04:00</option>
				<option value={5}>05:00</option>
				<option value={6}>06:00</option>
				<option value={7}>07:00</option>
				<option value={8}>08:00</option>
				<option value={9}>09:00</option>
				<option value={10}>10:00</option>
				<option value={11}>11:00</option>
				<option value={12}>12:00</option>
				<option value={13}>13:00</option>
				<option value={14}>14:00</option>
				<option value={15}>15:00</option>
				<option value={16}>16:00</option>
				<option value={17}>17:00</option>
				<option value={18}>18:00</option>
				<option value={19}>19:00</option>
				<option value={20}>20:00</option>
				<option value={21}>21:00</option>
				<option value={22}>22:00</option>
				<option value={23}>23:00</option>
			</select>
			<span style={{padding: '10px'}}>~</span>
			<select
				id="closed"
				name="closed"
				value={storeForm.closed}
				onChange={handleChange}
				style={{margin: '10px', padding: '3px'}}
			>
				<option value={0}>00:00</option>
				<option value={1}>01:00</option>
				<option value={2}>02:00</option>
				<option value={3}>03:00</option>
				<option value={4}>04:00</option>
				<option value={5}>05:00</option>
				<option value={6}>06:00</option>
				<option value={7}>07:00</option>
				<option value={8}>08:00</option>
				<option value={9}>09:00</option>
				<option value={10}>10:00</option>
				<option value={11}>11:00</option>
				<option value={12}>12:00</option>
				<option value={13}>13:00</option>
				<option value={14}>14:00</option>
				<option value={15}>15:00</option>
				<option value={16}>16:00</option>
				<option value={17}>17:00</option>
				<option value={18}>18:00</option>
				<option value={19}>19:00</option>
				<option value={20}>20:00</option>
				<option value={21}>21:00</option>
				<option value={22}>22:00</option>
				<option value={23}>23:00</option>
			</select>
			</div>
			<div className="form-group">
			<label htmlFor="payday">급여일</label>
			<select
				id="payday"
				name="payday"
				value={storeForm.payday}
				onChange={handleChange}
				style={{margin: '10px', padding: '3px'}}
			>
				{[...Array(28)].map((_, index) => (
					<option key={index + 1} value={index + 1}>
					{index + 1}일
					</option>
				))}
			</select>
			</div>
			<div className="form-group">
			<label htmlFor="startDayOfWeek">주간 근무표 시작 요일</label>
			<select
				id="startDayOfWeek"
				name="startDayOfWeek"
				value={parseInt(storeForm.startDayOfWeek)}
				onChange={handleChange}
				style={{margin: '10px', padding: '3px'}}
			>
				<option value={1}>월요일</option>
				<option value={2}>화요일</option>
				<option value={3}>수요일</option>
				<option value={4}>목요일</option>
				<option value={5}>금요일</option>
				<option value={6}>토요일</option>
				<option value={7}>일요일</option>
			</select>
			</div>
			<div className="form-group">
			<label htmlFor="deadlineOfSubmit">근무 불가능 시간 선택 마감일</label>
			<span style={{fontsize: '10px'}}>근무 시작일 - n일전 마감</span>
			<input
				type="number"
				id="deadlineOfSubmit"
				name="deadlineOfSubmit"
				value={storeForm.deadlineOfSubmit}
				onChange={handleChange}
			/>
			</div>
			<div style={{textAlign:"center"}}>
			<button type="submit" style={{color: 'white'}}>매장 등록</button></div>
		  </form>

		</div>
	  </div>
	);
};
export default RegistStorePage;
