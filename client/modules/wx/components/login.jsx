import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';

import { ReactiveVar } from 'meteor/reactive-var'

import { Form, Input, Button , Row, Col} from 'antd';

const FormItem = Form.Item;

let LoginForm = React.createClass({

    handleSubmit(e) {
        e.preventDefault();
        const {userName, password} = this.props.form.getFieldsValue();
        this.props.login(userName, password);
    },

    render() {
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 18 },
        };
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <div>

                </div>
                <FormItem {...formItemLayout}
                    label="姓名"
                    >
                    <Input placeholder="请输入真实姓名"
                        {...getFieldProps('userName')}
                        />
                </FormItem>
                <FormItem {...formItemLayout}
                    label="身份证号"
                    >
                    <Input type="password" placeholder="请输入身份证号码"
                        {...getFieldProps('password')}
                        />
                </FormItem>
                <Row>
                    <Col span="14" offset="10">
                        <Button type="primary" htmlType="submit">提交</Button>
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
        const user_id = FlowRouter.getQueryParam('user_id');
        console.log(user_id);
        this.props.getUser(user_id);
        console.log('in client');
    }

    render() {
        return (
            <div>
                <div className="login-header">
                    认证账户
                </div>
                <div className="page-login-body">
                    <LoginForm login={this.props.login} />
                </div>
            </div>
        );
    }
}

export default Login;
