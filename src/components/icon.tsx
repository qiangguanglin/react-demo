import * as Icons from '@ant-design/icons';
import React from 'react';

const IconFont = (props: {icon: string}) => {
  const { icon } = props
  const antIcon: { [key: string]: any } = Icons
  return React.createElement(antIcon[icon])
}

export default IconFont