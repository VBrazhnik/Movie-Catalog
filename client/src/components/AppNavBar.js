import React, { Component } from 'react';
import {
	Container,
	Navbar,
	NavbarBrand,
	NavbarToggler,
	Nav,
	NavItem,
	Collapse
} from 'reactstrap';

import AddMovieModal from './AddMovieModal';
import FileUploadModal from './FileUploadModal';

class AppNavBar extends Component {
	state = {
		isOpen: false
	};

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	};

	render() {
		return (
			<Navbar
				color="dark"
				dark
				expand="sm">
				<Container>
					<NavbarBrand
						className="font-weight-bold"
						href="/">
						Movie Catalog
					</NavbarBrand>
					<NavbarToggler
						onClick={ this.toggle }/>
					<Collapse
						isOpen={ this.state.isOpen }
						navbar>
						<Nav
							className="ml-auto"
							navbar>
							<NavItem>
								<AddMovieModal/>
							</NavItem>
							<NavItem>
								<FileUploadModal/>
							</NavItem>
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
		);
	}
}

export default AppNavBar;
