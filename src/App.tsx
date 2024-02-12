// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ React --------------------------------------------------------
import { useState } from 'react';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Context -------------------------------------------------------
import { RecoilRoot } from 'recoil';
// ---------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------- Components ------------------------------------------------------
import Grid from './components/Grid/Grid';
import Timer from './components/Stats/Timer/Timer';
import MinesCounter from './components/Stats/MinesCounter/MinesCounter';
import Help from './components/Help/Help';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Styles --------------------------------------------------------
import Logo from './assets/logo';
import './App.scss';
import Question from './assets/question';
// ---------------------------------------------------------------------------------------------------------------------

const App = () => {
	const [helpDisplayed, displayHelp] = useState(false);

	return (
		<div className='App'>
			<RecoilRoot>
				<div className='stats'>
					<Timer />
					<Logo className={'logo'} />
					<MinesCounter />
				</div>
				<Grid />
				<button
					className='helpButton'
					onClick={() => displayHelp(true)}
				>
					<Question />
					<span>Comment jouer</span>
				</button>
			</RecoilRoot>
			{helpDisplayed && (
				<Help
					onClose={() => {
						displayHelp(false);
					}}
				/>
			)}
		</div>
	);
};

export default App;
