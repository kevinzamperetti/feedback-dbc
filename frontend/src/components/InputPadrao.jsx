import React from 'react';
// import '../css/InputPadrao.css';

const InputPadrao = props => {
	const { episodio, placeholder, deveSerExibido, texto, obrigatorio, registrarNota } = props

	function criaInput() {
		return (
			obrigatorio 
				? 
					<div>
						<input className="input-nota" type="number" placeholder={placeholder} onBlur={ registrarNota }/>
						<span className="obrigatorio">* obrigatório</span>
					</div>
				: 
					<input type="number" placeholder={placeholder} onBlur={ registrarNota }/>
		)
	}

	return (
		<React.Fragment>
			<div>
				{ episodio.assistido && deveSerExibido && (
						criaInput()
				  )
				}
				{/* {
					episodio.assistido && deveSerExibido && (
						<div>
							<h4>{ texto }</h4>
							<input className="input-nota" type="number" placeholder={placeholder} onBlur={ registrarNota }/>
							{ obrigatorio ? <span className="obrigatorio">* obrigatório</span> : '' }
						</div>
					)
				} */}
			</div>
		</React.Fragment>
	)
}

export default InputPadrao;