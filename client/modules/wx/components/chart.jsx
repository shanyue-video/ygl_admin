import React from 'react';
import Message from './message.jsx';
import { Input, Button } from 'antd';
import {animateScroll} from 'react-scroll/lib/index.js';


class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onChange = this.onChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentWillUpdate = this.componentWillUpdate.bind(this);
    }

    onClick() {
        this.props.sendMessage(this.props.wx_chart_history._id, this.state.message, this.props.role);
        this.setState({message: ''});
    }

    componentDidMount() {
        animateScroll.scrollToBottom();
    }

    componentDidUpdate() {
        animateScroll.scrollToBottom();
    }

    componentWillUpdate() {
        animateScroll.scrollToBottom();
    }

    onFocus() {
        this.setState({fixed: 'fixed'});
        animateScroll.scrollToBottom();
    }

    onChange(e) {
        animateScroll.scrollToBottom();
        this.setState({message: e.target.value});
    }

    render() {
        const sendButton = (
            <Button type="primary" onClick={this.onClick} size="small">发送</Button>
        );
        const messageValue = this.state ? this.state.message: '';

        const chartMessages = [];
        const messages = this.props.wx_chart_history.messages ? this.props.wx_chart_history.messages: [];
        for(let i of messages) {
            let chartMessage;
            if(i.from == 'user') {
                if (this.props.role != 'doctor') {
                    let headimgurl = this.props.wx_user.data.headimgurl;
                    headimgurl = headimgurl ? headimgurl: '/avatar.png';
                    chartMessage = (
                        <Message key={i.createAt.getTime()} i={i} headimgurl={headimgurl} role={this.props.role}/>
                    );
                } else {
                    let headimgurl = this.props.wx_user.data.headimgurl;
                    headimgurl = headimgurl ? headimgurl: '/avatar.png';
                    chartMessage = (
                        <Message key={i.createAt.getTime()} i={i} headimgurl={headimgurl} role={this.props.role}/>
                    );
                }
            } else if (i.from == 'doctor') {
                if (this.props.role != 'doctor') {
                    let headimgurl = this.props.wx_user.doctor_data.headimgurl;
                    headimgurl = headimgurl ? headimgurl: '/avatar.png';
                    chartMessage = (
                        <Message key={i.createAt.getTime()} i={i} headimgurl={headimgurl} role={this.props.role}/>
                    );
                } else {
                    let headimgurl = this.props.wx_user.doctor_data.headimgurl;
                    headimgurl = headimgurl ? headimgurl: '/avatar.png';
                    chartMessage = (
                        <Message key={i.createAt.getTime()} i={i} headimgurl={headimgurl} role={this.props.role}/>
                    );
                }
            }
            chartMessages.push(chartMessage);
        }

        var user_name = '';
        if (this.props.wx_user) {
            if (this.props.role == 'doctor') {
                user_name = this.props.wx_user.data.nickname;
            } else {
                user_name = this.props.wx_user.doctor_data.nickname;
            }
        }

        return (
            <div>
                <div className="wx-chart-header" style={{position: "fixed"}}>
                    {user_name}
                    {this.props.role == 'doctor' ? '患者': '医生'}
                </div>
                <div className="wx-chart-login-body">
                    {chartMessages}
                </div>
                <div id='input' style={{position: 'fixed', bottom: "0px"}}>
                    <Input ref='message' placeholder="输入聊天内容" onChange={this.onChange} onFocus={this.onFocus}
                           value={messageValue} addonAfter={sendButton}/>
                </div>
            </div>
        );
    }
}

export default Chart;
