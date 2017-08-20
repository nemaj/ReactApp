import React, { Component } from 'react';
import MyButton from '../myButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import ContactForm from '../modal/AddContact';

const style = {
  width: 1000,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const floatingStyle = {
	position: 'absolute',
	bottom: '20px',
	right: '20px',
};

const customContentStyle = {
  width: '50%',
  maxWidth: 'none',
};

const rowStyle = {
	cursor: 'pointer',
}

export default class myButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			selectedID: null,
			selectDeleteId: null,
			Firstname: "",
			Lastname: "",
			contacts: [],
			contactFormFields: {}
		}
	}

	_handleOpen = () => {
		this.setState({open: true});
	};

	_handleClose = () => {
		this.setState({open: false, selectedID: null, selectDeleteId: null});
	};

	_getContacts = () => {
		var main = this;

		this.props.apiServie.get('ContactsGet', result => {
			let contacts = []

			contacts = this.props.lodash.map(result, (obj) => {
				return obj
			})

			main.setState({contacts: contacts})
			console.log(contacts)
		})
	}

	_handleSelect = (id) => {
		this.setState({
			selectedID: id,
			open: true
		})
	}

	_handleDelete = (e, id) => {
		this.setState({
			selectDeleteId: id,
			open: false
		})
		e.preventDefault();
		e.stopPropagation();
		this.props.apiServie.delete('ContactsDelete/'+id, result => {
			this._getContacts()
		})
	}

	_handleFormInputs = (data) => {
		this.setState({contactFormFields: data})
	}

	_handleSubmit = (e) => {


		if(this.state.selectDeleteId == null){
			const endPoints = (this.state.selectedID) ? 'ContactsSet/'+this.state.selectedID : 'ContactsSet'

			// console.log(this.state.contactFormFields, 'contactFormFields');
			this.props.apiServie.post(endPoints, this.state.contactFormFields, result => {
				this._handleClose()
				this._getContacts()
			})
		}
		// alert('Submit');
		// if( !this.state.Firstname || !this.state.Lastname ){
		// 	alert('Please fill up the text fields.');
		// 	return false;
		// }else{
		// 	return true;
		// }
	}

	componentDidMount() {
		this._getContacts()
	}

	render() {
		const actions = [
		<FlatButton
				label="Cancel"
				secondary={true}
				onTouchTap={this._handleClose}
			/>,
		<FlatButton
				label="Submit"
				primary={true}
				onTouchTap={this._handleSubmit}
			/>,
		];

		return (
			<div>
				{
					/*
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
					*/
				}

				<Paper style={style} zDepth={2} >
					<Table>
					    <TableHeader
					    	displaySelectAll={false}
					    	adjustForCheckbox={false}>
							<TableRow>
								<TableHeaderColumn>Name</TableHeaderColumn>
								<TableHeaderColumn>Gender</TableHeaderColumn>
								<TableHeaderColumn>Mobile</TableHeaderColumn>
								<TableHeaderColumn>Action</TableHeaderColumn>
							</TableRow>	
					    </TableHeader>
						<TableBody
							displayRowCheckbox={false}>

						{
							this.state.contacts.map((item, index)=> (
									<TableRow key={index} onTouchTap={ (e) => { /*this._handleSelect(item.id)*/ } } style={rowStyle}>
										<TableRowColumn>{item.first_name + ' ' + item.middle_name + ' ' + item.last_name }</TableRowColumn>
										<TableRowColumn>{item.gender}</TableRowColumn>
										<TableRowColumn>{item.mobile}</TableRowColumn>
										<TableRowColumn><RaisedButton onClick={ (e) => { this._handleDelete(e, item.id) } } label="Delete" secondary={true}/></TableRowColumn>
									</TableRow>
								)
							)
						}

						</TableBody>
					</Table>
				</Paper>
			    <FloatingActionButton style={floatingStyle} onClick={(e)=>this._handleOpen()}>
			      <ContentAdd />
			    </FloatingActionButton>

				<Dialog
		          title={(!this.state.selectedID ? 'Add' : 'Edit') + ' Contact'}
		          actions={actions}
		          modal={false}
		          open={this.state.open}
		          onRequestClose={this.handleClose}
		          autoScrollBodyContent={true}
          		  contentStyle={customContentStyle}
				>
					<ContactForm 
						lodash={this.props.lodash} 
						handler={this._handleFormInputs} 
						selectedId={this.state.selectedID} 
						apiServie={this.props.apiServie}
					/>
				</Dialog>

			</div>
		);
	}
}