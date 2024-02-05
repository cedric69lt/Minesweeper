import './styles.scss';

const Home = () => {
	return (
		<div className='gameContainer'>
			<h1 className='gameTitle'>Démineur</h1>
			<div className='settingsContainer'>
				<div className='selectorBox'>
					<p className='chooseTitle'>Choisissez la taille de la grille</p>
					<select className='parameterBox'>
						<option value='little'>Petit</option>
						<option value='medium'>Moyen</option>
						<option value='big'>Grand</option>
					</select>
				</div>
				<div className='selectorBox'>
					<p className='chooseTitle'>Choisissez votre niveau</p>
					<select className='parameterBox'>
						<option value='easy'>Facile</option>
						<option value='medium'>Moyen</option>
						<option value='hard'>Difficile</option>
					</select>
				</div>
				<button className='startGameBtn'>Commencer</button>
			</div>
		</div>
	);
};

export default Home;
