import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import '../../css/section.css';
import '../../css/CadastroFeedback.css'
import api from '../../services/api'
import MenuPrincipal from '../../components/MenuPrincipal';
import Util from '../../models/Util';

import { Layout, Menu, Icon, Button, Card, Input, Cascader, Checkbox } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;
const { TextArea } = Input;

export default class CadastroFeedback extends Component {
    constructor(props){
			super(props)
			this.util = new Util()
			this.state = {
				listaProjetos: [],
				projeto: '',
				listaFuncionarios: [],
				funcionario: '',
				listaMelhorias:["COMUNICACAO", "ASSIDUIDADE", "LOGICA", "ATENCAO"],
				listaMelhoriasSelecionadas: [],
				melhorias: [],
				res: [],
				mensagem: '',
                ultimaAtualizacao: '',
                email: localStorage.getItem('Email'),
                novaMelhoria: ''
			}
    }

    componentDidMount() {
        this.pegarDadosProjetos() &&
        this.pegarDadosFuncionarios() &&
        this.cadastrarFeedback() &&
        this.pegarDadosUsuarios()
    }
    
    pegarDadosUsuarios = async () => {
			const header = { headers: { Authorization : localStorage.getItem('Authorization') } } 
			const response = await api.get( '/api/usuario/', header)
			this.setState( { listaDeUsuarios : response.data } )
			this.encontrarUsuario()
    }

    encontrarUsuario = async () => {
			const { listaDeUsuarios, email } = this.state
			const res = await listaDeUsuarios.find( usuario => usuario.email == email)
			this.setState( {
				nome: res.nome,  
				email: res.email,
				tipoUsuario: res.tipoUsuario
			} )
    }

    pegarDadosProjetos = async () => {
        const { email } = this.state
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        const response = await api.get( '/api/projeto/todos', header )
        const lista = response.data
        const listaFiltrada = lista.filter(projeto => projeto.usuarioGestor.email == email)
        this.setState( { listaProjetos: listaFiltrada }  )
    }

    pegarDadosFuncionarios = async () => {
    const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
    const response = await api.get( '/api/usuario/todosFuncionarios', header )
    this.setState( { listaFuncionarios: response.data }  )
    }

    trocaValoresStateProjeto(evt) {
        let {listaProjetos} = this.state
        let {name} = evt.target
        const itemID = evt.target.value
        const res = listaProjetos.find(p => p.id == itemID)
        console.log(itemID, res, name)
         this.setState(({ 
                [name] : res
            }  ));
    }

    trocaValoresState( evt ) {
        const { name, value } = evt.target
        this.setState( {
            [name]: value
        } )
    }

    trocaValoresStateFuncionario(evt) {
        let {listaFuncionarios} = this.state
        let {name} = evt.target
        const itemID = evt.target.value
        const res = listaFuncionarios.find(p => p.id == itemID)
        console.log(itemID, res, name)
         this.setState(({ 
                [name] : res
            }  ));
    }
        
    trocaValoresMelhoriaState( evt ) {
        const { name, value } = evt.target
        const { listaMelhorias, listaMelhoriasSelecionadas } = this.state
        const melhoriaSelecionada = value
        const res = listaMelhorias.find( p => p === melhoriaSelecionada )
        listaMelhoriasSelecionadas.push( res )
        this.setState( {
            [name]: listaMelhoriasSelecionadas
        } )
    }

    cadastrarMelhoria(){
        const { novaMelhoria, listaMelhorias } = this.state
        const novaMelhoriaUpperCase = novaMelhoria.toUpperCase()
        console.log(novaMelhoriaUpperCase)
        listaMelhorias.push(novaMelhoriaUpperCase)
        this.setState( {
            listaMelhorias
        } )
    }

    cadastrarFeedback() {
       const { mensagem, projeto, funcionario, melhorias } = this.state
       const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        if ( mensagem, projeto, funcionario) {
					api.post( '/api/feedback/novo-feedback', {
						mensagem,
						ultimaAtualizacao: Date.now(),
						projeto: projeto,
						funcionario,
						melhorias
					}, header )
					.then( resp => {
						this.props.history.push( "/listagem-feedback" )
          } )
       }
    }

    render() {
        const {listaFuncionarios, listaMelhorias, listaProjetos } = this.state
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
                            <div id = "divCentral" style={{position:"fixed!important", top: 10, width :"100%", height: 220, textAlign: "center", paddingRight: 300, paddingLeft: 300}}>           
                            {/* <Card style = {{border: "1px solid black", textAlign: "center", width: "50%"}}> */}
                            <h1 style = {{fontWeight: "bold", fontSize: 22}}>Cadastrar <span style = {{color: "#004f74"}}>Feed</span><span style = {{color: "#11743c"}}>back</span></h1>

                                <hr/>
                                <br/>
                                <select name="projeto" onChange={this.trocaValoresStateProjeto.bind(this)}>
                                    <option id="projetoSel" selected>Selecionar projeto</option>
                                        { listaProjetos.length > 0 ?
                                            <React.Fragment>
                                                { listaProjetos.map( ( projeto ) => { 
                                                    return(
                                                            <option id={projeto.id} value={projeto.id} onChange={this.trocaValoresStateProjeto.bind(this)}>{projeto.nome}</option>    
                                                    ) } )
                                                }
                                            </React.Fragment>
                                        :
                                        <option>Não existem projetos cadastrados</option>        
                                        }
                                </select>
                                <br/>
                                <br/>
                                <select name="funcionario" placeholder = "Selecione um funcionário" onChange={this.trocaValoresStateFuncionario.bind(this)}>
                                    <option id="funcionarioSel" selected>Selecionar funcionário</option>
                                        { listaFuncionarios.length > 0 ?
                                                <React.Fragment>
                                                        { listaFuncionarios.map( ( funcionario ) => { 
                                                            return(
                                                                    <option id={funcionario.id} value={funcionario.id} onChange={this.trocaValoresStateFuncionario.bind(this)}>{funcionario.nome}</option>    
                                                            ) } )
                                                        }
                                                </React.Fragment>
                                        :
                                        <option>Não existem funcionários cadastrados</option>        
                                        }
                                </select>
                            
                                <form>
                                    <div style={{ margin: '24px 0' }} />
                                    <p style = {{fontWeight: "bold"}}>Seu <span style = {{color: "#004f74"}}>feed</span><span style = {{color: "#11743c"}}>back</span>:</p>
                                    <TextArea placeholder="Digite aqui o seu feedback" autosize={{ minRows: 2, maxRows: 6 }}
                                                        onChange={this.trocaValoresState.bind( this )} name="mensagem"/>
                                </form>
                                { listaMelhorias.length > 0 ?
                                    <React.Fragment>
                                        <Card style = {{border: "none"}}>
                                            <p style = {{fontWeight: "bold"}}>Melhorias <span style = {{color: "#004f74"}}>pré</span> cadastradas:</p>
                                            { listaMelhorias.map( ( melhoria ) => { 
                                                return( 
                                                    <Card style = {{width: "50%", float: "right"}}>
                                                        {melhoria}
                                                        <Checkbox style = {{float: "right"}} value={melhoria} name="melhorias" onChange={this.trocaValoresMelhoriaState.bind( this )}></Checkbox><br/>
                                                    </Card>
                                                ) } )
                                            }
                                        </Card>
                                    </React.Fragment> 
                                :
                                    <span>Não existem melhorias cadastradas</span>
                                }
                                <Card style = {{border: "none"}}>
                                    <p style = {{fontWeight: "bold"}}>Adicionar ponto de melhoria <span style = {{color: "#004f74"}}>específico</span> para este funcionário:</p>
                                    <br></br>
                                    <input type="text" placeholder="Digite a nova melhoria" name="novaMelhoria" onChange={this.trocaValoresState.bind(this)} style = {{width: 200}}></input>
                                    <br></br>
                                    <Button style = {{marginTop: 20}} className="buttonFeedback" type="button" onClick={this.cadastrarMelhoria.bind(this)}>Cadastrar Melhoria</Button>
                                </Card>   
                                <hr/>                             
                                <Button style = {{marginTop: 20}} className="buttonFeedback" type="button" onClick={this.cadastrarFeedback.bind( this )}><Icon type="plus" /></Button>
                            {/* </Card> */}
                            </div>
                        </Content>
                        <Footer className = "footer" style={{height: 8, textAlign: 'center', backgroundColor: "white"}}><p>Design ©2019 Desenvolvido pela Equipe CS!</p></Footer>
                    </Layout>
                </Layout>
            </React.Fragment>
		)   
    }
}   