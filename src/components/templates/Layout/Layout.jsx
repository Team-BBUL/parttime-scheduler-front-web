import React from "react";
import {
	Footer,
	// Header
} from "../../organisms";

const Layout = ({ children }) => {
	return (
		<div>
			{/* <Header /> */}
			<main>{children}</main>
			<Footer />
		</div>
	);
};

export { Layout };
