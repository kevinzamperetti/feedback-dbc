import React, { Component } from "react"
import ReactPasswordStrength from 'react-password-strength';
import api from '../services/api'
import MensagemFlash from '../components/MensagemFlash';
import MensagemFlashConst from '../components/MensagemFlashConst';
import "../css/Util.css"

import "../css/CadastroUsuario.css";
import "../css/Flash.css";

import { Layout, Menu, Icon, Button, Card, Upload, message } from 'antd';
const { Header, Content, Footer, Sider } = Layout;


export default class CadastroUsuarios extends Component {
  constructor( props ){
    super( props )
    this.state = {
      nome : '',
      email : '',
      senha : '',
      tipoUsuario : '',
      imagem: '',
      exibirMensagem: false,
      mensagem: '',
      deveExibirErro: false,
      nomedaImgem: ''
    }
  }

  trocaValoresStateSenha = state =>
    this.setState({ senha: state.password })

  trocaValoresState( evt ) {
    const { name, value } = evt.target
    // this.validarEmail( evt )
    this.setState( {
      [name]: value
    })
  }

  onChange(e) {
    this.setState({
    value: e.target.value
    })
  }

  exibirMensagem = ( { cor, mensagem } ) => {
    this.setState( {
      cor,
      mensagem,
      exibirMensagem: true
    } )
    setTimeout( () => {
      this.pararDeExibir()
    }, 3000)
  }

  pararDeExibir() {
    this.setState( {
      exibirMensagem: false
    } )
  }

  atualizarMensagem = devoExibir => {
    this.setState( {
      exibirMensagem: devoExibir
    } )
  }

  trocaValoresStateImagem = evt => {
    console.log( evt.target.files[0] )
    const arquivo = Array.from( evt.target.files )
    const formData = new FormData()
    formData.append( "file", arquivo[0] )
    this.setState( {
      imagem: formData,
      nomedaImgem: arquivo[0].name
    } )
  }

  async salvarImagem( id, file ) {
    const header = { headers: { Authorization: localStorage.getItem('Authorization'), 'Content-type': 'multipart/form-data' } }
    await api.post(`/api/upload/uploadFile/${id}`, file )
    .then( resp =>
      console.log( resp.data )
      //this.props.history.push( "/login" )
    )
    // .catch( err ) {
    //   this.props.history.push( "/login" )
    .catch( erro => this.props.history.push( "/login" ) )
  }

  cadastrar( evt ) {
    evt.preventDefault();
    const { nome, email, senha, tipoUsuario, imagem, nomedaImgem } = this.state
    let cor, mensagem
    if ( nome && email && senha && tipoUsuario ) {
      api.post( '/api/usuario/novo', {
        nome: nome,
        senha: senha,
        email: email,
        imagem: nomedaImgem,
        tipoUsuario: tipoUsuario.toUpperCase()
      } ).then( resp => {
            console.log( resp )
            this.salvarImagem(resp.data.id, imagem)
        //this.props.history.push( "/login" )
        })
        .catch( erro => console.log( "Erro: " + erro ) )
    } else {
      cor = 'vermelho'
      mensagem = MensagemFlashConst.ERRO.PREENCHER_TODOS_CAMPOS
      this.exibirMensagem( { cor, mensagem } )
    }
  }

  validarSenha( evt ) {
    evt.preventDefault();
    const {senha } = this.state
    const senhaConfirma = evt.target.value
    let cor, mensagem
    if ( senha !== senhaConfirma ) {
      cor = 'vermelho'
      mensagem = MensagemFlashConst.ERRO.SENHA_DIFERENTE
    }
    this.exibirMensagem( { cor, mensagem } )
  }
  
  voltar() {
    this.props.history.push("/login")
  }

  render() {
    const inputProps = { placeholder: "Senha", autoFocus: true, className: 'inputCadSenha' }
    const { cor, mensagem, exibirMensagem } = this.state;
      return(
          <React.Fragment className = "cardCadUserPrincipal">
          <MensagemFlash atualizarMensagem = { this.atualizarMensagem } animacao = { true } 
                              deveExibirMensagem = { exibirMensagem } cor = { cor } mensagem = {mensagem}/>
          <div style = {{background: "linear-gradient(to right, #11743c 14%,#11743c 14%,#004f74 83%)", height: "100vh", width: "100%", paddingTop: 80, paddingRight: 300, paddingLeft: 300, textAlign: "center"}}>
            <Card style = {{border: "1px solid black", height: "80vh", textAlign: "center", width: "100%"}}>
              <h3 className = "tituloFeedBackCadastro" style = {{fontWeight: "bold", float: "left"}}><span className = "spanTitulo" style = {{color: "#004f74"}}>Feed</span><span className = "spanTitulo" style = {{color: "#11743c"}}>Back</span> DBC</h3>
              <br/>
              <br/>
              <p className = "tituloCadastro" style = {{letterSpacing: 2, fontWeight: "bold"}}>CADASTRO</p>
              <Card style = {{border: "none", width: "100%"}}>
                <Card className = "cardDireito" style = {{float: "right"}}>
                  <p>Tipo do usuário:</p>
                  <select className = "selectionCadastro" style = {{marginBottom: 75}} name="tipoUsuario" onChange={ this.trocaValoresState.bind( this ) }  placeholder="Tipo">
                    <option id="tipoUsuarioSel" value="" selected >Selecionar</option>
                    <option id="tipoUsuarioFun" value="FUNCIONARIO" >Funcionario</option>
                    <option id="tipoUsuarioGes" value="GESTOR" >Gestor</option>
                  </select>
                  <p>Upload da foto de perfil:</p>
                  <label style = {{cursor: "pointer"}} for = "fotoPerfil"><Card style = {{height: 50, width: 50, border: "1px solid black", borderRadius: 40, marginLeft: 110}}></Card></label>
                  <input id = "fotoPerfil" style = {{display: "none"}} type="file" onChange = { this.trocaValoresStateImagem.bind( this ) } ></input>
                </Card>
                <Card className = "cardEsquerdo" style = {{float: "left", textAlign: "center"}}>
                  <input placeholder = "Nome Completo"  name = "nome" id="nome" onChange={ this.trocaValoresState.bind( this ) }/>
                  <br/>
                  <br/>
                  <input style = {{padding: 5}} placeholder = "@dbccompany.com.br" name = "email" id="email" onChange={ this.trocaValoresState.bind( this ) }/>
                  <br/>
                  <MensagemFlash/>
                  <ReactPasswordStrength ref={ref => this.ReactPasswordStrength = ref}
                                        className = "cardSenha"
                                        minLength = { 6 }
                                        inputProps = { { ...inputProps, id: 'senha' } }
                                        changeCallback = { this.trocaValoresStateSenha.bind( this ) }>
                  </ReactPasswordStrength>
                  <br/>
                  <input style = {{padding: 5}} placeholder = "Confirmar Senha" type = "password" name ="confirmaSenha" id="confirmaSenha" onBlur={ this.validarSenha.bind(this)}/>
                </Card>
              </Card>
              <Button className = "btnCadastrar" style = {{ height: 40, width: 50, marginRight: 50, marginTop: 10 }} type="button" onClick={this.cadastrar.bind( this )}><Icon type="user-add" /></Button>  
              <Button className = "btnVoltar" style = {{height: 40, width: 50, float: "left", marginTop: 10}} onClick = {this.voltar.bind(this)}><Icon type="arrow-left" /></Button>
            </Card>
          </div>
        </React.Fragment>
      )
    }
}
