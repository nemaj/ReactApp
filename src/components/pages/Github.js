import React, { Component } from 'react';
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

const style = {
  width: 1000,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const urlForUsername = username =>
	`https://swapi.co/api/${username}/`

export default class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false,
			eachData: [],
		}
	}

	componentDidMount() {
		fetch(urlForUsername(this.props.username))
			.then(response => {
				if(!response.ok){
					throw Error("Network request failed");
				}
				return response
			})
			.then(d => d.json())
			.then(d => {
				this.setState({
					githubData: d
				})
			}, () => {
				this.setState({
					requestFailed: true	
				})
			})
	}

	_handleOpen = (url) => {
		this.setState({open: true});
		if(url){
			this._handelData(url);
		}
	};

	_handleClose = () => {
		this.setState({open: false});
	};

	_handelData = (url) => {
		fetch(url)
			.then(d => d.json())
			.then(d => {
				this.setState({
					eachData: d
				})
			})
	};

	_viewDetails = (data) => {
		alert(data);
	}

	render() {
		const actions = [
		<FlatButton
				label="Cancel"
				primary={true}
				onClick={this._handleClose}
			/>,
		];

		if(this.state.requestFailed) return <p>Failed...</p>
		if(!this.state.githubData) return <p>Loading...</p>
		return(
			<div>
				<h2>Star Wars</h2>
				<Paper style={style} zDepth={2} >
					<Table>
					    <TableHeader>
							<TableRow>
								<TableHeaderColumn>Name</TableHeaderColumn>
								<TableHeaderColumn>Gender</TableHeaderColumn>
								<TableHeaderColumn>Hair Color</TableHeaderColumn>
								<TableHeaderColumn>Action</TableHeaderColumn>
							</TableRow>	
					    </TableHeader>
						<TableBody>
						{
							this.state.githubData.results.map((item, index)=> {
								// return <Item key={index} item={item}/>
								return (
									<TableRow key={index}>
										<TableRowColumn>{item.name}</TableRowColumn>
										<TableRowColumn>{item.gender}</TableRowColumn>
										<TableRowColumn>{item.hair_color}</TableRowColumn>
										<TableRowColumn><RaisedButton onClick={ (e) => { this._handleOpen(item.url) } } label="View Details" primary={true} key={index} value={item.url}/></TableRowColumn>
									</TableRow>
								)
							})
						}
						</TableBody>
					</Table>
				</Paper>

				<Dialog
				  title="Star Wars Details"
				  actions={actions}
				  modal={true}
				  open={this.state.open}
				>
				  	
					<p><b>Name: </b>{this.state.eachData.name}</p>
					<p><b>Height: </b>{this.state.eachData.height}</p>
					<p><b>Mass: </b>{this.state.eachData.mass}</p>
					<p><b>Hair Color: </b>{this.state.eachData.hair_color}</p>
					<p><b>Skin Color: </b>{this.state.eachData.skin_color}</p>
					<p><b>Eye Color: </b>{this.state.eachData.eye_color}</p>
					<p><b>Birth Year: </b>{this.state.eachData.birth_year}</p>
					<p><b>Gender: </b>{this.state.eachData.gender}</p>
					<p><b>Created: </b>{this.state.eachData.created}</p>
					<p><b>Edited: </b>{this.state.eachData.edited}</p>

				</Dialog>
			</div>
		);
	}
}