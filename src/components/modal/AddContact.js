import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

const style = {
	marginRight: '30px',
}

class AddContact extends Component {
	constructor(props) {
		super(props);

		this._handleInputChange = this._handleInputChange.bind(this)

		this.state = {
			contact: {
				first_name: '',
				middle_name: '',
				last_name: '',
				gender: '',
				mobile: ''
			}
		}
	}

	componentDidMount = () => {
		if(this.props.selectedId){
			this._getContact(this.props.selectedId)
		}
	}

	_getContact = (id) => {
		this.props.apiServie.get('ContactsGet/'+id, result => {
			this.setState({
				contact: result
			})
		})
	}

	_handleInputChange = (e) => {
		const target = e.target
		const name = target.name

		this.setState({
			contact: this.props.lodash.extend(this.state.contact, {[name] : target.value})
		})

		this.props.handler( this.state.contact )
	}

	render() {
		return (
			<div className="ContactForm">
				<form>
					<div>
					    <TextField
					    	style={style}
					      	floatingLabelText="Firstname"
					      	floatingLabelFixed={true}
					      	name="first_name"
					      	value={this.state.contact.first_name}
					      	onChange={this._handleInputChange}
					    />
					    <TextField
					    	style={style}
					      	floatingLabelText="Middlename"
					      	floatingLabelFixed={true}
					      	name="middle_name"
					      	value={this.state.contact.middle_name}
					      	onChange={this._handleInputChange}
					    />
					    <TextField
					    	style={style}
					      	floatingLabelText="Lastname"
					      	floatingLabelFixed={true}
					      	name="last_name"
					      	value={this.state.contact.last_name}
					      	onChange={this._handleInputChange}
					    />
				    </div>
				    <div>
					    <TextField
					    	style={style}
					      	floatingLabelText="Gender"
					      	floatingLabelFixed={true}
					      	name="gender"
					      	value={this.state.contact.gender}
					      	onChange={this._handleInputChange}
					    />
					    <TextField
					    	style={style}
					      	floatingLabelText="Mobile Number"
					      	floatingLabelFixed={true}
					      	name="mobile"
					      	value={this.state.contact.mobile}
					      	onChange={this._handleInputChange}
					    />
					</div>
				</form>
			</div>
		)
	}
}

export default AddContact