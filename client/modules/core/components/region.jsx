import React from 'react';

import { Table } from 'antd';
import { Modal, Button } from 'antd';
import { Pagination } from 'antd';

import { Form, Input, Row, Col, Select } from 'antd';

import ReginEditor from '../containers/regin_editor.js';

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
    handleCancel() {
        this.props.form.resetFields();
        this.setState({
            visible: false,
        });
    },
    handleSubmit() {
        const obj = this.props.form.getFieldsValue();
        Action.region.insert_or_update(obj);
        this.setState({
            visible: false,
        });
    },

    render() {
        const { getFieldProps } = this.getFieldProps;
        let fieldProps = ['name', 'baiduid', 'baidupid', 'orderBy', 'parent', 'status', 'summary', '_id'].map((s) => {
            return getFieldProps(s, {});
        });
        if (this.props.opId != undefined) {
            fieldProps = ['name', 'baiduid', 'baidupid', 'orderBy', 'parent', 'status', 'summary', '_id'].map((s) => {
                if(s == 'status')
                    return getFieldProps(s, {'initialValue': this.props.opId[s]+''});
                else
                    return getFieldProps(s, {'initialValue': this.props.opId[s]});
            });
        }
        const editorForm = (
            <Form>
                <Row align='middle' gutter={16}>
                    <Col sm={10}>
                        <FormItem
                            label="名称"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            >
                            <Input placeholder="名称" size="default" type="text" autoComplete="off"
                                {...fieldProps[0]} />
                        </FormItem>
                        <FormItem
                            label="baiduid"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            >
                            <Input placeholder="baiduid" size="default" autoComplete="off" type="text" disabled={true}
                                {...fieldProps[1]} />
                        </FormItem>
                        <FormItem
                            label="baidupid"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            >
                            <Input type="textarea" placeholder="baidupid" autosize autoComplete="off" type="text"
                                   disabled={true} {...fieldProps[2]} />
                        </FormItem>
                        <FormItem
                            label="排序"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            >
                            <Input type="textarea" placeholder="排序" autosize autoComplete="off" type="text"
                                {...fieldProps[3]} />
                        </FormItem>
                    </Col>
                    <Col sm={10} offset={2}>
                        <FormItem
                            label="节点id"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            >
                            <Input placeholder="节点id" size="default" type="text" disabled={true}
                                {...fieldProps[7]} />
                        </FormItem>
                        <FormItem
                            label="父节点id"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            >
                            <Input placeholder="父节点id" size="default" type="text" disabled={true}
                                {...fieldProps[4]} />
                        </FormItem>
                        <FormItem
                            label="状态"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            >
                            <Select style={{ width: 113 }} placeholder="请选择状态"
                                {...fieldProps[5]}>
                                <Option value="1">已上线</Option>
                                <Option value="0">未上线</Option>
                            </Select>
                        </FormItem>
                        <FormItem
                            label="简介"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            >
                            <Input type="textarea" placeholder="简介" autosize {...fieldProps[6]} />
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

class Region extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.isBack = this.isBack.bind(this);
    }

    onClick(args) {
        let to_urls = FlowRouter.current().queryParams.c_path;
        let to_url;
        if (typeof to_urls != "string") {
            to_url = to_urls.shift();
            let c_url='';
            while (to_urls.length > 0) {
                c_url += '&c_path=' + to_urls.shift();
            }
            to_url += c_url;
        } else {
            to_url = to_urls;
        }
        FlowRouter.go(to_url);
    }

    isBack() {
        if (FlowRouter.current().queryParams.parent_id) {
            console.log('true');
            return "true";
        } else {
            console.log('none');
            return "none";
        }
    }

    render() {
        let rawData = this.props.regions; //.toString();
        const data = rawData;

        const columns = [{
            title: '名称',
            dataIndex: 'name',
        }, {
            title: '创建时间',
            render: function(obj) {
                return obj.createAt.toLocaleString();
            }
        },{
            title: '排序',
            dataIndex: 'orderBy',
        }, {
            title: '状态',
            render: function(r, d) {
                return r.status == 1 ? "上线" : "下线";
            }
        }, {
            title: '可转诊',
            render: function(r, d) {
                return r.isopen == 1 ? "是" : "否";
            }
        },{
            title: '区域编辑',
            render: function(obj) {
                //return "<a onclick='edit(\"" + r._id + "\")'>编辑</a>";
                return (<AddButton text='编辑' opId={obj} />);
            }
        }, {
            title: '子集',
            render: function(obj) {
                return (
                    <Button onClick={() => {
                            FlowRouter.go(`/sub_region?parent_id=${obj._id}&c_path=${FlowRouter.current().path}`);}
                        }
                        >
                        子分类
                    </Button>
                );
            }
        }];

        return (
            <Table
                title={() => <Button type="primary" style={{display: this.isBack()}} onClick={this.onClick}>
                        返回
                        </Button>}
                size='small'
                columns={columns}
                dataSource={data}
                bordered
                footer={() => <AddButton text='新增'/>}
                />
        );
    }
}

export default Region;
