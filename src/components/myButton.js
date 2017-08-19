import React, { Component } from 'react';

export default class myButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			buttonLabel: this.props.label
		}
	}

	_handleClick = (e) => {
		this.setState({
			buttonLabel:'Saving . . . '
		})
	}

	render() {
		return (
			<button onClick={(e) => { 
				if(!this.props.onClick(e)){
					// this.props.onClick(e)
				}else{ 
					this._handleClick(e) 
				}

				} }>{this.state.buttonLabel}</button>
		);
	}
}