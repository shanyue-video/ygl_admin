import React from 'react';
import { Menu, Icon } from 'antd';
import {FlowRouter} from '../../../configs/context.js';

class Navigations extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    onClick(args) {
        const {item, key, keyPath} = args;
        console.log(item);
        console.log(key);
        console.log(keyPath);
        this.props.urlGo(key);
    }

    render() {
        return (
            <Menu theme='dark' onClick={this.onClick}>
                <Menu.Item key="pointApplay">{<span><Icon type="mail" /><span>提现申请</span></span>}</Menu.Item>
                <Menu.Item key="badge">{<span><Icon type="mail" /><span>成就管理</span></span>}</Menu.Item>
                <Menu.Item key="banners">{<span><Icon type="mail" /><span>轮播广告</span></span>}</Menu.Item>
                <Menu.Item key="discuz">{<span><Icon type="mail" /><span>讨论管理</span></span>}</Menu.Item>
                <Menu.Item key="doctor">{<span><Icon type="mail" /><span>医生管理</span></span>}</Menu.Item>
                <Menu.Item key="members">{<span><Icon type="mail" /><span>用户管理</span></span>}</Menu.Item>
                <Menu.Item key="news">{<span><Icon type="mail" /><span>新闻资讯</span></span>}</Menu.Item>
                <Menu.Item key="recommand">{<span><Icon type="mail" /><span>标签推荐</span></span>}</Menu.Item>
                <Menu.Item key="referral">{<span><Icon type="mail" /><span>转诊单管理</span></span>}</Menu.Item>
                <Menu.Item key="region">{<span><Icon type="mail" /><span>地区管理</span></span>}</Menu.Item>
                <Menu.Item key="visits">{<span><Icon type="mail" /><span>随访模版</span></span>}</Menu.Item>
            </Menu>
        );
    }
}

export default Navigations;
