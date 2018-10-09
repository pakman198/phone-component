import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
	InputGroup, 
	InputGroupAddon, 
	InputGroupText, 
	Input, 
	Button} from 'reactstrap';


class PhoneField extends Component {
	static propTypes = {
		index: PropTypes.number,
		onDelete: PropTypes.func,
		onInputChange: PropTypes.func,
		onSelectChange: PropTypes.func
	}

	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			dropdownOpen: false
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
	}

	toggle() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	}

	renderDropdown() {
		return (
			<Input type="select" onChange={this.handleSelectChange}>
				<option>Phone Type</option>
				<option value="Home">Home</option>
				<option value="Mobile">Mobile</option>
				<option value="Work">Work</option>
				<option value="Other">Other</option>
			</Input>
		) 
	}

	handleClick() {
		const { index, onDelete } = this.props;
		onDelete(index);
	}

	handleInputChange(event) {
		const { index, onInputChange } = this.props;
		const { value } = event.target;

		onInputChange(index, value);
	}

	handleSelectChange(event) {
		const { index, onSelectChange } = this.props;
		const { value } = event.target;

		onSelectChange(index, value);
	}

	render() {
		const dropDown = this.renderDropdown();

		return (
			<InputGroup>
				<InputGroupAddon addonType="prepend">
					<InputGroupText>{ dropDown }</InputGroupText>
				</InputGroupAddon>
				<Input type="number" onChange={this.handleInputChange}/>
				<InputGroupAddon addonType="append">
					<InputGroupText><Button onClick={this.handleClick}>X</Button></InputGroupText>
				</InputGroupAddon>
			</InputGroup>
		);
	}
}

export default PhoneField;