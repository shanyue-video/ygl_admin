import React from 'react';

import UserAvatar from './user_avatar'
import Navigations from './navigations'

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
                        <Navigations />
                    </div>
                </div>
            </div>
        );
    }
}

export default MainLayout;
