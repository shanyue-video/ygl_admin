import React from 'react';

import UserAvatar from './user_avatar'

class MainLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="layout-navi">
                    <a className="user" href="/logout">
                        <UserAvatar bg='http://m.yigonglue.com:3000/avatar.png' />
                    </a>
                    <div>
                        {this.props.navigations()}
                    </div>
                </div>
                <div className="layout-main">
                    {this.props.content()}
                </div>
            </div>
        );
    }
}

export default MainLayout;
