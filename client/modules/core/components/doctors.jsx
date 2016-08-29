import React from 'react';

import { Table } from 'antd';

import { Modal, Button } from 'antd';

import { Form, Input, Row, Col, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import Action from '../actions/index.js'
import * as Collections from '/lib/collections';


let AddButton = React.createClass({
    //componentWillMount() {
    //    Action.Doctors.getCert(this.props.opId._id);
    //},
    getInitialState() {
        console.log(Collections.Doctors.findOne({_id: this.props.opId._id}));
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
        const thumb = $('#picture').attr("data-file");
        Action.Doctors.updateCert(this.props.opId._id, thumb);
        //if (this.props.opId == undefined) {
        //    Action.Banners.insert(obj);
        //} else {
        //    Action.Banners.update(obj, this.props.opId._id);
        //}
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
            c.style.backgroundImage = "url(" + doctor.cert + ")";
            console.log(c.style.backgroundImage);
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
        const editorForm = (
            <Form>
                <div ref={this.inputRef} className="ff-file-cert">
                    <input onChange={this.onChange} type="file" id="picture" name="picture"
                        />
                </div>
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
                return (<AddButton opId={r} text='打开'/>);
            }
        }, {
            title: '级别',
            render: function(r) {
                if(!r.master){
                    //return "<a onclick='level(\"" + r._id + "\",0)'>普通</a>";
                    return (<AddButton opId={r} text='普通'/>);
                }else{
                    //return "<a onclick='level(\"" + r._id + "\",1)'>高级</a>";
                    return (<AddButton opId={r} text='高级'/>);
                }
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
