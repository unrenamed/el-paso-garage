import React, { Component } from 'react';
import './Home.css';
import { Card, Icon, Skeleton } from 'antd';

class Home extends Component {
	render() {
		const cards = [...Array(12).keys()];

		return (
			<div className="servicesWrapper">
				{
					cards.map(card => {
						return (
							<Card key={card + 1}
								  hoverable={true}
								  style={{ width: 300, cursor: 'auto' }}
								  cover={
									  <img
										  alt="example"
										  src="http://www.scooter-city.ru/img/auto-bike.png"
									  />
								  }
								  actions={[
									  <Icon type="shopping-cart" key={`makeOrder#${card + 1}`}/>
								  ]}
							>
								<Skeleton loading={true} active>
									<Card.Meta
										title={`Service #${card + 1}`}
										description="This is the description"
									/>
								</Skeleton>
							</Card>
						);
					})
				}
			</div>
		);
	}
}

export default Home;
