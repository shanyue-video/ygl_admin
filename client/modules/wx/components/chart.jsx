import React from 'react';
import { Input } from 'antd';


class Chart extends React.Component {
    constructor(props) {
        super(props);
        //console.log(props);
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <div className="login-header">
                    {this.props.wx_user ? this.props.wx_user.data.nickname: '未知'}医生
                </div>
                <div className="wx-page-login-body">
                </div>
                <Input style={{position: 'fixed', bottom: "0px"}} placeholder="输入聊天内容" />
            </div>
        );
    }
}

export default Chart;
