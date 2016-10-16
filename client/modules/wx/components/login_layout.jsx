import React from 'react';

class LoginLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;
    }

    render() {

        let style = {
            width: this.width,
            height: this.height,
            //fontSize: 132,
        };

        var metaInfo = {name: "viewport", content: "initial-scale=1"};
        DocHead.addMeta(metaInfo);

        return (
            <div style={style}>
                {this.props.content()}
            </div>
        );
    }
}

export default LoginLayout;
