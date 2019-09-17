import React from 'react';
import spinner from "../img/spinner.svg";


const Spinner = (props) => {
  return (
    <img className={props.className + " spinner-elem"} src={spinner} alt="data-loading" />
  )
}

export default Spinner;