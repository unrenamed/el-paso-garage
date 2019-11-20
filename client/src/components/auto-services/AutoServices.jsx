import React, { Component } from 'react';
import './AutoServices.css';
import { getHeaderMenuItems, HeaderMenuEnum } from '../../constants/header-menu.constants';
import { Button, Card, Col, DatePicker, Divider, Drawer, Form, Icon, Input, Row, TimePicker } from 'antd';
import { serviceActions } from '../../actions/service.actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { compose } from 'redux';
import { orderActions } from '../../actions/order.actions';

class AutoServices extends Component {

	state = {
		isServiceInfoDrawerVisible: false,
		openedService: {},
		openedServiceTime: null
	};

	componentDidMount() {
		const subItem = this.getServiceMenuItem();
		if (subItem) {
			this.props.getServicesByType(subItem.key);
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const subItem = this.getServiceMenuItem();
		if (this.getCurrentServiceType() !== prevProps.match.params.type && subItem) {
			this.props.getServicesByType(subItem.key);
		}
	}

	render() {
		const subItem = this.getServiceMenuItem();

		return (
			<div className="autoServicesComponent">
				<h2>{subItem ? subItem.itemText : null}</h2>
				<div className="autoServicesWrapper">
					<Row gutter={[30, 30]}>
						{
							this.props.services.map((service, index) => {
								return (index + 1) % 3 !== 0 ? (
									<Col key={service._id} xs={24} sm={24} md={24} lg={12} xl={12}>
										{this.renderServiceInfoCard(service)}
									</Col>
								) : (
									<Col key={service._id} span={24}>
										{this.renderServiceInfoCard(service)}
									</Col>
								);
							})
						}
					</Row>
					{this.renderServiceInfoDrawer()}
				</div>
			</div>
		);
	}

	getCurrentServiceType = () => {
		return this.props.match.params.type;
	};

	getServiceMenuItem = () => {
		let serviceItem = getHeaderMenuItems().find(item => item.key === HeaderMenuEnum.SERVICES);
		const endUrlPath = `/${this.getCurrentServiceType()}`;
		const subItem = serviceItem.subItems.find(subItem => subItem.linkTo === endUrlPath);

		if (!subItem) {
			this.props.history.push('/404');
			return;
		}

		if (subItem.withAuth && !this.props.currentUser) {
			this.props.history.push('/');
			return;
		}

		return subItem;
	};

	renderServiceInfoCard = service => {
		return (
			<Card actions={[
				<div className="cardAction" onClick={() => this.openServiceInfoDrawer(service)}>
					<Icon type="shopping-cart"/>
					Order: {service.price}$
				</div>
			]}
				  cover={
					  <img className="serviceThumbnail" alt={`${service.title} thumbnail`}
						   src={`/api/thumbnails/${service.titleId}`}/>
				  }
				  hoverable={true}
				  loading={this.props.loadingServices}
			>
				<Card.Meta
					title={service.title}
					description={service.description}
				/>
			</Card>
		);
	};

	renderServiceInfoDrawer = () => {
		const { savingOrder } = this.props;

		return (
			<Drawer
				width={640}
				placement="right"
				closable={false}
				onClose={this.closeServiceInfoDrawer}
				visible={this.state.isServiceInfoDrawerVisible}
			>
				{this.renderServiceInfoForm()}
				{this.renderDateTimeForm()}
				{this.renderUserProfileForm()}

				<div
					style={{
						position: 'absolute',
						left: 0,
						bottom: 0,
						width: '100%',
						borderTop: '1px solid #e9e9e9',
						padding: '10px 16px',
						background: '#fff',
						textAlign: 'right',
					}}
				>
					<Button style={{ width: '100%' }}
							loading={savingOrder}
							onClick={this.submitUserForm}
							type="primary">
						Order
					</Button>
				</div>
			</Drawer>
		);
	};

	renderServiceInfoForm = () => {
		const service = this.state.openedService;

		return (
			<React.Fragment>
				<h2>Service info</h2>
				<p>Familiarize with {service.title} service purposes, our prices and time we are going to spend to fix
					all your issues and make you happy :)</p>
				<Row>
					<Col span={12}><h4>Service:</h4></Col>
					<Col span={12}><h4 style={{ fontWeight: 600 }}>{service.title}</h4></Col>
				</Row>
				<Row>
					<Col span={12}><h4>Price:</h4></Col>
					<Col span={12}><h4 style={{ fontWeight: 600 }}>{`${service.price}$`}</h4></Col>
				</Row>
				<Row>
					<Col span={12}><h4>Lead time:</h4></Col>
					<Col span={12}><h4
						style={{ fontWeight: 600 }}>{this.getServiceLeadTimeDisplay(service.leadTime)}</h4></Col>
				</Row>
			</React.Fragment>
		);
	};

	renderDateTimeForm = () => {
		const { getFieldDecorator } = this.props.form;

		return (
			<React.Fragment>
				<Divider/>
				<h2>Date and time</h2>
				<p>Select the date and time when you want to bring your car and you want us to start fixing it as
					well.</p>
				<Form layout="vertical" hideRequiredMark>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item label="Date">
								{getFieldDecorator('date', {
									rules: [{ required: true, message: 'Please enter the date' }],
								})(<DatePicker disabledDate={this.disabledDate}/>)}
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="TIme">
								{getFieldDecorator('time', {
									rules: [{ required: true, message: 'Please enter the time' }],
								})(<TimePicker format={'HH:mm'}
											   minuteStep={15}
											   onChange={this.onTimeChanged}
											   value={this.state.openedServiceTime}
											   disabledHours={this.disabledHours}
											   defaultOpenValue={moment('12:00', 'HH:mm')}
											   disabledMinutes={this.disabledMinutes}/>)}
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</React.Fragment>
		);
	};

	renderUserProfileForm = () => {
		const { getFieldDecorator } = this.props.form;

		if (this.props.currentUser) {
			return null;
		}

		return (
			<React.Fragment>
				<Divider/>
				<h2>Your profile</h2>
				<p>Please, share with us the contact information, so we will be able to contact with you via your phone
					or e-mail.</p>
				<Form layout="vertical" hideRequiredMark>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item label="Name">
								{getFieldDecorator('name', {
									rules: [{ required: true, message: 'Please enter your name' }],
								})(<Input placeholder="Please enter your name"/>)}
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="Surname">
								{getFieldDecorator('surname', {
									rules: [{ required: true, message: 'Please enter your surname' }],
								})(<Input placeholder="Please enter your surname"/>)}
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item label="Phone">
								{getFieldDecorator('phone', {
									rules: [{ required: true, message: 'Please enter your phone number' }],
								})(<Input placeholder="Please enter your phone"/>)}
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="E-mail">
								{getFieldDecorator('email', {
									rules: [
										{ type: 'email', message: 'The input is not valid e-mail!' },
										{ required: true, message: 'Please enter your e-mail address' }
									],
								})(<Input placeholder="Please enter your e-mail"/>)}
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</React.Fragment>
		);
	};

	openServiceInfoDrawer = service => {
		this.setState({
			isServiceInfoDrawerVisible: true,
			openedService: service
		});
	};

	closeServiceInfoDrawer = () => {
		this.props.form.resetFields();
		this.setState({
			isServiceInfoDrawerVisible: false,
			openedService: {}
		});
	};

	getServiceLeadTimeDisplay = time => {
		const timeInHours = time / 60;
		const rod = time % 60;
		return rod === 0 ? `${timeInHours} hours` : `${Math.floor(timeInHours)} hours ${rod} minutes`;
	};

	disabledDate = current => {
		return current && current < moment().endOf('day');
	};

	disabledHours = () => {
		const workingHours = [...Array(24).keys()];
		return workingHours.filter(n => n < 7 || n > 17);
	};

	disabledMinutes = selectedHour => {
		if (selectedHour === 7) {
			return [0, 15];
		}
		if (selectedHour === 17) {
			return [15, 30, 45];
		}
		return [];
	};

	onTimeChanged = time => {
		const currentTime = time;

		if (currentTime && currentTime.get('h') === 7 && currentTime.get('m') < 30) {
			this.setState({ ...this.state, openedServiceTime: currentTime.minute(30) });
		} else if (currentTime && currentTime.get('h') === 17) {
			this.setState({ ...this.state, openedServiceTime: currentTime.minute(0) });
		} else {
			this.setState({ ...this.state, openedServiceTime: currentTime });
		}
	};

	submitUserForm = e => {
		e.preventDefault();
		const service = this.state.openedService;

		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				const { email, name, surname, phone, date, time } = values;
				const user = { email, name, surname, phone };
				const startDate = moment(date)
					.set('h', moment(time).get('h'))
					.set('m', moment(time).get('m'))
					.set('s', 0);
				const order = this.props.currentUser ?
					{ userId: this.props.currentUser._id, startDate, service } :
					{ user, startDate, service };

				this.props.saveOrder(order, this.closeServiceInfoDrawer);
			}
		});
	};
}

const mapStateToProps = state => {
	const { services, loadingServices } = state.serviceReducer;
	const { savingOrder } = state.orderReducer;
	const { currentUser } = state.authentication;

	return { services, loadingServices, currentUser, savingOrder };
};

const mapDispatchToProps = {
	saveOrder: orderActions.saveOrder,
	getServicesByType: serviceActions.getServicesByType
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withRouter,
)(Form.create()(AutoServices));
