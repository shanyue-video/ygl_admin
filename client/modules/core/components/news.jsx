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
        const { title, summray, weight, detail } = this.props.form.getFieldsValue();
        const thumb = this.props.opId.thumb || $('#picture').attr("data-file");
        const createAt = new Date();
        const obj = {title, summray, weight, detail, thumb, createAt};
        if (this.props.opId == undefined) {
            //Action.Banners.insert(obj);
            alert('目前未实现新增');
        } else {
            console.log('---->');
            console.log(obj);
            console.log(this.props.opId._id);
            Action.News.update(obj, this.props.opId._id);
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
        if (this.props.opId){
            const thumb = this.props.opId.thumb;
            c.style.backgroundImage = "url(" + thumb + ")";
            console.log(c);
        }
    },

    render() {
        const { getFieldProps } = this.getFieldProps;
        let fieldProps = ['title', 'summray', 'weight', 'detail'].map((s) => {
            return getFieldProps(s, {});
        });
        if (this.props.opId != undefined) {
            fieldProps = ['title', 'summray', 'weight', 'detail'].map((s) => {
                if(s == 'status')
                    return getFieldProps(s, {'initialValue': this.props.opId[s]+''});
                else
                    return getFieldProps(s, {'initialValue': this.props.opId[s]});
            });
        }
        const editorForm = (
            <Form>
                <div ref={this.inputRef} className="ff-file">
                    <input onChange={this.onChange} type="file" id="picture" name="picture"
                        />
                </div>
                <br />
                <Row align='middle' gutter={0}>
                    <Col sm={24}>
                        <FormItem
                            label="标题"
                            labelCol={{ span: 2 }}
                            wrapperCol={{ span: 22 }}
                            >
                            <Input placeholder="文字描述" size="default" type="text" autoComplete="off"
                                {...fieldProps[0]} />
                        </FormItem>
                        <FormItem
                            label="简介"
                            labelCol={{ span: 2 }}
                            wrapperCol={{ span: 22 }}
                            >
                            <Input placeholder="排序" size="default" autoComplete="off"
                                {...fieldProps[1]} />
                        </FormItem>
                        <FormItem
                            label="权重"
                            labelCol={{ span: 2 }}
                            wrapperCol={{ span: 22 }}
                            >
                            <Input type="text" placeholder="权重" autosize autoComplete="off"
                                {...fieldProps[2]} />
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

class News extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let rawData = this.props.news; //.toString();
        const data = rawData;

        const columns = [{
            title: 'ID',
            dataIndex: '_id',
        }, {
            title: '标题',
            dataIndex: 'title',
        }, {
            title: '简介',
            dataIndex: 'summray',
        }, {
            render: function(obj) {
                //return "<a onclick='edit(\"" + r._id + "\")'>编辑</a>";
                return (<AddButton text='编辑' opId={obj} />);
            }
        }, {
            render: function(obj) {
                //return "<a onclick='del(\"" + r._id + "\")'>删除</a>";
                //return "<a onclick='del(\"" + r._id + "\")'>删除</a>";
                return (<AddButton text='删除' opId={obj} />);
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

export default News;
