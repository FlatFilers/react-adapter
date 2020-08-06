import * as React from 'react';

const Button: any = (props: any) => {
  return <button onClick={props.clickFunction}>{props.text}</button>;
};

export default Button;
