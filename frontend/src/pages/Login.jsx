import React, { Component } from "react"
import { Link } from 'react-router-dom';
import "../css/Login.css"
import "../css/Util.css"
import api from '../services/api'

import { Layout, Menu, Icon, Button, Card } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

export default class Login extends Component {

		constructor( props ){
			super( props )
			this.state = {
				email : '',
				senha : ''
				
			}
			this.trocaValoresState = this.trocaValoresState.bind( this )
		}

		trocaValoresState( evt ) {
			const { name, value } = evt.target;
			console.log( name, value )
			this.setState( {
				[name] : value      
			} )
		}
		
		logar( evt ) {
			evt.preventDefault();
			const { email, senha } = this.state
			if ( email  && senha ) {
				console.log( email, senha )
				api.post( '/login', {
						email:   this.state.email,
						senha : this.state.senha
				} ).then ( resp => {
					  console.log( "resp: " + resp.headers.authorization );
					  localStorage.setItem( 'Authorization' , resp.headers.authorization ) 
					  localStorage.setItem('Email', email )
						this.props.history.push('/')     
					} )
					// .catch( erro ) 
			}
		}
		
		render() {
			return (
				<React.Fragment>
					<div style = {{background: "linear-gradient(to right, #11743c 14%,#11743c 14%,#004f74 83%)", height: "100vh", width: "100%", paddingTop: 100, paddingRight: 300, paddingLeft: 300, textAlign: "center"}}>
						<Card className = "cardLogin" style = {{border: "1px solid black", textAlign: "center", width: "100%"}} className = "cardLogin">
							<h3  className = "tituloFeedBackLogin" style = {{fontWeight: "bold", float: "left"}}><span className = "spanTitulo" style = {{color: "#004f74"}}>Feed</span><span className = "spanTitulo" style = {{color: "#11743c"}}>Back</span> DBC</h3>
							<br/>
							<br/>
							<p className = "tituloLogin" style = {{fontWeight: "bold"}}>LOGIN</p>
							<br/>
							<div className = "cardInputs">
								<div>
									<label style = {{fontWeight: "bold"}}>E-mail</label>
								<br/>
								<input className = "inputEmail" placeholder = "Ex: nome.s@dbccompany.com.br" name = "email" id = "email" className = "inputEmail" onChange={ this.trocaValoresState }/>
								</div>
								<br/>
								<hr className = "hrGambi" style = {{border: "white"}}/>
								<br/>
								<label className = "labelSenha" style = {{fontWeight: "bold"}}>Senha</label>
								<br/>
								<input className = "inputSenha" placeholder = "&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" type = "password" name = "senha" id = "senha" className = "inputSenha" onChange={ this.trocaValoresState }/>
								<br/>
								<br/>
								<hr className = "hrGambi" style = {{border: "white"}}/>
								<Button className = "btnLogar" type="button" onClick={this.logar.bind( this )}><Icon className = "iconeLogin" type="login" /></Button>
							</div>
							<br/>
							<Link className = "linkCadastro" to="/cadastro-usuario">Ainda <span style = {{color: "#004f74"}}>não</span> tem <span style = {{color: "#11743c"}}>cadastro</span>?</Link>
							<br/>
							<p className = "marcaDAgua" style = {{float: "right"}}>© Equipe CS!</p>
						</Card>
					</div>
				</React.Fragment>
			)
		}
	}
	
