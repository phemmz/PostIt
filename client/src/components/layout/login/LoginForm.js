import React, { Component } from 'react';
import classnames from 'classnames';
import sharedSigninValidations from '../../../../../server/shared/loginValidations';
import TextFieldGroup from '../../common/TextFieldGroup';
import { connect } from 'react-redux';
import { login } from '../../../actions/authActions';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {},
            isLoading: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    isValid() {
        const { errors, isValid } = sharedSigninValidations.validateSignin(this.state);
        if (!isValid) {
            this.setState({ errors });
        }
        return isValid; 
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {} });
            this.props.login(this.state).then(
                (res) => this.context.router.push('/dashboard'),
                (err) => this.setState({ errors: err.response.data.errors})
            );
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

	render() {
    	const { errors, username, password, isLoading } = this.state;
    	return (
		    <form onSubmit={this.onSubmit}>
				<h4 className="green-text text-darken-4">Login</h4>	
                { errors.message  && <div className="alert alert-danger">{errors.message}</div> }
                <TextFieldGroup 
                    error={errors.username}
                    id="username"
                    onChange={this.onChange}
                    value={this.state.username}
                    field="username"
                    htmlFor="username"
                    label="Username"
                    checkUserExists={this.checkUserExists}
                />
                <TextFieldGroup 
                    error={errors.password}
                    id="password"
                    onChange={this.onChange}
                    value={this.state.password}
                    field="password"
                    htmlFor="password"
                    label="Password"
                    type="password"
                    checkUserExists={this.checkUserExists}
                />
                <button className="waves-effect waves-light btn">Login</button>
            </form>	
		)	
    }
}

LoginForm.propTypes = {
    login: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect(null, { login })(LoginForm);