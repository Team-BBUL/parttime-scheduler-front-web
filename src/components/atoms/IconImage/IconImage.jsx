import React from "react";
import Write from "../../../assets/image/icon/write.svg";
import ArrowLeft from "../../../assets/image/icon/arrow-left.svg";
import ArrowRight from "../../../assets/image/icon/arrow-right.svg";

import Home from "../../../assets/image/footer/home.svg";
import schedule from "../../../assets/image/footer/schedule.svg";
import Dollar from "../../../assets/image/footer/dollar.svg";
import Message from "../../../assets/image/footer/message.svg";

const isDiscernIcon = ({ icon }) => {
	switch (icon) {
		case "WRITE":
			return Write;
		case "ARROWLEFT":
			return ArrowLeft;
		case "ARROWRIGHT":
			return ArrowRight;
		
		case "HOME":
			return Home;
		case "schedule":
			return schedule;
		case "DOLLAR":
			return Dollar;
		case "MESSAGE":
			return Message;
		default:
			break;
	}
};

const IconImage = ({ icon }) => {
	const Icon = isDiscernIcon({ icon });
	return <img src={Icon} alt="아이콘" />;
};

export { IconImage };
