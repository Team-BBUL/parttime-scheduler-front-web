import React, { useState } from 'react';
import axios from 'axios';
import "./index.css";
import { useNavigate } from 'react-router-dom';

const AccountDetailsPage = () => {
	const [detailsFormData, setDetailsFormData] = useState({
		alias: '',      
		level: 0,              
		cost: 0,            
		color: '0xFFFFFFFF',         
		isSalary: false,        
		valid: true           
	});




	// 값이 바뀌면 detailsFormData 객체의 값을 저장하는 핸들러
	const handleChange = (e) => {
		const { name, value } = e.target;
		setDetailsFormData({
		  ...detailsFormData,
		  [name]: value,
		});
	}

	// 페이지 이동용
	const navigate = useNavigate(); 

	// alias != blank validation
	const [aliasError, setAliasError] = useState();

	// 상세정보폼데이터 제출 핸들러
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!detailsFormData.alias) {
			setAliasError('이름을 입력해주세요.')
			return;
		}
		// 토큰을 헤더파일에 추가
		const token = localStorage.getItem('jwtToken');
		const axiosConfig = {
			headers: {
			  'Authorization': `${token}`, 
			},
		};

		// api요청
		try {
			const response = await axios.put('/api/auth/account/details', detailsFormData, axiosConfig);
			console.log('alias 저장 성공:', response.data);
			// 상세정보 저장 후 매장등록으로 이동
			navigate('/registstore');

		} catch (error) {
		  console.error('alias 저장 실패:', error);
		  if (error.response && error.response.status === 400) {
			// 서버에서 400 에러 응답이 오면
			console.error(error.response.data.message);
		  }
		}
	  };

	return (
		<div className="App">
		<div className="details-container">
		<h3 style={{textAlign:"center", padding: "10px" }}>이름을 입력해주세요.</h3>
		<form onSubmit={handleSubmit}>
			<div className="form-group"
				style={{textAlign: 'center'}}
			>
				<input 
					placeholder='이름'				
					type="text" 
					id="alias" 
					name="alias"
					value={detailsFormData.alias}
					onChange={handleChange} 
					style={{padding: "10px", width: "50%"}}
				/>
			</div>
			{aliasError && <p style={{ color: 'red', textAlign:"center" }}>{aliasError}</p>}
			<div 
				style={{textAlign:"center"}}
			>
			<button 
				type="submit"
				style={{color: 'white'}}
			>
				저장
			</button>
			</div>
		</form>
		</div>
	  </div>
	);
};

export default AccountDetailsPage;
