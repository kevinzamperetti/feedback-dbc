import React, { Component } from "react"
import "../css/PaginaInicial.css"
import { Link } from 'react-router-dom'
import api from '../services/api' 
// import img from '../../img/'

import { Layout, Menu, Icon, Button } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

export default class MenuPrincipal extends Component {

  constructor( props ) {
      super( props )
      this.state = {
          nome: '',
          email: '',
          imagem: '',
          tipoUsuario: '',
          listaDeUsuarios: [],
          nomeImagem: '',
          imagemBanco: ''
      }
  }

  componentDidMount() {
      this.pegarDadosUsuarios()
      
  }

  pegarDadosUsuarios = async () => {
    const header = { headers: { Authorization : localStorage.getItem('Authorization') } } 
    const response = await api.get( '/api/usuario/todos', header)
        this.setState( { 
            listaDeUsuarios : response.data
        } )
    this.encontrarUsuario()
  }

  encontrarUsuario = async () => {
    const { listaDeUsuarios, nomeImagem } = this.state
    const email = localStorage.getItem('Email')
    const res = await listaDeUsuarios.find( usuario => usuario.email == email)
    console.log(res.imagem)
    this.setState( {
      nome: res.nome,  
      email: res.email,
      tipoUsuario: res.tipoUsuario,
      nomeImagem: res.imagem
    } )
    this.pegarImagem()
  }

  pegarImagem = async () => {
    const header = { headers: { Authorization : localStorage.getItem('Authorization') } } 
    console.log(this.state.nomeImagem)
    const response = await api.get( `/api/upload/downloadFile/${this.state.nomeImagem}`, header)
    // http://localhost:8080/api/upload/downloadFile/dog.jpg
    console.log( response )
        this.setState( { 
          imagemBanco : response.config.url
        } )
    // this.encontrarUsuario()
  }

  render() {
      const { nome, email, imagemBanco, tipoUsuario } = this.state;
      return (
        tipoUsuario === 'GESTOR'
        ? 
        <React.Fragment>
          <Menu style = {{backgroundColor: "black", width: "200px"}} theme="dark" mode="inline">
              <div className = "cardFoto">
                <img src={ imagemBanco } className = "fotoUsuario"/>
              </div>
              <p className = "nome">{nome}</p>
              <br/>
              <p className = "tipo">Gestor</p>
              <hr color = "#004f74"/>
              <p className = "gerenciamento">Gerenciamento</p>
              <Menu.Item className = "itensMenu" key="1" style = {{marginTop: 50}}>
                <Icon style = {{float: "left", marginTop: 13}} type="home"/>
                <p className="nav-text" style = {{}}><Link to = "/" style = {{color:"#979f9f", padding: 15}}>Página Inicial</Link></p>
              </Menu.Item>
              <br/>
              <Menu.Item className = "itensMenu" key="2">
                <Icon style = {{float: "left", marginTop: 13}}  type="coffee"/>
                <p className="nav-text" style = {{}}><Link to = "/listagem-projeto" style = {{color:"#979f9f", padding: 15}}>Projetos</Link></p>
              </Menu.Item>
              <Menu.Item className = "itensMenu" key="3">
                <Icon style = {{float: "left", marginTop: 13}}  type="smile" />
                <p className="nav-text" style = {{}}><Link to = "/listagem-feedback" style = {{color:"#979f9f", padding: 15}}>Feedbacks</Link></p>
              </Menu.Item>
              <Menu.Item className = "itensMenu" key="4">
                <Icon style = {{float: "left", marginTop: 13}}  type="plus"/>
                <p className="nav-text" style = {{}}><Link to = "/cadastro-projeto" style = {{color:"#979f9f", padding: 15}}>Projeto</Link></p>
              </Menu.Item>
              <Menu.Item className = "itensMenu" key="5">
                <Icon style = {{float: "left", marginTop: 13}}  type="plus" />
                <p className="nav-text" style = {{}}><Link to = "/cadastro-feedback" style = {{color:"#979f9f", padding: 15}}>Feedback</Link></p>
              </Menu.Item>
              {/* <Menu.Item key="6">
                <Icon type="bulb"/>
                <p className="nav-text" style = {{fontSize: 16}}>Badgets</p>
              </Menu.Item> */}
          </Menu>
        </React.Fragment>
        :
        <React.Fragment>
          <Menu style = {{backgroundColor: "black", textAlign: "center"}} theme="dark" mode="inline">
            <div className = "cardFoto">
              <img src={ imagemBanco } className = "fotoUsuario"/>
            </div>
            <p className = "nome">{nome}</p>
            <p className = "tipo">Funcionário</p>
            <hr color = "#004f74"/>
            <p className = "gerenciamento">Gerenciamento</p>
            <Menu.Item key="1" style = {{marginTop: 50}}>
              <Icon style = {{float: "left", marginTop: 13}} type="home"/>
              <p className="nav-text" style = {{fontSize: 16}}><Link to = "/" style = {{color:"#979f9f", padding: 15}}>Página Inicial</Link></p>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon style = {{float: "left", marginTop: 13}} type="coffee"/>
              <p className="nav-text" style = {{fontSize: 16}}><Link to = "/listagem-projeto" style = {{color:"#979f9f", padding: 15}}>Projetos</Link></p>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon style = {{float: "left", marginTop: 13}} type="smile"/>
              <p className="nav-text" style = {{fontSize: 16}}><Link to = "/listagem-feedback" style = {{color:"#979f9f", padding: 15}}>Feedbacks</Link></p>
            </Menu.Item>
          </Menu>
        </React.Fragment>
      )
  }
}