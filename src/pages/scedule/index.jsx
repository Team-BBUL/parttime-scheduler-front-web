import React from "react";
import { SceduleHeader } from '../../components/molecules';
import { SceduleContent } from '../../components/organisms';

const ScedulePage = () => {
	

	return (
		<section className="scedule">
			<SceduleHeader date={{month: 4, day: 3}} />
			<div className="scedule__divide__line"></div>
			<SceduleContent date={{ day: 3 }} />
		</section>
	);
};

export default ScedulePage;
