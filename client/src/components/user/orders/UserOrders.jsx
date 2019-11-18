import React, { Component } from 'react';
import './UserOrders.css';
import { Icon, Tabs } from 'antd';
import OrdersList from './components/OrdersList.jsx';
import { connect } from 'react-redux';
import { orderActions } from '../../../actions/order.actions';
import { OrderTypes } from '../../../constants/order-types.constants';

const { TabPane } = Tabs;

class UserOrders extends Component {

	loadInit = (type) => this.props.loadInit(type);

	loadMore = (page, type) => this.props.loadMore(page, type);

	deleteOrder = (order, callback) => this.props.deleteOrder(order._id, callback);

	render() {
		const {
			inProgressOrdersList, plannedOrdersList, archivedOrdersList,
			inProgressOrdersListPage, plannedOrdersListPage, archivedOrdersListPage,
			inProgressOrdersListPageCount, plannedOrdersListPageCount, archiveOrdersListPageCount,
			loading, deleteLoading
		} = this.props;

		return (
			<div className="userOrdersWrapper">
				<Tabs defaultActiveKey="1">
					<TabPane
						tab={<span><Icon type="clock-circle"/>In progress</span>}
						key="1"
					>
						<OrdersList loading={loading}
									orderType={OrderTypes.IN_PROGRESS}
									list={inProgressOrdersList}
									currentPage={inProgressOrdersListPage}
									pageCount={inProgressOrdersListPageCount}
									onLoadInit={this.loadInit}
									onLoadMore={this.loadMore}/>
					</TabPane>
					<TabPane
						tab={<span><Icon type="calendar"/>Planned</span>}
						key="2"
					>
						<OrdersList loading={loading}
									orderType={OrderTypes.PLANNED}
									list={plannedOrdersList}
									currentPage={plannedOrdersListPage}
									pageCount={plannedOrdersListPageCount}
									onDeleteOrder={this.deleteOrder}
									deleteLoading={deleteLoading}
									onLoadInit={this.loadInit}
									onLoadMore={this.loadMore}/>
					</TabPane>
					<TabPane
						tab={<span><Icon type="carry-out"/>Archived</span>}
						key="3"
					>
						<OrdersList loading={loading}
									orderType={OrderTypes.ARCHIVED}
									list={archivedOrdersList}
									currentPage={archivedOrdersListPage}
									pageCount={archiveOrdersListPageCount}
									onLoadInit={this.loadInit}
									onLoadMore={this.loadMore}/>
					</TabPane>
				</Tabs>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const {
		inProgressOrdersList, plannedOrdersList, archivedOrdersList,
		inProgressOrdersListPage, plannedOrdersListPage, archivedOrdersListPage,
		inProgressOrdersListPageCount, plannedOrdersListPageCount, archiveOrdersListPageCount,
		loading, deleteLoading
	} = state.orderReducer;
	return {
		inProgressOrdersList, plannedOrdersList, archivedOrdersList,
		inProgressOrdersListPage, plannedOrdersListPage, archivedOrdersListPage,
		inProgressOrdersListPageCount, plannedOrdersListPageCount, archiveOrdersListPageCount,
		loading, deleteLoading
	};
};

const mapDispatchToProps = {
	loadMore: (page, type) => orderActions.getOrders(page, type, false),
	loadInit: (type) => orderActions.getOrders(0, type, true),
	deleteOrder: (orderId, callback) => orderActions.deleteUserOrder(orderId, callback)
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders);
