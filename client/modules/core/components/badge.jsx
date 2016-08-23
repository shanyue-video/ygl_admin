import React from 'react';

import { Table } from 'antd';
import { Modal, Button } from 'antd';
import Action from '../actions/index.js'

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
        Action.Badge.confirm(this.props.opId._id);
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

class Badge extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let rawData = this.props.applys; //.toString();
        const data = rawData;

        const columns = [{
            title: '名称',
            dataIndex: 'name',
        }, {
            title: '排序',
            dataIndex: 'orderBy',
        },{
            title: '别名',
            dataIndex: 'alias',
        },{
            title: '数量',
            dataIndex: 'num',
        },{
            title: '奖励',
            dataIndex: 'point',
        },{
            title: '说明',
            dataIndex: 'summary',
        }, {
            title: '状态',
            render: function(r) {
                return r.status == 1 ? "上线" : "下线";
            }
        }, {
            title: '操作',
            render: function(one) {
                return (<AgreeButton text='同意发放' opId={one} />);
            }
        }];

        return (
            <Table
                columns={columns}
                dataSource={data}
                bordered
                />
        );
    }
}

export default Badge;
