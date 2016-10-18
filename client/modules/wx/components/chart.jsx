import React from 'react';
import { Input, Button } from 'antd';


class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onClick() {
        this.props.sendMessage(this.props.wx_chart_history._id, this.state.message);
        this.setState({message: ''});
    }

    onChange(e) {
        this.setState({message: e.target.value});
    }

    render() {
        const sendButton = (
            <Button type="primary" onClick={this.onClick} size="small">发送</Button>
        );
        const messageValue = this.state ? this.state.message: '';

        const chartMessages = [];
        const messages = this.props.wx_chart_history ? this.props.wx_chart_history.messages: [];
        for(let i of messages) {
            //console.log(i);
            let chartMessage;
            if(i.from == 'user') {
                chartMessage = (
                    <div key={i.createAt.getTime()} style={{textAlign: "right"}}>
                        {i.createAt.toLocaleString()} {i.message}：我
                    </div>
                );
            } else if (i.from == 'doctor') {
                chartMessage = (
                    <div key={i.createAt.getTime()}>
                        医生：{i.message} {i.createAt.toLocaleString()}
                    </div>
                );
            }
            chartMessages.push(chartMessage);
        }

        return (
            <div>
                <div className="login-header">
                    {this.props.wx_user ? this.props.wx_user.data.nickname: '未知'}医生
                </div>
                <div className="wx-chart-login-body">
                    {chartMessages}
                </div>
                <div style={{position: 'fixed', bottom: "0px"}}>
                    <Input ref='message' placeholder="输入聊天内容" onChange={this.onChange}
                           value={messageValue} addonAfter={sendButton}/>
                </div>
            </div>
        );
    }
}

export default Chart;
