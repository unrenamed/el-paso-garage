import React, { Component } from 'react';
import { TitleComponent } from './Title.jsx';

const withTitle = title => WrappedComponent =>
	class extends Component {
		render() {
			return (
				<React.Fragment>
					<TitleComponent title={title}/>
					<WrappedComponent {...this.props} />
				</React.Fragment>
			);
		}
	};

export { withTitle };

