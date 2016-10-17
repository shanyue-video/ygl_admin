import React from 'react';
import { Form, Input, Button , Row, Col} from 'antd';

const FormItem = Form.Item;

let LoginForm = React.createClass({

    getInitialState() {
        return {};
    },

    handleSubmit(e) {
        e.preventDefault();
        const {userName, userNo} = this.props.form.getFieldsValue();
        const wx_user_id = this.props.wx_user._id;
        this.props.auth(userName, userNo, wx_user_id);
    },

    render() {
        //console.log(this.props.wx_user);
        const wx_user = this.props.wx_user;

        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 18 },
        };
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <div style={{textAlign: 'center', marginBottom: '40px'}}>
                    {wx_user ? wx_user.data.nickname: ''}
                    <div>
                        <img height="80" width="80" src={wx_user ? wx_user.data.headimgurl: ''} />
                    </div>
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
                    <Input placeholder="请输入身份证号码"
                        {...getFieldProps('userNo')}
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

export default LoginForm;
