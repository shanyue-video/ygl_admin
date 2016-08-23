import React from 'react';

import { Table } from 'antd';
import { Modal, Button } from 'antd';

import { Form, Input, Row, Col, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import Action from '../actions/index.js'

//var lrz = require('lrz/dist/lrz.bundle.js');
import lrz from 'lrz/dist/lrz.bundle.js';

let AgreeButton = React.createClass({
    getInitialState() {
        return { visible: false };
    },
    showModal() {
        this.setState({
            visible: true,
        });
    },
    handleOk() {
        Action.Banners.confirm(this.props.opId._id);
        this.setState({
            visible: false,
        });
    },
    handleCancel(e) {
        this.setState({
            visible: false,
        });
    },
    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>{this.props.text}</Button>
                <Modal title="提交" visible={this.state.visible}
                       onOk={this.handleOk} onCancel={this.handleCancel}>
                    <p>确定同意{this.props.opId.name}的请求?</p>
                </Modal>
            </div>
        );
    },
});

let AddButton = React.createClass({
    getInitialState() {
        return { visible: false };
    },
    showModal() {
        this.setState({
            visible: true,
        });
    },
    handleOk() {
        //Action.Banners.confirm(this.props.opId._id);
        //console.log(this.props.children);
        this.setState({
            visible: false,
        });
    },
    handleCancel() {
        this.setState({
            visible: false,
        });
    },

    handleSubmit(e) {
        e.preventDefault();
        //console.log(e);
        console.log('收到：', $('#picture').attr("data-file"));
        console.log('收到表单值：', this.props.form.getFieldsValue());
        const { desc, orderBy, detail, group, username } = this.props.form.getFieldsValue();
        const thumb = $('#picture').attr("data-file");
        const createAt = new Date();
        const obj = {desc, orderBy, detail, group, username, thumb, createAt};
        Action.Banners.insert(obj);
        this.setState({
            visible: false,
        });
    },
    onChange(event) {
        var that = $(event.currentTarget);
        lrz(event.currentTarget.files[0], {
            width: 720
        }).then(function(rst) {
            that.parent().css({
                "background-image": "url(" + rst.base64 + ")"
            });
            that.attr("data-file", rst.base64);
        });
    },

    render() {

        const { getFieldProps } = this.props.form;

        const editorForm = (
            <Form onSubmit={this.handleSubmit}>
                <div className="ff-file">
                    <input onChange={this.onChange} type="file" id="picture" name="picture"
                         />
                </div>
                <br />
                <Row align='middle' gutter={16}>
                    <Col sm={10}>
                        <FormItem
                            label="文字描述"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            >
                            <Input placeholder="文字描述" size="default"
                                {...getFieldProps('desc', {})} />
                        </FormItem>
                        <FormItem
                            label="排序"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            >
                            <Input placeholder="排序" size="default"
                                {...getFieldProps('orderBy', {})} />
                        </FormItem>
                        <FormItem
                            label="内容"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            >
                            <Input type="textarea" placeholder="内容" autosize
                                {...getFieldProps('detail', {})} />

                        </FormItem>
                    </Col>
                    <Col sm={10} offset={2}>
                        <FormItem
                            label="组"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            >
                            <Input placeholder="组" size="default"
                                {...getFieldProps('group', {})} />
                        </FormItem>
                        <FormItem
                            label="状态"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            >
                            <Select style={{ width: 113 }} placeholder="请选择状态"
                                {...getFieldProps('status', {})}>
                                <Option value="1">已上线</Option>
                                <Option value="0">未上线</Option>
                            </Select>
                        </FormItem>
                        <FormItem
                            lable=""
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14, offset: 10 }}
                            >
                            <Button type="primary" htmlType="submit">保存</Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        );

        return (
            <div>
                <Button type="primary" onClick={this.showModal}>{this.props.text}</Button>
                <Modal footer={<div/>} style={{ top: 40 }} title="提交" visible={this.state.visible}
                       onCancel={this.handleCancel}>
                    {editorForm}
                </Modal>
            </div>
        );
    },
});

AddButton = Form.create()(AddButton);

class Banners extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let rawData = this.props.banners; //.toString();
        const data = rawData;

        const columns = [{
            title: 'Id',
            dataIndex: '_id',
        }, {
            title: '文字描述',
            dataIndex: 'desc',
        }, {
            title: '排序',
            dataIndex: 'orderBy',
        }, {
            title: '组',
            dataIndex: 'group',
        }, {
            title: '状态',
            render: function(obj) {
                return obj.status = 1 ? "上线" : "未上线";
            }
        }, {
            title: '创建时间',
            render: function(obj) {
                return obj.createAt.toLocaleString();
            }
        }, {
            title: '详细',
            render: function(obj) {
                return (<AgreeButton text='详情' opId={obj} />);
            }
        }];

        return (
            <Table
                columns={columns}
                dataSource={data}
                bordered
                footer={() => <AddButton text='新增'/>}
                />
        );
    }
}

export default Banners;
