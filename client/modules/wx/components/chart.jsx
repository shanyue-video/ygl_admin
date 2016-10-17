import React from 'react';
import { Input, Button } from 'antd';


class Chart extends React.Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onClick() {
        //var inputValue = this.refs.["message"].getDOMNode().value;
        //var inputValue = input.value;
        console.log(this.state.message);
        console.log(this.props.wx_chart_history._id);
        this.props.sendMessage(this.props.wx_chart_history._id, this.state.message);
    }

    onChange(e) {
        //var inputValue = this.refs.["message"].getDOMNode().value;
        //var inputValue = input.value;
        this.setState({message: e.target.value});
    }

    render() {
        //console.log(this.props);

        const sendButton = (
            <Button type="primary" onClick={this.onClick} size="small">发送</Button>
        );

        return (
            <div>
                <div className="login-header">
                    {this.props.wx_user ? this.props.wx_user.data.nickname: '未知'}医生
                </div>
                <div className="wx-page-login-body">
                </div>
                <div style={{position: 'fixed', bottom: "0px"}}>
                    <Input ref='message' placeholder="输入聊天内容" onChange={this.onChange}
                           addonAfter={sendButton}/>
                </div>
            </div>
        );
    }
}

export default Chart;
