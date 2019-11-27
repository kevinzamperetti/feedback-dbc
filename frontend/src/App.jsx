import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {PrivateRoute} from './components/PrivateRoute'
import './App.css';
import Login from "../src/pages/Login"
import PaginaInicial from "../src/pages/PaginaInicial"
import CadastroUsuario from './pages/CadastroUsuario';

// import EditarFeedback from './pages/Feedback/EditarFeedback';
import CadastroFeedback from './pages/Feedback/CadastroFeedback';
import DetalhamentoFeedback from './pages/Feedback/DetalhamentoFeedback';
import ListagemFeedback from './pages/Feedback/ListagemFeedback';

import EditarProjeto from './pages/Projeto/EditarProjeto';
import CadastroProjeto from './pages/Projeto/CadastroProjeto';
import ListagemProjeto from './pages/Projeto/ListagemProjeto';


function App() {
 return (
   <Router>
     <PrivateRoute exact path="/" component={ PaginaInicial } />
     <Route path = "/login" component={ Login } />
     <Route path = "/cadastro-usuario" exact component={ CadastroUsuario } />
     <PrivateRoute path = "/cadastro-projeto" exact component={ CadastroProjeto } />
     <PrivateRoute path = "/listagem-projeto" exact component={ ListagemProjeto } />     
     <PrivateRoute path="/projeto/editar/:id" exact component={ EditarProjeto } />

     <PrivateRoute path = "/cadastro-feedback" exact component={ CadastroFeedback } />
     <PrivateRoute path = "/listagem-feedback" exact component={ ListagemFeedback } />
     <PrivateRoute path = "/detalhamento-feedback/:id" exact component={ DetalhamentoFeedback } />  

    
   </Router>
 );
}
export default App;