import React from 'react'
import { Label } from '../../atoms';
import styles from './SceduleEmployee.module.scss';

const SceduleEmployee = () => {
  const userListArray = [
    { name: '홍길동', totalTime: '7' },
    { name: '홍길동', totalTime: '7' },
  ]
  return (
    <div className={styles.scedule__employee}>
      {userListArray.map((current, index) => (
        <div key={index}>
          <Label text={current.name} />
          <Label text={`${current.totalTime}시간`} />
        </div>
      ))}
    </div>
  )
}

export { SceduleEmployee };