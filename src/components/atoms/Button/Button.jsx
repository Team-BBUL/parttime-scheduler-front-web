import React from "react";
import { IconImage } from "../IconImage/IconImage";
import styles from "./Button.module.scss";

const Button = ({ value, img, onClickEvent = () => {} }) => {
	return (
		<button className={styles.btn} onClick={() => onClickEvent()}>
			{value}
			{img && <IconImage icon={img} />}
		</button>
	);
};

export { Button };
