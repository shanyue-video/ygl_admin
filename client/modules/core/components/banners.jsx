import React from 'react';

import { Table } from 'antd';
import { Modal, Button } from 'antd';

import { Form, Input, Row, Col, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import Action from '../actions/index.js'
import lrz from 'lrz/dist/lrz.bundle.js';


let AddButton = React.createClass({
    getInitialState() {

        this.getFieldProps = this.props.form;
        //this.fieldProps =
        //    ['desc', 'orderBy', 'detail', 'group', 'status'].map((s) => {
                console.log('--->filedddd');
        //        console.log(this.props.opId);
                //return getFieldProps(s, {});
            //});


        return { visible: false };
    },
    showModal() {
        /*
        if (this.props.opId != undefined) {
            const [descFiled, orderByFiled, detailFiled, groupFiled, statusFiled] = this.fieldProps;
            [descFiled, orderByFiled, detailFiled, groupFiled, statusFiled].map((o) => {
                console.log('---dd>', this.props.opId);
                o.initialValue = this.props.opId[o.id];
            });
            console.log('a--->');
            console.log(detailFiled);
        }*/

        /*
        if (this.props.opId != undefined) {
            const { getFieldProps } = this.props.form;
            this.fieldProps =
                ['desc', 'orderBy', 'detail', 'group', 'status'].map((s) => {
                    //console.log('--->filed');
                    //console.log(getFieldProps(s, {}));
                    console.log('--->filedsss');
                    console.log(this.props.opId);
                    return getFieldProps(s, {'initialValue': this.props.opId[s]});
                });
            console.log('--->filed');
            console.log(this.fieldProps);
        }
        */

        this.setState({
            visible: true,
        });
    },
    handleOk() {
        this.setState({
            visible: false,
        });
    },
    handleCancel() {
        this.props.form.resetFields();
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
        /*
        const [descFiled, orderByFiled, detailFiled, groupFiled, statusFiled] = this.fieldProps;
        console.log('<---filed');
        console.log(descFiled);
        console.log(descFiled);
        console.log('filed--->');
        const { getFieldProps } = this.props.form;
        */

        //const { getFieldProps } = this.props.form;
        const { getFieldProps } = this.getFieldProps;
        let fieldProps =
                        ['desc', 'orderBy', 'detail', 'group', 'status'].map((s) => {
                            //console.log('--->filed');
                            //console.log(this.props.opId);
                            return getFieldProps(s, {});
                        });
        if (this.props.opId != undefined) {
            //const { getFieldProps } = this.props.form;
            fieldProps =
                ['desc', 'orderBy', 'detail', 'group', 'status'].map((s) => {
                    //console.log('--->filed');
                    //console.log(getFieldProps(s, {}));
                    console.log('--->filedsss');
                    console.log(this.props.opId);
                    return getFieldProps(s, {'initialValue': this.props.opId[s]});
                });
            console.log('--->filed');
            console.log(this.fieldProps);
        }

        const editorForm = (
            <Form>
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
                            <Input placeholder="文字描述" size="default" type="text" autoComplete="off"
                                {...fieldProps[0]} />
                        </FormItem>
                        <FormItem
                            label="排序"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            >
                            <Input placeholder="排序" size="default" autoComplete="off"
                                {...getFieldProps('orderBy', {})} />
                        </FormItem>
                        <FormItem
                            label="内容"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            >
                            <Input type="textarea" placeholder="内容" autosize autoComplete="off"
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
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        );

        return (
            <div>
                <Button type="primary" onClick={this.showModal}>{this.props.text}</Button>
                <Modal style={{ top: 40 }} title={this.props.text} visible={this.state.visible}
                       onCancel={this.handleCancel} onOk={this.handleSubmit}>
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
                return (<AddButton text='详情' opId={obj} />);
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
