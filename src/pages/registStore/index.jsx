import React, { useState } from 'react';
import axios from 'axios';
import "./index.css";
// import { useNavigate } from 'react-router-dom';

const RegistStorePage = () => {
	const [storeFormData, setStoreFormData] = useState({
		name: '',
		location: '',
		phone: '',
		open: 0,
		closed: 0,
		payday: 0,
		startDayOfWeek: 1,
		deadlineOfSubmit: '',
	});
	//지역번호 + 중간번호 +마지막번호
	const [phoneFormData, setPhoneFormData] = useState({
		areaCode: '02',
		phoneMiddle: '',
		phoneLast: ''
	})

	// 전화번호 저장 핸들러
	const handlePhoneFormChange = async (e) => {
		const { name, value } = e.target;
		// 입력값이 숫자인지 확인
		if (!isNaN(value)) {
			setPhoneFormData({
			...phoneFormData,
			[name]: value,
			});
			// setPhoneError(''); // 숫자 입력이므로 에러 메시지 초기화
		}
		const phoneAdded = phoneFormData.areaCode + '-' + phoneFormData.phoneMiddle + '-' + phoneFormData.phoneLast;
		console.log(phoneAdded);
		console.log(storeFormData.phone);
		setStoreFormData({
			...storeFormData,
			phone: phoneAdded,
		});
	};	
	const handleKeyUp = (e) =>{
		
		const phoneAdded = phoneFormData.areaCode + '-' + phoneFormData.phoneMiddle + '-' + phoneFormData.phoneLast;	
		console.log(phoneAdded);
		setStoreFormData({
			...storeFormData,
			phone: phoneAdded,
		});
		console.log(phoneFormData.phone);
	}

	// 숫자만 입력되는 핸들러
	const handleOnlyNumChange = async (e) => {
		const { name, value } = e.target;
		// 입력값이 숫자인지 확인
		if (!isNaN(value)) {
			setStoreFormData({
			...storeFormData,
			[name]: value,
			});
		}
	};	

	// 입력 폼의 변경 핸들러
	const handleChange = async (e) => {
	const { name, value } = e.target;
	const phoneAdded = phoneFormData.areaCode + '-' + phoneFormData.phoneMiddle + '-' + phoneFormData.phoneLast;
	console.log(phoneAdded);
	setStoreFormData({
		...storeFormData,
		phone: phoneAdded,
	});
	console.log(phoneFormData.phone);
	setStoreFormData({
		...storeFormData,
		[name]: value,
	});
	};
	const [nameBlankError, setNameBlankError] = useState();
	const [locationBlankError, setLocationBlankError] = useState();
	const [phoneNumberError, setPhoneNumberError] = useState();
	const [runningTimeError, setRunningTimeError] = useState();
	const [deadLineError, setDeadLineError] = useState();


	//매장등록폼데이터 제출 핸들러 및 
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(storeFormData.open);
		console.log(storeFormData.closed);
		// 매장명 validation
		if (!storeFormData.name){
			setNameBlankError('매장명을 입력해주세요');
			return;
		} else {
			setNameBlankError('');
		}

		// 매장위치 validation
		if(!storeFormData.location){
			setLocationBlankError('매장 위치를 입력해주세요');
			return;
		} else {
			setLocationBlankError('');
		}

		// 전화번호 validation
		if(phoneFormData.phoneMiddle.length < 3 || phoneFormData.phoneMiddle.length > 4 ){
			setPhoneNumberError('잘못된 전화번호입니다.');
			return;
		} else {
			setPhoneNumberError('');
		}
		if(phoneFormData.phoneLast.length < 3 || phoneFormData.phoneLast.length > 4 ){
			setPhoneNumberError('잘못된 전화번호입니다.');
			return;
		} else {
			setPhoneNumberError('');
		}

		// 운영시간 validation
		const openHour = parseInt(storeFormData.open);
		const closedHour = parseInt(storeFormData.closed);
		if (openHour >= closedHour) {
		  setRunningTimeError('시작 시간은 종료 시간보다 <br /> 이전이어야 합니다.');
		  return;
		} else {
		  setRunningTimeError('');
		}

		// 마감일 validation 
		if(!storeFormData.deadlineOfSubmit || parseInt(storeFormData.deadlineOfSubmit) < 1 ){
			setDeadLineError('마감일은 최소 1일 이상으로 입력하세요');
			return;
		} else {
			setDeadLineError('');
		}	


		// 헤더에 토큰 추가
		const token = localStorage.getItem('jwtToken');
		const axiosConfig = {
			headers: {
			  'Authorization': `${token}`, 
			},
		};  
		try {
		  const response = await axios.post('/store/regist', storeFormData, axiosConfig);
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
			<input
				placeholder='매장명 : ex) 광화문점 '
				type="text"
				id="name"
				name="name"
				value={storeFormData.name}
				onChange={handleChange}
			/>
			</div>
			{nameBlankError && <p style={{ color: 'red', textAlign: 'center' }}>{nameBlankError}</p>}			
			<div className="form-group">
			<input
				placeholder='매장 위치 : ex) 서울 종로구 종로5길 7 '			
				type="text"
				id="location"
				name="location"
				value={storeFormData.location}
				onChange={handleChange}
			/>
			</div>
			{locationBlankError && <p style={{ color: 'red', textAlign: 'center' }}>{locationBlankError}</p>}
			<div className="form-group">
			<label htmlFor="phone">매장 전화번호</label>
			<div className="phone-input">
			<select
				id="areaCode"
				name="areaCode"
				value={phoneFormData.areaCode}
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
			placeholder='1234'
			type="text"
			id="phoneMiddle"
			name="phoneMiddle"
			value={phoneFormData.phoneMiddle}
			onChange={handlePhoneFormChange}
			style={{width: '20%'}}
			/>
			<span style={{padding: '10px'}}>-</span>
			<input
			placeholder='5678'
			type="text"
			id="phoneLast"
			name="phoneLast"
			value={phoneFormData.phoneLast}
			onChange={handlePhoneFormChange}
			style={{width: '20%'}}
			onKeyUp={handleKeyUp}
			/>
			</div>
			</div>
			{phoneNumberError && <p style={{ color: 'red', textAlign: 'center' }}>{phoneNumberError}</p>}

			<div className="form-group">
			<label htmlFor="open">매장 운영시간</label>
			<select
				id="open"
				name="open"
				value={storeFormData.open}
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
				value={storeFormData.closed}
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
			{runningTimeError && (<p style={{ color: 'red', textAlign: 'center' }}
									dangerouslySetInnerHTML={{ __html: runningTimeError }}/>
			)}
			<div className="form-group">
			<label htmlFor="payday">급여일</label>
			<select
				id="payday"
				name="payday"
				value={storeFormData.payday}
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
				value={parseInt(storeFormData.startDayOfWeek)}
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

			{/* 근무 불가능 시간 선택 마감일 */}
			<div className="form-group">
			<label htmlFor="deadlineOfSubmit">근무 불가능 시간 선택 마감일</label>
			<input
				placeholder='근무 시작일 - n일전 마감 : ex) 2'
				id="deadlineOfSubmit"
				name="deadlineOfSubmit"
				value={storeFormData.deadlineOfSubmit}
				onChange={handleOnlyNumChange}
			/>
			</div>
			{deadLineError && <p style={{ color: 'red', textAlign: 'center' }}>{deadLineError}</p>}
			<div style={{textAlign:"center"}}>
			<button type="submit" style={{color: 'white'}}>매장 등록</button></div>
		  </form>

		</div>
	  </div>
	);
};
export default RegistStorePage;
