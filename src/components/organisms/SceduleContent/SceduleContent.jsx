import React from 'react';
import { Label } from '../../atoms';
import { SceduleEmployee, SceduleTimeLayout } from '../../molecules';
import styles from './SceduleContent.module.scss';

const SceduleContent = ({ date }) => {
  const { day } = date;
  const dayArray = [day, day + 1, day + 2, day + 3, day + 4, day + 5, day + 6];
  const timeArray = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  return (
    <div className={styles.scedule__content}>
      <SceduleTimeLayout />
      <ul className={styles.scedule__day}>
        {dayArray.map((current) => (
          <li key={current}>
            <p>{`${current}일`}</p>
            {timeArray.map((current) => (
              <div className={styles.scedule__work}>
              </div>  
            ))}
            <div className={styles[`scedule__employee-work`]}></div>  
            {/* <div className={styles.scedule__work}>
              <div className={styles.scedule__employee}></div>
            </div> */}
          </li>
        ))}
      </ul>
      <SceduleEmployee />
    </div>
  )
}

export { SceduleContent };