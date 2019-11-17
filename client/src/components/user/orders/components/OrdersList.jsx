import React, { Component } from 'react';
import { Button, Col, List, Progress, Skeleton } from 'antd';
import { OrderTypes } from '../../../../constants/order-types.constants';
import moment from 'moment';
import './OrdersList.css';

class OrdersList extends Component {

	componentDidMount() {
		this.props.onLoadInit(this.props.orderType);
	}

	getOrderProgressPercentage = order => {
		const spendTimeInSeconds = moment(order.startDate).diff(moment(), 'seconds');
		const allTimeToSpend = moment(order.startDate).diff(moment(order.endDate), 'seconds');
		return Math.round(spendTimeInSeconds / allTimeToSpend * 100);
	};

	render() {
		const { loading, list, onLoadMore, currentPage, pageCount } = this.props;

		const loadMore =
			currentPage + 1 < pageCount && !loading ? (
				<div style={{ textAlign: 'center', marginTop: '2em' }}>
					<Button onClick={() => onLoadMore(currentPage + 1, this.props.orderType)}>Load more</Button>
				</div>
			) : null;

		return (
			<List
				className="ordersList"
				itemLayout="horizontal"
				loadMore={loadMore}
				dataSource={list}
				renderItem={item => (
					<List.Item
						actions={[this.props.orderType === OrderTypes.PLANNED ?
							<Button type="danger">Delete</Button> : null]}
					>
						<Skeleton title={false} loading={loading} active>
							<List.Item.Meta
								title={`Order ID: #${item._id}`}
								description={`Service: ${item.serviceId ? item.serviceId.title : null}`}
							/>
							<div className="listContent">
								<Col span={12}>
									<div className="orderInfo">
										<span><strong>Start time: </strong>{moment(item.startDate).format('dddd, MMMM Do, h:mm a')}</span>
										<span><strong>End time: </strong>{moment(item.endDate).format('dddd, MMMM Do, h:mm a')}</span>
									</div>
								</Col>
								<Col span={5}>
									<span><strong>Price: </strong>${item.serviceId ? item.serviceId.price : null}</span>
								</Col>
								{
									this.props.orderType !== OrderTypes.PLANNED ?
										<Col span={7}>
											<Progress percent={this.getOrderProgressPercentage(item)}
													  status={this.getOrderProgressPercentage(item) < 100 ? 'active' : null}/>
										</Col> : null
								}
							</div>
						</Skeleton>
					</List.Item>
				)}
			/>
		);
	}
}

export default OrdersList;
