import React, { Component } from 'react';
import api from '../../services/api'
import { Link } from 'react-router-dom'
import InputFiltro from '../../components/InputFiltro';
import MenuPrincipal from '../../components/MenuPrincipal';
import Util from '../../models/Util';

import { Layout, Menu, Icon, Button, Card, Avatar } from 'antd';
import moment from 'moment';
const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;

export default class ListagemFeedback extends Component {
  constructor( props ) {
    super( props )
    this.util = new Util()
    this.state = {
      listaDeFeedback: [],
      nome: '',
      senha: '',
      email: '',
      imagem: '',
      tipoUsuario: '',
      listaDeUsuarios: [],
      listaDatas: []
    }
  }

  //ação logo que o componente é exibido em tela
  componentDidMount() { 
    this.pegarDadosUsuarios() &&
    this.carregalistaDeFeedback() &&
    this.pegarDadosFeedback()
  }

  pegarDadosUsuarios = async () => {
    const header = { headers: { Authorization : localStorage.getItem('Authorization') } } 
    const response = await api.get( '/api/usuario/todos', header)
    this.setState( { listaDeUsuarios : response.data } )
    this.encontrarUsuario()
  }

  encontrarUsuario = async () => {
    const { listaDeUsuarios } = this.state
    const email = localStorage.getItem('Email')
    const res = await listaDeUsuarios.find( usuario => usuario.email === email)
    this.setState( {
      nome: res.nome,  
      email: res.email,
      tipoUsuario: res.tipoUsuario
    } )
  }

  carregalistaDeFeedback = async () => {
    const header = { headers: { Authorization: localStorage.getItem('Authorization') } }
    const response = await api.get( '/api/feedback/todos', header )
    const lista = response.data

    lista.sort(function (a, b){
      if( a.ultimaAtualizacao < b.ultimaAtualizacao){
        return 1;
      }
      if (a.ultimaAtualizacao > b.ultimaAtualizacao) {
        return -1;
      }
      return 0;
    })

    this.setState( { listaDeFeedback: lista }  )
  }

  pegarDadosFeedback = async () => {
    const { tipoUsuario, email } = this.state
    const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
    const response = await api.get( '/api/feedback/todos', header )
    const lista = response.data
    let listaFiltrada = []
   
    if ( this.state.tipoUsuario === 'FUNCIONARIO' ) {
      listaFiltrada = lista.filter( feedback => feedback.funcionario.email === this.state.email )
    } else {
      listaFiltrada = lista
    }
    this.setState( { listaDeFeedback: listaFiltrada }  )
  }

  filtrar( evt ) {
    const listaDeFeedback = this.state.listaDeFeedback
    const pesquisa = evt.target.value
    if ( pesquisa ) {
      const filtro = listaDeFeedback.filter( feedback => feedback.mensagem.toLowerCase().includes( pesquisa.toLowerCase() ) || feedback.id == pesquisa )
      this.setState( { listaDeFeedback: filtro } )
    } else {
      this.carregalistaDeFeedback()
    }
  }

  render() {
    const { listaDeFeedback } = this.state
    return (
      <React.Fragment>
        <Layout style = {{padding: 0}}>
          <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, backgroundColor: "black", textAlign: "center"}}>
            <MenuPrincipal/>
          </Sider>
          <Layout style={{ padding: 0, marginLeft: 200, background: "linear-gradient(to right, #11743c 14%,#11743c 14%,#004f74 83%)" }}>
          <Header style={{ background: 'white'}}>
              <h1 className = "tituloFeedBack"><span className = "feed">Feed</span><span className = "back">Back</span> DBC</h1>
              <Button onClick = {this.util.logout.bind( this )} style = {{float: "right", marginTop: -60}} icon = "poweroff"/>
              <Button style = {{float: "right", marginTop: -60, marginRight: 40}}><Link to = "/"><Icon type="home" /></Link></Button>
          </Header>
          <Content style={{height: 533, margin: '6px 6px', overflow: "scroll", backgroundColor: "white", textAlign: "center", paddingTop: 50, paddingLeft: 300, paddingRight: 300 }}>
            <InputFiltro filtrar={ this.filtrar.bind( this ) } placeholder="Pesquisar Feedback"/>
            <br/>
            <h1>Total de <span style = {{color: "#004f74"}}>Feed</span><span style = {{color: "#11743c"}}>Backs</span>: { this.state.listaDeFeedback.length } </h1>
            <hr/>
            <div className="lista">
              { listaDeFeedback.map( feedback => (
                <Card style = {{border: "1px solid black", marginTop: 10, marginBottom: 10}} >
                  <article key={ feedback.id }>
                    <strong>{ feedback.mensagem }</strong> <br/>
                    <br/>
                    <hr/>
                    <strong><span style = {{color: "#004f74"}}>Ultima Atualização:</span> <span style = {{color: "#11743c"}}>{ moment( feedback.ultimaAtualizacao ).format( "DD/MM/YYYY HH:mm" ) }</span></strong><br/>
                    <br/>
                    <Button style = {{float: "right", border: "1px solid black"}}><Link to={ `/detalhamento-feedback/${ feedback.id }` }>Detalhamento</Link></Button>
                  </article>
                  </Card>
                ) )
              }
            </div>
            <hr/>
          </Content>
          <Footer className = "footer" style={{height: 8, textAlign: 'center', backgroundColor: "white"}}><p>Design ©2019 Desenvolvido pela Equipe CS!</p></Footer>
          </Layout>
      </Layout>

      </React.Fragment>
    )
  }
}
