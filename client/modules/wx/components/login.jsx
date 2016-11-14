import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';
import LoginForm from '../containers/login_form.js'


class Login extends React.Component {
    constructor(props) {
        super(props);
        const user_id = FlowRouter.getQueryParam('user_id') || FlowRouter.getQueryParam('wx_user_id');
        this.props.getUser(user_id);
    }

    render() {
        return (
            <div>
                <div className="login-header">
                    认证账户
                </div>
                <div className="wx-page-login-body">
                    <LoginForm login={this.props.login} />
                </div>
            </div>
        );
    }
}

export default Login;
