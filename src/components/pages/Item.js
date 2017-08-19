import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class Item extends Component {

	render() {
		return(
			<TableRow>
				<TableRowColumn>{this.props.item.name}</TableRowColumn>
				<TableRowColumn>{this.props.item.gender}</TableRowColumn>
				<TableRowColumn>{this.props.item.hair_color}</TableRowColumn>
			</TableRow>
		);
	}

}