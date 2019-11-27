import React, { Component } from 'react';
import api from '../../services/api'
import '../geral-detalhes.css'
export default class Elfo extends Component {
    constructor(props){
        super(props)
        this.state = {
           nome: '',
             status: 'RECEM_CRIADO',
             qtdVida: '',
             experiencia: '',
            qtdExperienciaPorAtaque: '',
             dano: ''
        }
        this.trocaValoresState = this.trocaValoresState.bind( this )
    }
    trocaValoresState( evt ) {
        const { name, value } = evt.target
        this.setState( {
            [name]: value
        } )
    }
    cadastrar( evt ) {
        evt.preventDefault();
       const { nome, qtdVida, experiencia, dano  } = this.state
       const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        if ( nome && qtdVida && experiencia && dano ){
            api.post( '/api/elfo/novo', {
               nome: this.state.nome,
               status: this.state.status,
               qtdVida: this.state.qtdVida,
               experiencia: this.state.experiencia,
               dano: this.state.dano
            }, header )
             .then( resp => {
               this.props.history.push( "/" )
             } )
       }
    }
    render( ) {
        return  (
            <React.Fragment>
            <strong className="login" >Insira os dados para cadastrar um novo Elfo</strong>
            <div className="div-login">
                <span>Nome: </span>
                <input className="input-login" type="text" name="nome" id="nome" placeholder="Digite o nome do Elfo" onChange={this.trocaValoresState} />
                <span>Vida: </span>
                <input className="input-login" type="text" name="qtdVida" id="qtdVida" placeholder="Digite o nome do Elfo" onChange={this.trocaValoresState} />
                <span>Experiência: </span>
                <input className="input-login" type="text" name="experiencia" id="experiencia" placeholder="Digite o nome do Elfo" onChange={this.trocaValoresState} />
                <span>Dano: </span>
                <input className="input-login" type="text" name="dano" id="dano" placeholder="Digite o nome do Elfo" onChange={this.trocaValoresState} />
                    
                 <button className="button-login" type="button" onClick={ this.cadastrar.bind( this ) } >Cadastrar</button>
            </div>
            </React.Fragment>
        )
    }
}