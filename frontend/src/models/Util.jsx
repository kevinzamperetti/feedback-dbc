import api from "../services/api"

export default class Util {
  constructor() {
      this.teste = ''
  }

  // get episodiosAleatorios() {
  //     const indice = _sortear( 0, this.todos.length )
  //     return this.todos[ indice ]
  // }

  // marcarComoAssistido( episodio ) {
  //     const episodioParaMarcar = this.todos.find( e => e.nome === episodio.nome )
  //     episodioParaMarcar.assistido = true
  //     episodioParaMarcar.qtdVezesAssistido += 1
  // }

  logout() {
    localStorage.removeItem('Authorization')
    localStorage.removeItem('Email')
    localStorage.removeItem('TipoUsuario')
    this.props.history.push("/login")
  } 

  // exibirSeriesAssistidas() {
  //     let seriesAssistidas = []
  //     for (let i = 0; i < this.todos.length; i++) {
  //       if ( this.todos[i].assistido === true ) {
  //         seriesAssistidas.push(this.todos[i])
  //       }
  //     }
  //     return seriesAssistidas;
  // }

}

