import axios from 'axios'

const deleteSchedule = async (id) => {
  try {
    const response = await axios.get(`/api/schedule/{ store_id }/?version=:version&year=yyyy&month=mm&day=dd
근무표 버전정보, 삭제하려는 주의 시작일`);
    
    return response.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

export { deleteSchedule };