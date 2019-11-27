import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card } from 'antd';

export default class MensagemFlash extends Component {
    constructor(props){
        super(props)
        this.idsTimeouts = []
        this.animacao = ''
    }

    fechar = () => {
        this.props.atualizarMensagem( false )
    }

    limparTimeouts() {
        this.idsTimeouts.forEach( clearTimeout )
    }

    componentWillUnmount(){
        this.limparTimeouts()
    }

    componentDidUpdate( prevProps ){
        const { deveExibirMensagem, segundos } = this.props
        if ( prevProps.deveExibirMensagem !== deveExibirMensagem){
            this.limparTimeouts()
            const novoIdTimeout = setTimeout( () => {
                this.fechar()
            }, segundos * 1000)
            this.idsTimeouts.push ( novoIdTimeout )
        }
    }

    render(){
        const { deveExibirMensagem, mensagem, cor } = this.props

        if( this.animacao || deveExibirMensagem ) {
            this.animacao = deveExibirMensagem ? 'fade-in' : 'fade-out'
        }

        return <span style = {{zIndex: 10, width: "40%", marginLeft: "30%", color: "white"}} className={ `flash ${ cor } ${ this.animacao }` }>{ mensagem }</span>
    }
}

MensagemFlash.propTypes = {
    deveExibirMensagem: PropTypes.bool.isRequired,
    mensagem: PropTypes.string.isRequired,
    cor: PropTypes.oneOf( ['verde', 'vermelho'] )
}

MensagemFlash.defaultProps = {
    cor: 'verde',
    segundos: 3
}