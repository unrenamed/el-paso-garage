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
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Nibh nisl condimentum id venenatis a
								condimentum vitae. Tortor condimentum lacinia quis vel eros donec. Vitae congue eu
								consequat ac felis donec et odio pellentesque. Sollicitudin ac orci phasellus egestas
								tellus rutrum tellus pellentesque. Amet est placerat in egestas. Sapien faucibus et
								molestie ac feugiat sed lectus. Vel fringilla est ullamcorper eget nulla. Leo in vitae
								turpis massa sed elementum tempus. Euismod nisi porta lorem mollis aliquam ut porttitor
								leo a. Praesent semper feugiat nibh sed. Eu turpis egestas pretium aenean. Tellus
								integer feugiat scelerisque varius. Nisl condimentum id venenatis a condimentum vitae
								sapien pellentesque. Pharetra convallis posuere morbi leo urna molestie at. Duis ut diam
								quam nulla porttitor massa. Diam vel quam elementum pulvinar etiam non quam lacus
								suspendisse.
							</p>
							<p>
								Fermentum posuere urna nec tincidunt praesent semper feugiat. Urna molestie at elementum
								eu facilisis sed odio morbi quis. Mauris vitae ultricies leo integer. Diam quis enim
								lobortis scelerisque fermentum dui. Sed felis eget velit aliquet sagittis id consectetur
								purus. Rhoncus est pellentesque elit ullamcorper. Ac turpis egestas sed tempus urna.
								Tristique nulla aliquet enim tortor at. At imperdiet dui accumsan sit amet. Sit amet
								volutpat consequat mauris nunc congue nisi vitae. Magna ac placerat vestibulum lectus
								mauris ultrices eros. Ultrices mi tempus imperdiet nulla malesuada. Auctor eu augue ut
								lectus arcu bibendum at varius vel.
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
