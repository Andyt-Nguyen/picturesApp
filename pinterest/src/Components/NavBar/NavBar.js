import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SocialIcon } from 'react-social-icons';
import { userSignOut } from '../../actions/actionPin';
import NavContainer from './Styles/NavContainer';
import LogoItem from './LogoItem';
import NavItems from './SubComponent/NavItems';
import { ModuleWrapper, ModuleContainer } from '../Common';
import RocketGif from '../SVG/RocketGif';
import './Styles/search.css';

class NavBar extends Component {
	constructor() {
		super();
		this.state = {
			isSetting: false,
			avatarURL: '',
			showLoader: false
		};
	}

	closeDropDown() {
		this.setState({isSetting:false});
	}

	parseEmail() {
		let email = this.props.userProfile.email;
		if(email !== undefined) {
			let parseEmail = email.split('@')[0];
			return parseEmail;
		} else {
			return 'user'
		}
	}

	signOut() {
		this.setState({showLoader:true, isSetting:false}, () => {
			setTimeout(() => {
				this.setState({showLoader:false});
				this.props.userSignOut();
			},3000)
		});
	}

	render() {
		let name;
		const { first_name, avatarURL,email } = this.props.userProfile;
		const parseName = () => {
		 if(first_name !== undefined) {
			if(first_name.length > 6){
				name = first_name.substr(0,5) + '..';
				return name
			} else {
				return name = first_name;
			}
		}
	}
		return (
			<div>
			{
					this.state.showLoader
				? <ModuleContainer position="flex-start" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
						<ModuleWrapper>
						<header style={styles.header}>
							<SocialIcon network="pinterest" />
						</header>
						<h1 style={{fontFamily:'Quicksand'}}>{`Ok we are signing you out`}</h1>
							<RocketGif />
						</ModuleWrapper>
					</ModuleContainer>
				: ''
			 }

				<NavContainer>
					<LogoItem
						showSearch={this.props.showSearch}
						onChange={this.props.onChange}/>
					<NavItems
						closeDropDown={this.closeDropDown.bind(this)}
						avatarURL={avatarURL}
						accountName={parseName()}
						email={this.parseEmail()}
						isSetting={this.state.isSetting}
						showDropdown={() => this.setState({isSetting:!this.state.isSetting})}
						signOut={this.signOut.bind(this)} />
				</NavContainer>
			</div>
		);
	}
}


const styles = {
	header: {
		width:'100%',
		background: '#efefef',
		textAlign: 'center'
	}
}

function mapStateToProps(state) {
	return {
		userProfile: state.userProfile
	}
}

export default connect(mapStateToProps, { userSignOut })(NavBar);
