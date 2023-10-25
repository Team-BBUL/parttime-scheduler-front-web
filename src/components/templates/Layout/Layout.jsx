import React from "react";
import {
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
