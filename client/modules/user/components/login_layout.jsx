import React from 'react';

class LoginLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
          {this.props.content()}
      </div>
    );
  }
}

export default LoginLayout;
