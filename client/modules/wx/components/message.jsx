import React from 'react';
import { Row, Col } from 'antd';


const iMessage = (message) => {
    return (
        <div className="message">
            <span>{message}</span>
            <div className="triangle-outer"></div>
            <div className="triangle-inner"></div>
        </div>
    );
};

class Message extends React.Component {
    constructor(props) {
        super(props);
        //console.log('!!!');
        //console.log(props);
    }

    render() {
        const i = this.props.i;
        const headimgurl = this.props.headimgurl;
        const role = this.props.role;
        let col1, col2, ret_div;
        if (i.from == 'user' && role == 'user') {
            col1 = (
                <Col span={20}>
                    <div> 我 {i.createAt.toLocaleString()}</div>
                    {iMessage(i.message)}
                </Col>
            );
            col2 = (
                <Col span={3} offset={1}>
                    <div
                        style={{
                            width: "39px",
                            height: "39px",
                            position: "relative",
                            backgroundSize: "cover",margin: "auto",
                            backgroundImage: "url("+ headimgurl +")"
                        }}
                        >
                    </div>
                </Col>
            );
            ret_div = (
                <div key={i.createAt.getTime()} style={{textAlign: "right", marginTop: "10px"}}>
                    <Row>
                        {col1}
                        {col2}
                    </Row>
                </div>
            );
        }
        if (i.from == 'user' && role == 'doctor') {
            col1 = (
                <Col span={3}>
                    <div
                        style={{
                            width: "39px",
                            height: "39px",
                            position: "relative",
                            backgroundSize: "cover",margin: "auto",
                            backgroundImage: "url("+ headimgurl +")"
                        }}
                        >
                    </div>
                </Col>
            );
            col2 = (
                <Col span={20} offset={1}>
                    <div> 患者 {i.createAt.toLocaleString()}</div>
                    {iMessage(i.message)}
                </Col>
            );
            ret_div = (
                <div key={i.createAt.getTime()} style={{marginTop: "10px"}}>
                    <Row>
                        {col1}
                        {col2}
                    </Row>
                </div>
            );
        }
        if (i.from == 'doctor' && role == 'user') {
            col1 = (
                <Col span={3}>
                    <div
                        style={{
                            width: "39px",
                            height: "39px",
                            position: "relative",
                            backgroundSize: "cover",margin: "auto",
                            backgroundImage: "url("+ headimgurl +")"
                        }}
                        >
                    </div>
                </Col>
            );
            col2 = (
                <Col span={20} offset={1}>
                    <div> 医生 {i.createAt.toLocaleString()}</div>
                    {iMessage(i.message)}
                </Col>
            );
            ret_div = (
                <div key={i.createAt.getTime()} style={{marginTop: "10px"}}>
                    <Row>
                        {col1}
                        {col2}
                    </Row>
                </div>
            );
        }
        if (i.from == 'doctor' && role == 'doctor') {
            col1 = (
                <Col span={20}>
                    <div> 我 {i.createAt.toLocaleString()} </div>
                    {iMessage(i.message)}
                </Col>
            );
            col2 = (
                <Col span={3} offset={1}>
                    <div
                        style={{
                            width: "39px",
                            height: "39px",
                            position: "relative",
                            backgroundSize: "cover",margin: "auto",
                            backgroundImage: "url("+ headimgurl +")"
                        }}
                        >
                    </div>
                </Col>
            );
            ret_div = (
                <div key={i.createAt.getTime()} style={{textAlign: "right", marginTop: "10px"}}>
                    <Row>
                        {col1}
                        {col2}
                    </Row>
                </div>
            );
        }
        return (
            ret_div
        );
    }
}

export default Message;
