import React from 'react';
import Helmet from 'react-helmet';
import R from '../../res/R';

const TitleComponent = ({ title }) => {

	const defaultTitle = R.strings.projectName;

	return (
		<Helmet>
			<title>{title ? title : defaultTitle}</title>
		</Helmet>
	);
};

export { TitleComponent };
