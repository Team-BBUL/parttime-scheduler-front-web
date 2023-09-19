const getDateArray = (array) => {
	return array.map((currentDate) => {
		return {
			year: currentDate.getFullYear(),
			month: currentDate.getMonth() + 1,
			day: currentDate.getDate()
		}
	})
}

const getMondayOfTheWeek = (currentDate) => {
	const date = new Date(currentDate);  // 입력된 날짜를 복사하여 새로운 Date 객체를 생성합니다.
	const day = date.getDay();
	const difference = date.getDate() - day + (day === 0 ? -6 : 1);  // 월요일로 조정
	date.setDate(difference);
	return date;
}

export { getMondayOfTheWeek, getDateArray};