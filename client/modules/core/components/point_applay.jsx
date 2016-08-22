import React from 'react';

import { Table } from 'antd';
import { Modal, Button } from 'antd';
import Action from '../actions/index.js'

let AgreeButton = React.createClass({
    getInitialState() {
        console.log(this.props);
        return { visible: false };
    },
    showModal() {
        this.setState({
            visible: true,
        });
    },
    handleOk() {
        //this.props.confirm(this.props.opId._id);
        console.log(Action);
        Action.PointApplay.confirm(this.props.opId._id);
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


class PointApplay extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let rawData = this.props.applys; //.toString();
        const data = rawData;

        const columns = [{
            title: '申请时间',
            dataIndex: "createAt",
            render(obj) {
                return obj.toLocaleString();
            },
        }, {
            title: '姓名',
            dataIndex: "name",
        }, {
            title: '手机号',
            dataIndex: 'tel',
        },{
            title: '开户行',
            dataIndex: 'bank',
        },{
            title: '卡号',
            dataIndex: 'num',
        },{
            title: '类型',
            dataIndex: 'type',
        }, {
            title: '金额',
            dataIndex: 'balance',
        }, {
            title: (<div style={{textAlign: 'center'}}>操作</div>),
            //dataIndex: "type",
            className: 'column-option',
            render(one) {
                if(one.check) {
                    return '已发放';
                } else {
                    return (<AgreeButton text='同意发放' opId={one} />);
                }
            },
        }];

        return (
            <Table
                //scroll={{ x: 1500, y: 300 }}
                //size="small"
                columns={columns}
                dataSource={data}
                bordered
                //title={() => '页头'}
                //footer={() => '页脚'}
                />
        );
    }
}

export default PointApplay;
