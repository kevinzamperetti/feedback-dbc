import React from 'react';

class SelectBox extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { value: 'select'};
  }
  onChange(e) {
    this.setState({
      value: e.target.value
    })
  }
  render() {
    return (
      <div className="form-group">
        <label htmlFor="select1" ></label>  
        <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
          <option value="select">Selecione o Tipo</option>
          <option value="Funcionario">Funcionario</option>
          <option value="Gestor">Gestor</option>
        </select>
      </div>
    )
  }
}
export default SelectBox;