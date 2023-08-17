import React from 'react'
import { Button, Label } from '../../atoms';
import styles from './SceduleHeader.module.scss';

const SceduleHeader = ({ date }) => {
  const { month, day } = date;
  return (
    <div className={styles.scedule__header}>
      <Button img={"ARROWLEFT"} />
      <Label text={`${month}월 ${day}일 ~ ${month}월 ${day+6}일`} />
      <Button img={"ARROWRIGHT"} />
      <Button img={"WRITE"} />
    </div>
  )
}

export { SceduleHeader };