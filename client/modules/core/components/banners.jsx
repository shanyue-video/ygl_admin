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
        return { visible: false };
    },
    showModal(e) {
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
    handleSubmit() {
        const { desc, orderBy, detail, group, status } = this.props.form.getFieldsValue();
        const thumb = $('#picture').attr("data-file");
        const createAt = new Date();
        const obj = {desc, orderBy, detail, group, status: parseInt(status), thumb, createAt};
        if (this.props.opId == undefined) {
            Action.Banners.insert(obj);
        } else {
            //console.log(this.props.opId);
            Action.Banners.update(obj, this.props.opId._id);
        }
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
    inputRef(c) {
        if (this.props.opId && c){
            const thumb = this.props.opId.thumb;
            c.style.backgroundImage = "url(" + thumb + ")";
            $(c.children[0]).attr("data-file", thumb);
            //console.log(c);
        }
    },

    render() {
        const { getFieldProps } = this.getFieldProps;
        let fieldProps = ['desc', 'orderBy', 'detail', 'group', 'status'].map((s) => {
            return getFieldProps(s, {});
        });
        if (this.props.opId != undefined) {
            fieldProps = ['desc', 'orderBy', 'detail', 'group', 'status'].map((s) => {
                if(s == 'status')
                    return getFieldProps(s, {'initialValue': this.props.opId[s]+''});
                else
                    return getFieldProps(s, {'initialValue': this.props.opId[s]});
            });
        }
        const editorForm = this.state.visible ? (
            <Form>
                <div ref={this.inputRef} className="ff-file">
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
                                {...fieldProps[1]} />
                        </FormItem>
                        <FormItem
                            label="内容"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            >
                            <Input type="textarea" placeholder="内容" autosize autoComplete="off"
                                {...fieldProps[2]} />

                        </FormItem>
                    </Col>
                    <Col sm={10} offset={2}>
                        <FormItem
                            label="组"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            >
                            <Input placeholder="组" size="default"
                                {...fieldProps[3]} />
                        </FormItem>
                        <FormItem
                            label="状态"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            >
                            <Select style={{ width: 113 }} placeholder="请选择状态"
                                {...fieldProps[4]}>
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
        ) : '';

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
                return obj.status == 1 ? "上线" : "未上线";
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
