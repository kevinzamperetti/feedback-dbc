import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import '../../css/section.css';
import api from '../../services/api'
import MenuPrincipal from '../../components/MenuPrincipal';
import Util from '../../models/Util';

import { Layout, Menu, Icon, Button, Card, Avatar, Select } from 'antd';
const { Meta } = Card;
const { Option } = Select
const { Header, Content, Footer, Sider } = Layout;

export default class CadastroProjeto extends Component {
	constructor(props){
		super(props)
		this.util = new Util()		
		this.state = {
			nomeProjeto: '',
			nomeCliente: '',
			listaGestores: [],
			usuarioGestor: ''
		}        
	}

	componentDidMount() {
		this.pegarDadosGestores()
	  }	

	pegarDadosGestores = async () => {
		const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
		const response = await api.get( '/api/usuario/todosGestores', header )
		this.setState( { listaGestores: response.data }  )
		}

	trocaValoresState( evt ) {
		const { name, value } = evt.target;
		this.setState( {
			[name] : value,      
		} )
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

	cadastrarProjeto( evt ) {
		evt.preventDefault();
		const { nomeProjeto, nomeCliente, usuarioGestor } = this.state
		const header = { headers: { Authorization: localStorage.getItem('Authorization') } }
		if ( nomeProjeto, nomeCliente ) {
			api.post( '/api/projeto/novo', {
				nome: nomeProjeto,
				nomeCliente: nomeCliente,
				usuarioGestor: usuarioGestor,
				statusProjeto: "ATIVO"
			}, header )
			.then( resp => {
				this.props.history.push( "/listagem-projeto" )
			} )
			// .catch
		}
	}
	
	render() {
		const { listaGestores } = this.state
		return (
      <React.Fragment>
        <Layout style = {{padding: 0}}>
          <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, backgroundColor: "black", textAlign: "center"}}>
					<MenuPrincipal/>
          </Sider>
          <Layout style={{ background: "linear-gradient(to right, #11743c 14%,#11743c 14%,#004f74 83%)",padding: 0, marginLeft: 200 }}>
          <Header style={{ background: 'white'}}>
              <h1 className = "tituloFeedBack"><span className = "feed">Feed</span><span className = "back">Back</span> DBC</h1>
              <Button onClick = {this.util.logout.bind( this )} style = {{float: "right", marginTop: -60}} icon = "poweroff"/>
              <Button style = {{float: "right", marginTop: -60, marginRight: 40}}><Link to = "/"><Icon type="home" /></Link></Button>
          </Header>
          <Content style={{height: 533, margin: '6px 6px', overflow: 'scroll', backgroundColor: "white" }}>
          <div id = "divCentral" style={{position:"fixed!important", top: 10, width :"100%", height: 220, textAlign: "center", paddingRight: 360, paddingLeft: 360}}>
						<h1 style = {{fontSize: 22}}>Cadastrar <span style = {{color: "#11743c"}}>Projeto</span>:</h1>
						<hr/>
						<br/>
						<Card>
							<input type="text" placeholder="Digite o nome do projeto" name="nomeProjeto" onChange={this.trocaValoresState.bind(this)} style = {{width: 200}}></input>
							<br/>
							<br/>
							<input style = {{marginBottom: 40}} type="text" placeholder="Digite o nome do cliente" name="nomeCliente" onChange={this.trocaValoresState.bind(this)} style = {{width: 200}}></input>
							<br/>
							<br/>
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
						</Card>
						<br/>
						<hr/>
						<Button style = {{marginTop: 30}} type="submit" onClick={ this.cadastrarProjeto.bind( this ) }><Icon type="plus" /></Button>
          </div>
          </Content>
          <Footer className = "footer" style={{height: 8, textAlign: 'center', backgroundColor: "white"}}><p>Design ©2019 Desenvolvido pela Equipe CS!</p></Footer>
          </Layout>
        </Layout>
      </React.Fragment>
		)
	}

}