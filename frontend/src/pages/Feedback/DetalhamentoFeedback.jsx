import React, { Component } from 'react';
import api from '../../services/api'
import { Link } from 'react-router-dom'
import Util from '../../models/Util';

import { Layout, Input, Icon, Button, Card } from 'antd';
import MenuPrincipal from '../../components/MenuPrincipal';
const { TextArea } = Input;
const { Header, Content, Footer, Sider } = Layout;

export default class DetalhamentoFeedback extends Component {
  constructor( props ) {
    super( props )
    this.util = new Util()
    this.state = {
      mensagem: '',
      ultimaAtualizacao: '',
      melhorias: '',
      mensagem: '',
      comentario: [],
      usuario: '',
      projeto: '',
      feedback: '',
      usuarioGestor: '',
      nome: '',
      senha: '',
      email: '',
      imagem: '',
      tipoUsuario: '',
      listaDeUsuarios: [],
      listaComentarios: []
    }
  }

  componentDidUpdate(){

  }

  componentDidMount(){
    this.pegarDadosFeedback() &&
    this.pegarDadosUsuarios()
  }
  
  pegarDadosUsuarios = async () => {
    const header = { headers: { Authorization : localStorage.getItem('Authorization') } } 
    const response = await api.get( '/api/usuario/todos', header)
    console.log( response.data )
        this.setState( { 
            listaDeUsuarios : response.data
        } )
        this.encontrarUsuario()
}

encontrarUsuario = async () => {
    const { listaDeUsuarios } = this.state
    const email = localStorage.getItem('Email')
    console.log(email)
    const res = await listaDeUsuarios.find( usuario => usuario.email == email)
    console.log( res )
    this.setState( {
        nome: res.nome,  
        email: res.email,
        tipoUsuario: res.tipoUsuario
    } )
}

  pegarDadosFeedback = async () => {
    const { id } = this.props.match.params
    console.log( id )
    const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
    const response = await api.get( `/api/feedback/${ id }`, header )
    console.log(response.data)
    this.setState( { 
      feedback : response.data,
      mensagem : response.data.mensagem,
      ultimaAtualizacao : response.data.ultimaAtualizacao,
      projeto: response.data.projeto,
      melhorias : response.data.melhorias,
      usuario: response.data.funcionario,
      usuarioGestor: response.data.projeto.usuarioGestor,
      listaComentarios: response.data.comentarios
     })
}

cadastrarComentario() {
  const { comentario } = this.state
  const tipo = localStorage.getItem('TipoUsuario')
  const comentarioAtual = `O ${tipo == "GESTOR" ? "Gestor" : "Funcionário"} comentou: ${comentario}`
  const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
   if ( comentarioAtual , this.state.feedback ) {
     api.post( '/api/comentario/novo-comentario', {
       comentario: comentarioAtual,
       feedback: this.state.feedback
     }, header )
     .then( resp => {
       this.props.history.push( `/listagem-feedback` )
     } )
  }
}

trocaValoresState( evt ) {
  const { name, value } = evt.target
  this.setState( {
      [name]: value
  })
}

voltar() {
  this.props.history.push('/listagem-feedback')
}

  render() {
    const { feedback , projeto, melhorias, listaComentarios , tipoUsuario } = this.state
    console.log(feedback)
    return (
      <React.Fragment>
        <Layout style = {{padding: 0}}>
                    <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, backgroundColor: "black", textAlign: "center"}}>
                        <MenuPrincipal/>
                    </Sider>
                    <Layout style={{ padding: 0, marginLeft: 200, background: "linear-gradient(to right, #11743c 14%,#11743c 14%,#004f74 83%)",padding: 0, marginLeft: 200  }}>
                    <Header style={{ background: 'white'}}>
                        <h1 className = "tituloFeedBack"><span className = "feed">Feed</span><span className = "back">Back</span> DBC</h1>
                        <Button onClick = {this.util.logout.bind( this )} style = {{float: "right", marginTop: -60}} icon = "poweroff"/>
                    </Header>
                    <Content style={{height: 533, margin: '6px 6px', overflow: "scroll", backgroundColor: "white", textAlign: "center", paddingTop: 40, paddingLeft: 300, paddingRight: 300 }}>
                        <div className="info">
                        <article>
                        <p style = {{fontWeight: "bold", fontSize: 22}}>Detalhamento de <span className = "feed">Feed</span><span className = "back">Back</span></p>
                          <h4> Projeto: { projeto.nome }</h4>
                          {/* <h3> Nome do gestor: { usuarioGestor.nome }</h3>  */}
                          <h4>Cliente: { projeto.nomeCliente }</h4><br/>
                          <Card style = {{border: "none"}}>
                            {
                              melhorias.length > 0 ?
                                <React.Fragment>
                                  <h1>Pontos a melhorar:</h1>
                                  {
                                    feedback.melhorias.map((melhoria) => { 
                                      return(
                                          <Card style = {{width: 150, float: "right"}}>{melhoria}</Card>   
                                      )
                                  })
                                  }
                                </React.Fragment>
                                :
                                <span style = {{fontWeight: "bold"}}>Sem pontos adicionais a melhorar, <span style = {{color: "#004f74"}}>continue</span> <span style = {{color: "#11743c"}}>assim</span>! <Icon type = "smile"/></span>
                            }
                          </Card>
                          <br/>
                          <h1>Mensagem de FeedBack: </h1><Card>{feedback.mensagem}</Card>
                          <br/>
                          <Card>
                            <h1>Comentarios:</h1>
                            <hr/>
                            {
                              listaComentarios.length > 0 
                                ?
                                <React.Fragment>
                                  {
                                    listaComentarios.map((comentario) => { 
                                      return(
                                          <Card style = {{borderTop: "none", borderLeft: "none", borderRight: "none", boderBottom: "1px solid black"}}>{comentario.comentario}</Card> 
                                      )
                                  })
                                  }
                                </React.Fragment>
                                :
                                <Card>Não há comentarios adicionados</Card> 
                            }
                          
                          <br/>
                          <TextArea placeholder="Digite aqui o seu comentário" autosize={{ minRows: 2, maxRows: 6 }}
                                onChange={this.trocaValoresState.bind( this )} name="comentario"/>
                          <Button style = {{marginTop: 20}} onClick = {this.cadastrarComentario.bind(this)}>Adicionar comentário</Button>
                          </Card>
                        </article>   
                        { tipoUsuario === "GESTOR" ? 
                            <Button style = {{marginTop: 40, marginBottom: 20, marginLeft: -50}}>
                              <Link to={ `/cadastro-feedback` }><Icon type="plus" /></Link>
                            </Button> 
                            : 
                            '' 
                        }
                        <Button style = {{float: "left", marginTop: 40}} onClick = {this.voltar.bind(this)}><Icon type="arrow-left" /></Button>   
                      </div>  
                    </Content>
                    <Footer className = "footer" style={{height: 8, textAlign: 'center', backgroundColor: "white"}}><p>Design ©2019 Desenvolvido pela Equipe CS!</p></Footer>
                    </Layout>
                </Layout>
      </React.Fragment>      
    )
  }
}
