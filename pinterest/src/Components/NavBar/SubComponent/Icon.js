import React from 'react';

const Icon = ({showDropdown, icon}) => (
	<div>
		<span
			className={icon}
			style={styles.icon}
			onClick={showDropdown}></span>
	</div>
);

const styles = {
	icon: {
		fontSize:'30px',
		cursor:'pointer'
	}
}
export default Icon;
