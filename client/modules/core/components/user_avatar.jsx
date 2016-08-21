import React from 'react';
import { Badge } from 'antd';

class UserAvatar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      backgroundImage: 'url(' + this.props.bg + ')',
    };
    return (
        <div className="avatar" style={style}>
          <Badge count={5}>
          </Badge>
        </div>
    );
  }
}

export default UserAvatar;
