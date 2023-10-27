import React, { useState } from 'react';
import axios from 'axios';
import "./index.css";
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
	const serverURL = "https://sidam-scheduler.link";
	const [registerFormData, setRegisterFormData] = useState({
		accountId: '',
		password: '',
		role: 'MANAGER',
	});
	const [secondPasswordFormData, setSecondPasswordFormData] = useState({
		secondPassword: '',
	})
	  // 길이에 위반되었을 때의 상태와 메시지 초기값 설정
	  const [accountIdError, setAccountIdError] = useState('');
	  const [passwordError, setPasswordError] = useState('');
	  const handleChange = (e) => {
		const { name, value } = e.target;
		setRegisterFormData({
		  ...registerFormData,
		  [name]: value,
		});
		console.log(registerFormData.accountId);
		 // 아이디 길이 체크
		 if (name === 'accountId' && (value.length < 3 || value.length > 20)) {
			setAccountIdError('아이디는 3자 이상 20자 이하로 입력하세요.');
		  } else {
			setAccountIdError(''); // 길이가 유효하면 경고 메시지 초기화
		  }
		  if (name === 'password' && (value.length < 8 || value.length > 50)) {
			setPasswordError('비밀번호는 8자 이상 50자 이하로 입력하세요.');
		  } else {
			setPasswordError(''); // 길이가 유효하면 경고 메시지 초기화
		  }
	  };


	  // 비밀번호 일치하는지 확인 / 경고 메시지
	  const [passwordMismatch, setPasswordMismatch] = useState('');
	  const handleChangeCheckPassword =  (e) => {
		const { name, value } = e.target;
		setSecondPasswordFormData({
			...secondPasswordFormData,
			[name]: value,
		});
		if (name === 'secondPassword' && value !== registerFormData.password) { // 이름 변경 및 조건 변경
			setPasswordMismatch('비밀번호가 일치하지 않습니다.'); // 비밀번호 불일치 메시지 표시
		  } else {
			setPasswordMismatch(''); // 비밀번호 일치하면 메시지 감춤
		  }
	  };


	  const [registError, setRegistError] = useState(null);
	  const navigate = useNavigate();
	  const handleSubmit = async (e) => {
		e.preventDefault();
		 // 아이디 길이 체크
		 if (registerFormData.accountId.length < 3 || registerFormData.accountId.length > 20) {
			setAccountIdError('아이디는 3자 이상 20자 이하로 입력하세요.');
			return;
		  } else {
			setAccountIdError(''); // 길이가 유효하면 경고 메시지 초기화
		  }
		  if (registerFormData.password.length < 8 || registerFormData.password.length > 50) {
			setPasswordError('비밀번호는 8자 이상 50자 이하로 입력하세요.');
			return;
		  } else {
			setPasswordError(''); // 길이가 유효하면 경고 메시지 초기화
		  }
		  if (secondPasswordFormData.secondPassword !== registerFormData.password) { // 이름 변경 및 조건 변경
			setPasswordMismatch('비밀번호가 일치하지 않습니다.'); // 비밀번호 불일치 메시지 표시
			return;
		  } else {
			setPasswordMismatch(''); // 비밀번호 일치하면 메시지 감춤
		  }	
		try {
		  const response = await axios.post(`${serverURL}/api/auth/signup`, registerFormData);
		  console.log('회원가입 성공:', response.data);
		  navigate('/login?signupSuccess=true');
		} catch (error) {
		  console.error('회원가입 실패:', error);
		  if (error.response && error.response.status === 400) {
			// 서버에서 400 에러 응답이 오면
			setRegistError(error.response.data.data[0].defaultMessage);
		  }
		}
	  };

	  
	return (
		<div className="App">
		<div className="register-container">
		  <h2 style={{textAlign:"center", width: "300px"}}>회원가입</h2>

		  <form onSubmit={handleSubmit}>
			<div className="form-group">
			  {/* <label htmlFor="accountId">아이디</label> */}
			  <input 
			  	type="text" 
				id="accountId" 
				name="accountId"
				placeholder='ID'
				minLength="3" // 최소 길이 3
				maxLength="20" // 최대 길이 20
				value={registerFormData.accountId}
				onChange={handleChange} />
				{accountIdError && <p style={{ color: 'red', fontSize: '13px' }}>{accountIdError}</p>}
				{registError && <p style={{ color: 'red' }}>{registError}</p>}
			</div>
			<div className="form-group">
			  {/* <label htmlFor="password">비밀번호</label> */}
			  <input 
			  	type="password"
				id="password" 
				name="password"
				placeholder='비밀번호'
				minLength="8" // 최소 길이 8
				maxLength="50" // 최대 길이 50
				value={registerFormData.password}
				onChange={handleChange} />
				{passwordError && <p style={{ color: 'red', fontSize: '13px' }}>{passwordError}</p>}
			</div>
			<div className="form-group">
			  {/* <label htmlFor="password">비밀번호 확인</label> */}
			  <input 
			  	type="password"
				id="secondPassword" 
				name="secondPassword"
				placeholder='비밀번호 확인'
				value={secondPasswordFormData.password}
				onChange={handleChangeCheckPassword} />
				{passwordMismatch && <p style={{ color: 'red', fontSize: '13px', height: '20px', margin: '0' }}>{passwordMismatch}</p>}
			</div>
			
			<div style={{textAlign:"center"}}>
			<button type="submit" style={{color: 'white'}}>회원가입</button></div>
		  </form>

		</div>
	  </div>
	);
};

export default SignUpPage;
