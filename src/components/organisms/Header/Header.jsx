import React from "react";
// import { Button, IconImage } from "../../atoms";
import styles from "./Header.module.scss";

const Header = () => {
	return (
		<header className={styles.header}>
			{/* {window.location.pathname === "/schedule" && (
				<>
					<Button img={"ARROWLEFT"} />
					<div>4월 3일 ~ 4월 9일</div>
					<Button img={"ARROWRIGHT"} />
					<Button img={"WRITE"} />
				</>
			)} */}
		</header>
	);
};

export { Header };
