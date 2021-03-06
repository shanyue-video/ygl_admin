import React from 'react';

import { Table } from 'antd';

import { Modal, Button } from 'antd';

import { Form, Input, Row, Col, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import Action from '../actions/index.js'
import * as Collections from '/lib/collections';
import lrz from 'lrz/dist/lrz.bundle.js';


let AddButton = React.createClass({
    getInitialState() {
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
        const thumb = $('#picture').attr("data-file");
        Action.Doctors.updateCert(this.props.opId._id, thumb);
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
            const doctor = Collections.Doctors.findOne({_id: this.props.opId._id});
            $(c.children[0]).attr("data-file", doctor.cert);
            c.style.backgroundImage = "url(" + doctor.cert + ")";
            //console.log(c.style.backgroundImage);
        }
    },
    render() {
        const editorForm = this.state.visible ? (
            <Form ref="form">
                <div ref={this.inputRef} className="ff-file-cert">
                    <input onChange={this.onChange} type="file" id="picture" name="picture"
                        />
                </div>
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


let EditButton = React.createClass({
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
        const { doctorName, no_id } = this.props.form.getFieldsValue();
        const obj = {doctorName, no_id};
        console.log(obj);
        Action.Doctors.updateOne(this.props.opId._id, obj);
        this.setState({
            visible: false,
        });
    },
    render() {
        const { getFieldProps } = this.getFieldProps;
        let fieldProps = ['doctorName', 'no_id'].map((s) => {
            return getFieldProps(s, {});
        });
        if (this.props.opId != undefined) {
            fieldProps = ['doctorName', 'no_id'].map((s) => {
                return getFieldProps(s, {'initialValue': this.props.opId[s]});
            });
        }
        const editorForm = this.state.visible ? (
            <Form ref="form">
                <Row align='middle' gutter={16}>
                    <Col sm={16}>
                        <FormItem
                            label="真实姓名"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            >
                            <Input placeholder="真实姓名" size="default" type="text" autoComplete="off"
                                {...fieldProps[0]} />
                        </FormItem>
                        <FormItem
                            label="身份证号"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            >
                            <Input placeholder="身份证号" size="default" autoComplete="off"
                                {...fieldProps[1]} />
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
EditButton = Form.create()(EditButton);


let ChoiceLever = React.createClass({

    handleChange(value) {
        Action.Doctors.updateMaster(this.props.obj._id, value);
    },

    render() {
        const master = this.props.obj.master.toString();
        return (
            <Select value={master} style={{ width: 100 }} onChange={this.handleChange}>
                <Option key="0" value="0">普通医师</Option>
                <Option key="1" value="1">主任医师</Option>
                <Option key="2" value="2">住院医师</Option>
                <Option key="3" value="3">主治医师</Option>
                <Option key="4" value="4">副主任医师</Option>
            </Select>
        );
    },
});


class Doctors extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let rawData = this.props.doctors; //.toString();
        const data = rawData;

        const columns = [{
            title: '地区',
            render: function(r, d) {

                return r.parentRegionName + " " + r.regionName;
            }
        }, {
            title: '医院科室',
            render: function(r, d) {

                return r.hospitalName + " " + r.departmentName + " " + r.sdepartmentName;
            }
        }, {
            title: '创建时间',
            render: function(obj) {
                return obj.createAt.toLocaleString();
            }
        },{
            title: '姓名',
            dataIndex: 'doctorName',
        },{
            title: '性别',
            dataIndex: 'sex',
        },{
            title: '医师执照',
            render: function(r) {
                //return "<a target='_blank' href='" +r.cert+ "'>打开</a>";
                if(r.cert){
                    return (<AddButton opId={r} text='打开'/>);
                } else {
                    return (<AddButton opId={r} text='未上传'/>);
                }
            }
        }, {
            title: '级别',
            render: function(r) {
                return (<ChoiceLever obj={r} />);
            }
        },{
            title: '状态',
            render: function(r, d) {
                if(r.vaild){
                    return "已认证";
                }else{
                    //return "<a onclick='pass(\"" + r._id + "\")'>待认证</a>";
                    return (<AddButton opId={r} text='待认证'/>);
                }
            }
        },{
            title: '编辑',
            render: function(r, d) {
                return (<EditButton opId={r} text='编辑'/>);
            }
        }];

        return (
            <Table
                columns={columns}
                dataSource={data}
                bordered
                //footer={() => <AddButton text='新增'/>}
                footer={() => ''}
                />
        );
    }
}

export default Doctors;
