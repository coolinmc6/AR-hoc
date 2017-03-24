import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
	class Authentication extends Component {
		static contextTypes = {
			router: React.PropTypes.object
		}

		componentWillMount() {
			if (!this.props.authenticated) {
				this.context.router.push('/');	
			}
			
		}
		componentWillUpdate(nextProps) {
			if (!nextProps.authenticated) {
				this.context.router.push('/')
			}
		}

		render() {
			
			return (
				<ComposedComponent {...this.props} />
			)
		}
	}

	function mapStateToProps(state) {
		return { authenticated: state.authenticated }
	}

	return connect(mapStateToProps)(Authentication);
}





/*
// In some other location...(not in this file)
// we want to use this HOC

import Authentication // this is my HOC
import Resources // This is the component I want to wrap

const ComposedComponent = Authentication(Resources)

// In some render method...
<ComposedComponent />
*/