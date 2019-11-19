import React, { Component } from 'react';
import { Card, Icon, Timeline } from 'antd';
import './About.css';
import R from '../../res/R';

class About extends Component {
	render() {
		return (
			<div className="aboutComponent">
				<div className="contentWrapper">
					<div className="epgPhoto"/>
					<p>
						If you’re looking for auto repair in El Paso, Mexico you’ve found us. Here
						at <strong>{R.strings.projectName}</strong> we work hard to earn your trust and loyalty. We know
						how important it
						is to find a
						El Paso car service you can rely on, so your satisfaction is our top priority each and
						every day.
					</p>
					<p><strong>{R.strings.projectName}</strong> has been providing quality foreign and domestic car
						care, and
						full
						service gasoline in El Paso, Mexico since 1950.
						We are a family owned business delivering honest and professional automotive repair and
						auto
						maintenance services to the people of El Paso, and surrounding areas.
						Winner of 2016 "Best of El Paso" El Paso Illustrated Magazine. The quality ASE
						(automotive
						service excellence) certified technicians at <strong>{R.strings.projectName}</strong>
						Inc employ today’s latest automotive technology and are equipped to handle all major and
						minor
						repairs on foreign and domestic vehicles.
					</p>
					<p>
						Here at <strong>{R.strings.projectName}</strong> we understand what makes customer service truly
						outstanding. You
						will feel the difference exceptional customer care makes when you work with us. We know auto
						repair in El Paso offers you lots of choices, and we aim to provide the kind of caring
						customer service that will bring you back.
					</p>
					<p>
						Come by and visit our clean and professional shop in El Paso, Mexico.
					</p>
				</div>
				<div className="infoWrapper">
					<Card title="Contact us" style={{ width: 350 }}>
						<p>
							<Icon type="home" style={{ fontSize: '22px' }}/>
							Earth, Mexico, El Paso, Real Address 110/2
						</p>
						<p>
							<Icon type="phone" style={{ fontSize: '22px' }}/>
							651 000-0000
						</p>
						<p>
							<Icon type="mail" style={{ fontSize: '22px' }}/>
							el-paso-garage-mail@mail.com
						</p>
					</Card>
					<Card title="Business hours" style={{ width: 350, marginTop: '2em' }}>
						<Timeline>
							<Timeline.Item color="green">Monday: 7:30 am - 5:00 pm</Timeline.Item>
							<Timeline.Item color="green">Tuesday: 7:30 am - 5:00 pm</Timeline.Item>
							<Timeline.Item color="green">Wednesday: 7:30 am - 5:00 pm</Timeline.Item>
							<Timeline.Item color="green">Thursday: 7:30 am - 5:00 pm</Timeline.Item>
							<Timeline.Item color="green">Friday: 7:30 am - 5:00 pm</Timeline.Item>
							<Timeline.Item color="red">Saturday: Closed</Timeline.Item>
							<Timeline.Item color="red">Sunday: Closed</Timeline.Item>
						</Timeline>
						<p>
							For Towing or emergency roadside assistance please call Elite Towing
							@651 111-1111
						</p>
					</Card>
				</div>
			</div>
		);
	}
}

export default About;
