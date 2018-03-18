import React, { Component, Fragment } from 'react';
import { Button, Badge, Alert } from 'reactstrap';

import PhoneField from '../PhoneField/PhoneField.js';

class PhoneForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			addMore: false,
			logData: false,
			repeatedType: false,
			fields: [
				{
					type: null,
					value: null
				}
			]
		};

		this.addPhoneField = this.addPhoneField.bind(this);
		this.deleteHandler = this.deleteHandler.bind(this);
		this.selectHandler = this.selectHandler.bind(this);
		this.inputHandler = this.inputHandler.bind(this);
		this.logData = this.logData.bind(this);
	}

	addPhoneField() {
		const { fields } = this.state;
		const newField = { type: null, value: null}
		
		this.setState({ fields: [...fields, newField]});

		if(this.state.fields.length >= 3){
			this.setState({addMore: true});
		}
	}

	deleteHandler(index) {
		const newFields = this.state.fields;
		newFields.splice(index,1)

		this.setState({fields: newFields});

		if(newFields.length < 4){
			this.setState({addMore: false});
		}
	}

	selectHandler(index, phoneType){
		const newFields = this.state.fields;

		const exists = newFields.find(phone =>  phone.type === phoneType);

		if(exists){
			this.setState({repeatedType: true});
		}else{
			newFields[index].type = phoneType;

			this.setState({
				fields: newFields,
				repeatedType: false
			});
		}
	}

	inputHandler(index, phoneNumber) {
		const newFields = this.state.fields;
		newFields[index].value = phoneNumber;

		this.setState({fields: newFields});
	}

	logData() {
		this.setState({logData: true});
	}

	renderData() {
		const { logData } = this.state;

		if(!logData){
			return null;
		}

		const { fields } = this.state;

		return fields.map(field => {
			const {type, value} = field;
			return (
				<p key={type}>
					<Badge color="info">{type}</Badge> {value}
				</p>
			)
		});
	}

	render() {
		const { fields, addMore, logData, repeatedType } = this.state;
		const collectedData = this.renderData();

		return (
			<Fragment>
				<div className="fields">
					{
						fields.map( (field, index) => {
							return (
								<div key={index} className="field mb-3">
									<PhoneField 
										index={index} 
										onDelete={this.deleteHandler}
										onSelectChange={this.selectHandler}
										onInputChange={this.inputHandler} />
								</div>
							)
						})
					}
				</div>

				{
					repeatedType ? 
					<Alert color="danger">
						There can't be more than one type of number!
					</Alert>:
					null
				}

				<div className="actions mt-3">
					<Button 
						outline 
						color="secondary"
						onClick={this.logData}>Log</Button>
					<Button 
						color="primary" 
						onClick={this.addPhoneField}
						disabled={addMore}>Add another</Button>
				</div>

				<div className="collected-data mt-5 text-left">
					{ logData ? <h2>Collected Data</h2> : null}
					{ collectedData }
				</div>
			</Fragment>
		)
	}
}

export default PhoneForm;