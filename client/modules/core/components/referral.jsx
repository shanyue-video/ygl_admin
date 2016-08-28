import React from 'react';

import { Table } from 'antd';
import { Modal, Button } from 'antd';

import { Form, Input, Row, Col, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import Action from '../actions/index.js'
import lrz from 'lrz/dist/lrz.bundle.js';


let AddButton = React.createClass({

    componentWillMount() {
        console.log('!!!');
        const i = this.props.opId.master.sdepartment;
        const j = 'x8gC3Ggbwfwzkgy5Y';
        if(this.props.doctors) {
            this.l = this.props.doctors.filter((o) => {return o.sdepartment == j});
        }
    },
    getInitialState() {
        //console.log(this.props.opId.master.sdepartment);

        //const i = this.props.opId.master.sdepartment;
        ////console.log(i);
        ////console.log(this.props.doctors);
        ////console.log(this.props.doctors.find((o) => {
        ////    return o._id == i;
        ////}));
        //const j = 'x8gC3Ggbwfwzkgy5Y';
        //if(this.props.doctors) {
        //    /*
        //    console.log(this.props.doctors.filter((o) => {
        //        //console.log(o);
        //        //console.log(i);
        //        return o.sdepartment == j;
        //    }));
        //    */
        //    //this.l = this.props.doctors.filter((o) => {return o.sdepartment == j});
        //    const l = this.props.doctors.filter((o) => {return o.sdepartment == j});
        //    this.l = l;
        //}

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
            Action.Banners.update(obj, this.props.opId._id);
        }
        this.setState({
            visible: false,
        });
    },
    render() {

        const { getFieldProps } = this.getFieldProps;
        //const l = this.l;
        console.log(this.l);

        let fieldProps = getFieldProps('choice', {});
        let option_o;

        if (this.props.opId != undefined && this.l != undefined) {
            //fieldProps = ['desc', 'orderBy', 'detail', 'group', 'status'].map((s) => {
            //    if(s == 'status')
            //        return getFieldProps(s, {'initialValue': this.props.opId[s]+''});
            //    else
            //        return getFieldProps(s, {'initialValue': this.props.opId[s]});
            //});
            //<Option value="0">待选择</Option>
            //<Option value="1">已上线</Option>
            //    <Option value="2">未上线</Option>
            //    <Option value="3">未上线</Option>
            //    <Option value="4">未上线</Option>
            //    <Option value="5">未上线</Option>
            //    <Option value="6">未上线</Option>
            //    <Option value="7">未上线</Option>
            fieldProps = getFieldProps('choice', {'initialValue': '0'});
            const opthions = this.l.map((o) => {
                return (<Option value={o._id}>{o.doctorName}</Option>);
            });
            option_o = (
                <Select placeholder="请选择医生"
                    {...fieldProps}>
                    <Option value="0">待选择</Option>
                    {opthions}
                </Select>
            );
        } else {
            fieldProps = getFieldProps('choice', {'initialValue': '0'});
            option_o = (
                <Select placeholder="选择医生"
                    {...fieldProps}>
                    <Option value="0">待选择</Option>
                </Select>
            );
        }
        const editorForm = (
            <Form>
                <Row align='middle'>
                    <Col sm={24}>
                        <FormItem
                            label="请选择医生"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            >
                                {option_o}
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

class Referral extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let rawData = this.props.referrals; //.toString();
        const data = rawData;

        const doctors = this.props.doctors;

        const columns = [{
            title: '创建时间',
            render: function(obj) {
                return obj.createAt.toLocaleString();
            }
        }, {
            title: '接诊',
            render: function(r) {
                return [r.master.parentRegionName, r.master.regionName, r.master.hospitalName, r.master.departmentName, r.master.sdepartmentName].join(" ");
            }
        }, {
            title: '接诊医生',
            dataIndex: 'master.name',
        }, {
            title: '上转',
            render: function(r) {
                return [r.creater.parentRegionName, r.creater.regionName, r.creater.hospitalName, r.creater.departmentName, r.creater.sdepartmentName].join(" ");
            }
        }, {
            title: '上转医生',
            dataIndex: 'creater.name',
        }, {
            title: '患者',
            dataIndex: 'person.name',
        }, {
            title: '患者',
            dataIndex: 'reason',
        }, {
            render: function(r) {
                if (!r.checkPay) {
                    return "未付款";
                } else if (!r.checkAdmin) {
                    //return "<a onclick='jz(\"" + r._id + "\")'>未指定</a>";
                    return (<AddButton text='未指定' opId={r} doctors={doctors} />);
                } else if (r.checkRef) {
                    //return "<a onclick='jz(\"" + r._id + "\")'>已拒绝</a>";
                    return (<AddButton text='已拒绝' opId={r} />);
                } else if (!r.checkMaster) {
                    //return "<a onclick='jz(\"" + r._id + "\")'>未确认</a>";
                    return (<AddButton text='未确认' opId={r} />);
                } else if (!r.checkCase) {
                    return "未就诊";
                } else if (!r.checkVisit) {
                    return "未回转";
                } else if (!r.checkComp) {
                    return "未完成";
                }

            }
        }];

        return (
            <Table
                columns={columns}
                dataSource={data}
                bordered
                footer={() => ''}
                />
        );
    }
}

export default Referral;
