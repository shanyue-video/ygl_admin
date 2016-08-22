import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="login-single animated fadeInUp ">
                <div className="login-header">
                    账户登录
                </div>
                <div className="page-login-body">
                    <div className="page-login-form">
                        <div className="page-login-row">
                            <input id="tel" type="tel" placeholder="请填写注册的手机号码" />
                            <i className="fa fa-mobile"></i>
                        </div>
                        <div className="page-login-row">
                            <input id="password" type="password"  placeholder="请填写注册的密码" />
                            <i className="fa fa-key"></i>
                        </div>
                        <div className="page-login-btng">
                            <div className="page-login-btn loginBtn ">登录</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
