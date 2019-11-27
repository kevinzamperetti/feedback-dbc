import React, { Component } from "react"
import "../css/PaginaInicial.css"
import api from "../services/api";
import MenuPrincipal from "../components/MenuPrincipal"
import Util from '../models/Util';

import { Layout, Menu, Icon, Button, Card } from 'antd';
const { Header, Content, Sider, Footer } = Layout;

export default class PaginaInicial extends Component {

    constructor( props ) {
			super( props )
			this.util = new Util();
      this.state = {
				listaDeUsuarios: [],
				nome: ''
      }
    }

    componentDidMount(){
			this.pegarDadosUsuarios()
    }

    pegarDadosUsuarios = async () => {
			const header = { headers: { Authorization : localStorage.getItem( 'Authorization' ) } } 
			const response = await api.get( '/api/usuario/todos', header)
			this.setState( { 
				listaDeUsuarios : response.data
			} )
			this.encontrarUsuario()
    }

    encontrarUsuario = async () => {
			const { listaDeUsuarios } = this.state
			const email = localStorage.getItem( 'Email' )
			const res = await listaDeUsuarios.find( usuario => usuario.email === email )
			localStorage.setItem('TipoUsuario', res.tipoUsuario)
			this.setState( {
				nome: res.nome
			} )
    }

    render() {
			const { nome } = this.state;
			return (
				<React.Fragment className = "tudo">
					<Layout style = {{padding: 0}}>
						<Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, backgroundColor: "black", textAlign: "center"}}>
							<MenuPrincipal/>
						</Sider>
						<Layout style={{ background: "linear-gradient(to right, #11743c 14%,#11743c 14%,#004f74 83%)",padding: 0, marginLeft: 200  }}>
							<Header className = "header" style={{ background: 'white'}}>
								<h1 className = "tituloFeedBack"><span className = "feed">Feed</span><span className = "back">Back</span> DBC</h1>
								<Button onClick = {this.util.logout.bind( this )} style = {{float: "right", marginTop: -60}} icon = "poweroff"/>
							</Header>
							<Content className = "content" style={{height: 533, margin: '6px 6px', overflow: "scroll", backgroundColor: "white", textAlign: "center", paddingTop: 50 }}>
							<div id = "divCentral" style={{position:"fixed!important", top: 10, width :"100%", textAlign: "center", paddingRight: 300, paddingLeft: 300}}>           
								<h1 className = "boasVindas" style = {{fontSize: 22, fontWeight: "bold"}}>Boas Vindas, {nome} <br/>ao <span className = "feed">Feed</span><span className = "back">Back</span><span style = {{fontSize: 20}}> DBC</span>!</h1>
								<hr/>
								<br/>
								<Card><p>Os icones <Icon type="plus" /> são referentes aos cadastros</p></Card>
												<Card><p>Os icones <Icon type="coffee"/> são referentes aos projetos</p></Card>
												<Card><p>Os icones <Icon type="smile"/> são referentes aos feedbacks</p></Card>
												<br/>
												<p style = {{fontWeight: "bold"}}>Use o <span style = {{color: "#004f74"}}>menu</span> à esquerda da tela para <span style = {{color: "#11743c"}}>navegar</span>.</p>
												<p style = {{fontWeight: "bold"}}><span style = {{color :"#004f74"}}>#</span><span style = {{color: "#11743c"}}>NósSomosPróximos</span></p>
							</div>
							</Content>
							<Footer className = "footer" style={{height: 8, textAlign: 'center', backgroundColor: "white"}}><p>Design ©2019 Desenvolvido pela Equipe CS!</p></Footer>
						</Layout>
					</Layout>
        </React.Fragment>
        )
    }
}