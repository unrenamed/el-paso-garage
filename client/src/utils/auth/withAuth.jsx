import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const withAuth = ComponentToProtect =>
	class extends Component {
		constructor(props) {
			super(props);
			this.state = {
				loading: true,
				redirect: false,
			};
		}

		componentDidMount() {
			fetch('/api/checkToken')
				.then(res => {
					if (res.status === 200) {
						this.setState({ loading: false });
					} else {
						throw new Error();
					}
				})
				.catch(() => {
					this.setState({ loading: false, redirect: true });
				});
		}

		render() {
			const { loading, redirect } = this.state;

			if (loading) {
				return null;
			}

			if (redirect) {
				return <Redirect to="/login" />;
			}

			return (
				<ComponentToProtect {...this.props} />
			);
		}
	};

export { withAuth };
