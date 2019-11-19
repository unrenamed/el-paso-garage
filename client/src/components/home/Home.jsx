import React, { Component } from 'react';
import './Home.css';
import R from '../../res/R';
import { Divider } from 'antd';

class Home extends Component {
	render() {
		return (
			<div className="homeComponent">
				<div className="banner"/>
				<div className="content">
					<div className="splitter"/>
					<h1 className="contentHeader">We are {R.strings.projectName}</h1>
					<div className="contentBody">
						<Divider>Welcome to our website</Divider>
						<div>
							<p>{R.strings.projectName} has been providing quality foreign and domestic car care, and
								full
								service gasoline in El Paso, Mexico since 1950.
								We are a family owned business delivering honest and professional automotive repair and
								auto
								maintenance services to the people of El Paso, and surrounding areas.
								Winner of 2016 "Best of El Paso" El Paso Illustrated Magazine. The quality ASE
								(automotive
								service excellence) certified technicians at {R.strings.projectName}
								Inc employ today’s latest automotive technology and are equipped to handle all major and
								minor
								repairs on foreign and domestic vehicles.
							</p>
							<p>
								Our El Paso car service offers you years of combined expertise from our
								well-trained technicians. We treat our auto repair professionals well, because we value
								their skill and can-do attitude. We know our team sets us apart, saving you time and
								money, not to mention worry. When it comes to auto repair in El Paso, we are
								totally confident that {R.strings.projectName} is the best option in town!
							</p>
							<p>
								Welcome! It's our goal at {R.strings.projectName} to always provide great service and
								high-quality workmanship at a fair price.
								Please browse around our website to learn more about us and our commitment to provide
								you with
								the best service possible.
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
