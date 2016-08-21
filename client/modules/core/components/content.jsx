import React from 'react';

import { Calendar } from 'antd';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this.height = document.documentElement.clientHeight;
    }

    render() {

        const style = {height:this.height, left:100}

        return (
            <Calendar />
        );
    }
}

export default Content;
