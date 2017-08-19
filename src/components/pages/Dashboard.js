import React, { Component } from 'react';

import StarWars from 'components/pages/Github';

export default class Dashboard extends Component {

	render() {
		return(
			<StarWars username="people"></StarWars> 
		);
	}
}