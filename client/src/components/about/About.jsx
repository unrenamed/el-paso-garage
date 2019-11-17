import './About.css';
import React, { Component } from 'react';
import { Card, Icon, Timeline } from 'antd';

class About extends Component {
	render() {
		return (
			<div className="aboutComponent">
				<div className="contentWrapper">
					<div className="epgPhoto"/>
					<p><strong>Lorem ipsum dolor</strong> sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut
						labore
						et dolore magna aliqua. Vel pretium lectus quam id. Nibh ipsum consequat nisl vel pretium lectus
						quam id leo. Augue eget arcu dictum varius. Ipsum faucibus vitae aliquet nec ullamcorper. Et
						pharetra pharetra massa massa ultricies mi quis hendrerit. Congue mauris rhoncus aenean vel elit
						scelerisque mauris pellentesque. Morbi tristique senectus et netus et malesuada fames ac turpis.
						Neque laoreet suspendisse interdum consectetur. Orci porta non pulvinar neque laoreet
						suspendisse
						interdum consectetur libero. Eget aliquet nibh praesent tristique magna sit amet purus gravida.
						Nisi
						scelerisque eu ultrices vitae auctor eu. Vitae congue eu consequat ac felis donec et odio
						pellentesque. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel. Tellus rutrum
						tellus
						pellentesque eu. Dui sapien eget mi proin sed libero enim sed faucibus. Vel eros donec ac odio
						tempor orci dapibus ultrices in. Diam maecenas sed enim ut sem viverra aliquet.</p>
					<p>Dis parturient montes nascetur ridiculus. <strong>Viverra</strong> justo nec ultrices dui sapien
						eget mi proin.
						Eget
						nulla facilisi etiam dignissim diam quis enim. Dui sapien eget mi proin sed. Molestie nunc non
						blandit massa enim nec dui nunc mattis. Et ultrices neque ornare aenean. Velit dignissim sodales
						ut
						eu sem integer. Diam donec adipiscing tristique risus. Tincidunt id aliquet risus feugiat in
						ante
						metus. Malesuada fames ac turpis egestas integer eget. Interdum consectetur libero id faucibus
						nisl
						tincidunt eget nullam non.</p>
					<p><strong>Volutpat sed cras</strong> ornare arcu dui vivamus arcu felis. Auctor urna nunc id
						cursus metus aliquam eleifend. Lacinia quis vel eros donec ac odio. At in tellus integer feugiat
						scelerisque varius morbi. Cursus risus at ultrices mi tempus imperdiet. Posuere urna nec
						tincidunt
						praesent semper feugiat nibh.</p>
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
