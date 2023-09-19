import React from "react";
import {
	Footer,
	Header,
	Navbarcr,

} from "../../organisms";

const Layout = ({ children }) => {
	return (
		<div>
			<Navbarcr />
			{/* <Header /> */}
			<main>{children}</main>

			{/* <Footer /> */}
		</div>
	);
};

export { Layout };
