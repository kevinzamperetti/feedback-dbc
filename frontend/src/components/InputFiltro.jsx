import React, { Component } from 'react';
import { Icon } from 'antd';


export default class InputFiltro extends Component {

  constructor( props ) {
      super( props )
  }

  render() {
    const { filtrar, placeholder } = this.props
    return (
      <React.Fragment>
        <div className="div-input">
        <Icon type="search" />
          <input type="text" className="input" placeholder={ placeholder } onChange={ filtrar.bind( this ) }/>
        </div>
      </React.Fragment>
    )
  }
}