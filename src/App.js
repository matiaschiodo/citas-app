import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita'

function App() {

	let citasIniciales = JSON.parse(localStorage.getItem('citas'));
	if(!citasIniciales) {
		citasIniciales = [];
	}

	const [ citas, setCitas ] = useState(citasIniciales);

	useEffect(() => {
		let citasIniciales = JSON.parse(localStorage.getItem('citas'));

		if(citasIniciales) {
			localStorage.setItem('citas', JSON.stringify(citas));
		} else {
			localStorage.setItem('citas', JSON.stringify([]));
		}
	}, [citas])

	const crearCita = cita => {
		setCitas([
			...citas,
			cita
		])
	};

	const eliminarCita = id => {
		const newCitas = citas.filter(cita => cita.id !== id);
		setCitas(newCitas);
	};

	const title = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

    return (
        <>
			<h1>Administrador de pacientes</h1>

			<div className="container">
				<div className="row">
					<div className="one-half column">
						<Formulario
							crearCita={crearCita}
						/>
					</div>
					<div className="one-half column">
						<h2>{title}</h2>
						{citas.map(cita => (
							<Cita
								key={cita.id}
								cita={cita}
								eliminarCita={eliminarCita}
							/>
						))}
					</div>
				</div>
			</div>
		</>
    );
}

export default App;
