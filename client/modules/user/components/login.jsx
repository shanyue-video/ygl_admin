import React from 'react';

import { Form, Input, Button , Row, Col} from 'antd';

const FormItem = Form.Item;

let LoginForm = React.createClass({

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.props);
        console.log('收到表单值：', this.props.form.getFieldsValue());
        const {userName, password} = this.props.form.getFieldsValue();
        console.log(userName);
        console.log(password);
        this.props.login(userName, password);
    },

    render() {
        const { getFieldProps } = this.props.form;
        //const style = {textAlign: 'center'};
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 18 },
        };
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout}
                    label="账户"
                    >
                    <Input placeholder="请输入账户名"
                        {...getFieldProps('userName')}
                        />
                </FormItem>
                <FormItem {...formItemLayout}
                    label="密码"
                    >
                    <Input type="password" placeholder="请输入密码"
                        {...getFieldProps('password')}
                        />
                </FormItem>
                <Row>
                    <Col span="18" offset="3">
                        <Button type="primary" htmlType="submit">登录</Button>
                    </Col>
                </Row>
            </Form>
        );
    },
});

LoginForm = Form.create()(LoginForm);

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
                    <LoginForm login={this.props.login} />
                </div>
            </div>
        );
    }
}

export default Login;
