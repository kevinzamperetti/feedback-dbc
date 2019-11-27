import React, { Component } from 'react';
import api from '../../services/api'
import MenuPrincipal from "../../components/MenuPrincipal"
import Util from '../../models/Util';

import { Layout, Menu, Icon, Button, Card } from 'antd';
const { Header, Content, Sider, Footer } = Layout;

export default class EditarProjeto extends Component {
  constructor( props ) {
    super( props )
    this.util = new Util();
    this.state = {
      nome: '',
      nomeCliente: '',
      usuarioGestor: '',
      projeto: {},
      listaGestores: []
    }
  }	

  async componentDidMount() {
    this.pegarDadosGestores()
    const { id } = this.props.match.params
    const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
    const response = await api.get( `/api/projeto/${id}`, header )
    console.log( "projeto: " + response.data )
    this.setState( { 
      projeto: response.data,
      nome: response.data.nome,
      nomeCliente: response.data.nomeCliente,
      usuarioGestor: response.data.usuarioGestor
     } )
  }

  pegarDadosGestores = async () => {
		const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
		const response = await api.get( '/api/usuario/todosGestores', header )
		this.setState( { listaGestores: response.data }  )
		}

  trocaValoresState( evt ) {
    const { name, value } = evt.target
    this.setState( {
        [name]: value
    })
  }

  editar( evt ) {
    evt.preventDefault();
    const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
    const { nome, nomeCliente, projeto, usuarioGestor} = this.state
    if ( nome, nomeCliente, projeto, usuarioGestor ){
      api.put( `/api/projeto/editar/${projeto.id}`, {
        nome: nome,
        nomeCliente: nomeCliente,
        statusProjeto: "EDITADO",
        usuarioGestor: usuarioGestor
      } , header ).then( resp => {
            this.props.history.push( "/listagem-projeto" )
        })
        .catch( err => console.log( err ) )
    }
  }

  inativar( evt ) {
    evt.preventDefault();
    const header = { headers: { Authorization: localStorage.getItem('Authorization') } }
    const { nome, nomeCliente, projeto, usuarioGestor } = this.state
    if ( nome ) {
      api.put( `/api/projeto/editar/${projeto.id}`, {
        nome: nome,
        nomeCliente: nomeCliente,
        statusProjeto: "INATIVO",
        usuarioGestor: usuarioGestor
      } , header ).then( resp => {
            this.props.history.push( "/listagem-projeto" )
        })
        .catch( err => console.log( err ) )
    }
  }

  trocaValoresStateGestor( evt ) {
    let { listaGestores } = this.state
    let { name } = evt.target
    const itemID = evt.target.value
    const res = listaGestores.find( p => p.id == itemID )
    this.setState( { 
            [name] : res
    } )
}

  render() {
    const { projeto, usuarioGestor, listaGestores } = this.state
    return (
      <React.Fragment className = "tudo">
					<Layout style = {{padding: 0}}>
						<Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, backgroundColor: "black", textAlign: "center"}}>
							<MenuPrincipal/>
						</Sider>
						<Layout style={{ marginLeft: 200, background: "linear-gradient(to right, #11743c 14%,#11743c 14%,#004f74 83%)",padding: 0, marginLeft: 200  }}>
							<Header className = "header" style={{ background: 'white'}}>
								<h1 className = "tituloFeedBack"><span className = "feed">Feed</span><span className = "back">Back</span> DBC</h1>
								<Button onClick = {this.util.logout.bind( this )} style = {{float: "right", marginTop: -60}} icon = "poweroff"/>
							</Header>
							<Content style={{height: 533, margin: '6px 6px', overflow: 'scroll', backgroundColor: "white", textAlign: "center", paddingTop: 80, paddingLeft: 300, paddingRight: 300 }}>
              <Card style = {{height: 300, border: "1px solid black"}} className="info">
              <article>
                <p style = {{fontWeight: "bold"}}>Projeto: </p>
                <input type="text" name="nome" defaultValue={ projeto.nome } onChange={ this.trocaValoresState.bind( this ) }/>
                <p style = {{fontWeight: "bold"}}>Cliente: </p>
                <input type="text" name="nomeCliente" defaultValue={ projeto.nomeCliente } onChange={ this.trocaValoresState.bind( this ) }/>
                <p style = {{fontWeight: "bold"}}>Gestor: </p>
                <select name="usuarioGestor" placeholder = "Selecione um Gestor" onChange={ this.trocaValoresStateGestor.bind( this ) } style={{ width: 200 }}>
                  <option id="gestorSel" selected>Selecione um Gestor</option>
                    { listaGestores.length > 0 ?
                      <React.Fragment>
                        { listaGestores.map( ( gestor ) => { 
                          return(
                            <option id={ gestor.id } value={ gestor.id } onChange={ this.trocaValoresStateGestor.bind( this ) }>{ gestor.nome }</option>
                          )
                        } ) }
                      </React.Fragment>
                      :
                      <option value = "Não há gestores cadastrados">Não há gestores cadastrados</option>        
                    }
                </select>
              </article>
              <br/>
              <Button className = "btnEditar" style = {{float:"left"}} type="Button" onClick={this.editar.bind( this )}><Icon type="save" /></Button>          
              { projeto.statusProjeto === "ATIVO" || projeto.statusProjeto === "EDITADO"
                ?
                <Button className = "btnInativar" style = {{float:"right"}} type="button" onClick={this.inativar.bind( this )}>Inativar</Button>
                :
                <Button className = "btnInativar" style = {{float:"right"}} type="button" onClick={this.editar.bind( this )}>Ativar</Button>
              }
            </Card>  
							</Content>
							<Footer className = "footer" style={{height: 8, textAlign: 'center', backgroundColor: "white"}}><p>Design ©2019 Desenvolvido pela Equipe CS!</p></Footer>
						</Layout>
					</Layout>
        </React.Fragment>   
    )
  }
}
