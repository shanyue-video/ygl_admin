import React from 'react';
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

export default LoginForm;
