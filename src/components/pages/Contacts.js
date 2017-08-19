import React, { Component } from 'react';
import MyButton from '../myButton';

export default class myButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Firstname: "",
			Lastname: ""
		}
	}

	_handleSubmit = (e) => {
		// alert('Submit');
		if( !this.state.Firstname || !this.state.Lastname ){
			alert('Please fill up the text fields.');
			return false;
		}else{
			return true;
		}
	}

	render() {
		return (
			<div>
				<h1>{this.props.config.SET_LANG.Contacts}</h1>
				<div>
					Firstname
					<input type="text" value={this.state.Firstname} onChange={(e) => { this.setState({Firstname: e.target.value}) } } />
				</div>
				<div>
					Lastname
					<input type="text" value={this.state.Lastname} onChange={(e) => { this.setState({Lastname: e.target.value}) } } />
				</div>
				<div>
					<MyButton onClick={(e) => { this._handleSubmit(e) } } label={"Save Contact"} />
				</div>
			</div>
		);
	}
}