import React, { Component } from 'react';
import api from '../../services/api'
import { Link } from 'react-router-dom'
import InputFiltro from '../../components/InputFiltro';
import MenuPrincipal from '../../components/MenuPrincipal';
import Util from '../../models/Util';

import { Layout, Menu, Icon, Button, Card, Avatar } from 'antd';
const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;

export default class ListagemProjeto extends Component {
  constructor( props ) {
    super( props )
    this.util = new Util();
    this.state = {
			listaDeProjetos: []
    }
  }

  componentDidMount() {
    this.carregaListaDeProjetos() &&
    this.buscaTipoUsuario()
  }

  buscaTipoUsuario = () => {
    const tipo = localStorage.getItem('TipoUsuario')
    this.setState( { tipoUsuario: tipo } )
  }

  carregaListaDeProjetos = async () => {
    const header = { headers: { Authorization: localStorage.getItem('Authorization') } }
    const response = await api.get( '/api/projeto/todos', header ) 
    this.setState( { listaDeProjetos: response.data } )
	}
	
  filtrar( evt ) {
    const listaDeProjetos = this.state.listaDeProjetos
    const pesquisa = evt.target.value
    if ( pesquisa ) {
      const filtro = listaDeProjetos.filter( projeto => projeto.nome.toLowerCase().includes( pesquisa.toLowerCase() ) || projeto.codigo == pesquisa )
      this.setState( { listaDeProjetos: filtro } )
    } else {
      this.carregaListaDeProjetos() 
    }
  }

  render() {
  const { listaDeProjetos, tipoUsuario } = this.state
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
            <Content style={{height: 533, margin: '6px 6px', overflow: 'scroll', backgroundColor: "white", textAlign: "center", paddingTop: 50 }}>
              <div id = "divCentral" style={{position:"fixed!important", top: 10, width :"100%", height: 220, textAlign: "center", paddingRight: 300, paddingLeft: 300}}>           
                  <InputFiltro filtrar={ this.filtrar.bind( this ) } placeholder="Pesquisar Projeto"/>
                  <br/>
                  <h1>Total de <span style = {{color: "#004f74"}}>Projetos</span>: { listaDeProjetos.length } </h1>
                <hr/>
                { listaDeProjetos.map( projeto => (
                  <Card style = {{border: "1px solid black", marginTop: 10, marginBottom: 10}} >
                    <article key={ projeto.id }>
                      <strong><span style = {{color: "#004f74"}}>Nome:</span> <span style = {{color: "black"}}>{ projeto.nome }</span></strong><br/>
                      <br/>
                      <strong><span style = {{color: "#004f74"}}>Gestor:</span>  <span style = {{color: "black"}}>{ projeto.usuarioGestor.nome }</span></strong> <br/>
                      <br/>
                      <strong><span style = {{color: "#004f74"}}>Cliente:</span> <span style = {{color: "black"}}>{ projeto.nomeCliente }</span></strong> <br/>
                      <br/>
                      { tipoUsuario === "GESTOR" ? <Button style = {{float: "right", border: "1px solid black"}}><Link to={ `/projeto/editar/${ projeto.id}` }>Editar</Link></Button> : '' }
                      <strong style = {{float: "left"}}><span style = {{color: "#11743c"}}>{ projeto.statusProjeto }</span></strong> <br/>
                    </article>
                  </Card> ) )
                }
              </div>
            </Content>
            <Footer className = "footer" style={{height: 8, textAlign: 'center', backgroundColor: "white"}}><p>Design ©2019 Desenvolvido pela Equipe CS!</p></Footer>
          </Layout>
        </Layout>
      </React.Fragment>
    )
  }
}
