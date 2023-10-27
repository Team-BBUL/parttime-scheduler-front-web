import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./index.css";
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
	const serverURL = "https://sidam-scheduler.link";
	//회원가입 후 로그인페이지로 이동했을 때 문구출력을 위한 데이터
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const signupSuccess = params.get('signupSuccess');
	useEffect(() => {
	  const token = localStorage.getItem('jwtToken');
	  
	  if (token) {
		navigate('/schedule');
	  }
	});

	const [loginFormData, setLoginFormData] = useState({
		accountId: '',
		password: ''
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setLoginFormData({
		  ...loginFormData,
		  [name]: value,
		});
	}
	
	//로그인 오류 메시지
	const [loginError, setLoginError] = useState(null);

	//로그인폼데이터 제출 핸들러 및 토큰 저장
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(`${serverURL}/api/auth/login`, loginFormData, { withCredentials: true })
			.then(response=>{
				const token = response.headers.Authorization;
				localStorage.setItem('jwtToken', response.headers.Authorization); //로컬스토리지 jwt 저장
				localStorage.setItem('storeId', response.data.store);
				localStorage.setItem('roleId', response.data.user.id);
				console.log('헤더:', response.headers);
				console.log('토큰:', response.headers.Authorization);
				console.log('로그인 성공:', response.data);
				console.log(token);
				// if(signupSuccess){ //회원가입 직후는 매장등록으로 바로 이동
				// 	window.location.href = '/accountdetails';
				// } else {
				// 	if(response.data.user.alias === null){
				// 		window.location.href = '/accountdetails';
				// 	} else if(response.data.store === null) {
				// 		window.location.href = '/registstore';
				// 	} else {
				// 		window.location.href = '/schedule';
				// 	}
				// }
			});
		} catch (error) {
		  console.error('로그인 실패:', error);
		  if (error.response && error.response.status === 400) {
			// 서버에서 400 에러 응답이 오면
			setLoginError(error.response.data.message);
		  }
		}
	  };
	
	


	  
	// 회원가입페이지 이동
	const navigate = useNavigate();
	const handleRegisterClick = () => {
		// '/register' 경로로 이동
		navigate('/signup');
	  };

	return (
		<div className="App">
		<div className="login-container">
		{signupSuccess && (
		<div 
			style={{ 	border: "1px solid", 
						borderRadius: "10px", 
						padding: "20px", 
						paddingBottom: "0px",
						paddingTop: "10px",
						display: "flex", 
						flexDirection: "column", 
						alignItems: "center" }}
		>
			<p>회원가입이 완료되었습니다.</p>
			<p>로그인 후 이용해주시기 바랍니다.</p>
		</div>
     	)}
		<h2 style={{ textAlign:"center", padding: "10px"}}>로그인</h2>
		<form onSubmit={handleSubmit}>
		<div className="form-group">
			  {/* <label htmlFor="accountId">아이디</label> */}
			  <input 
			  	type="text" 
				id="accountId" 
				name="accountId"
				placeholder='ID'
				value={loginFormData.accountId}
				onChange={handleChange} />
			</div>
			<div className="form-group">
			  {/* <label htmlFor="password">비밀번호</label> */}
			  <input 
			  	type="password"
				id="password" 
				name="password"
				placeholder='비밀번호'
				value={loginFormData.password}
				onChange={handleChange} />
			</div>
			{loginError && <p style={{ color: 'red' }}>{loginError}</p>}
		<div style={{textAlign:"center"}}>
		<button type="submit" style={{color: 'white'}}>로그인</button></div>

		<div 
			style={{textAlign:"center"}}
		>
			<button 
				className="regi" 
				type="register" 
				onClick={handleRegisterClick}
				style={{color: 'white'}}
			>
				회원가입
			</button>
		</div>
		
		</form>
		</div>
	  </div>
	);
};

export default LoginPage;
