import React, { Component } from 'react';
import {
	Alert,
	Button,
	Form,
	FormGroup,
	CustomInput,
	Modal,
	ModalHeader,
	ModalBody,
	NavLink,
	Container
} from 'reactstrap';

import { uploadMovies } from '../actions/movieActions';
import { connect } from 'react-redux';

class FileUploadModal extends Component {
	state = {
		modal: false,
		file: null,
		label: 'Choose file',
		alertIsOpen: false,
		alertColor: null,
		alertText: ''
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal,
			file: null,
			label: 'Choose file',
			alertIsOpen: false
		});
	};

	onFileSelect = event => {
		this.setState({
			file: event.target.files[0],
			label: event.target.files[0].name
		})
	};

	onFileUpload = () => {
		if (this.state.file)
		{
			const data = new FormData();
			data.append('movies', this.state.file, this.state.file.name);

			const file = {
				entity: this.state.file,
				name: this.state.file.name
			};

			this.props.uploadMovies(file)
				.then(() => (this.setState({
					alertIsOpen: true,
					alertColor: 'success',
					alertText: 'Successfully uploaded'
				})))
				.catch((error) => (this.setState({
					alertIsOpen: true,
					alertColor: 'danger',
					alertText: error.response.data
				})));
		}
	};

	render() {
		return (
			<Container>
				<NavLink
					className="navigation-link"
					color="light"
					onClick={ this.toggle }>
					Upload File
				</NavLink>

				<Modal
					isOpen={ this.state.modal }
					toggle={ this.toggle }>
					<ModalHeader
						toggle={ this.toggle }>
						File Upload
					</ModalHeader>
					<ModalBody>
						<Form>
							<FormGroup>
								<CustomInput
									type="file"
									name="movies"
									id="moviesFileUpload"
									onChange={ this.onFileSelect }
									label={ this.state.label }/>
								<Button
									className="mt-3"
									onClick={ this.onFileUpload }
									color="dark"
									block>
									Upload
								</Button>
								<Alert
									className="mt-3"
									color={ this.state.alertColor }
									isOpen={ this.state.alertIsOpen }>
									{ this.state.alertText }
								</Alert>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	file: state.file
});

export default connect(
	mapStateToProps,
	{ uploadMovies }
)(FileUploadModal);
