// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ React --------------------------------------------------------
import { useState } from 'react';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Context -------------------------------------------------------
import { useRecoilState } from 'recoil';
import { gameStateAtom } from './contexts/gameState';
// ---------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------- Components ------------------------------------------------------
import Home from './components/Home/Home';
import Timer from './components/Stats/Timer/Timer';
import MinesCounter from './components/Stats/MinesCounter/MinesCounter';
import Grid from './components/Grid/Grid';
import Help from './components/Help/Help';
import LeaderBoard from './components/Leaderboard/Leaderboard';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Styles --------------------------------------------------------
import Logo from './assets/logo';
import Question from './assets/question';
import './App.scss';
// ---------------------------------------------------------------------------------------------------------------------

const App = () => {
	const [helpDisplayed, displayHelp] = useState(false);

	const [gameState] = useRecoilState(gameStateAtom);

	return (
		<div className='App'>
			{gameState.status === 'settings' && <Home />}
			{(gameState.status === 'idle' || gameState.status === 'playing') && (
				<>
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
					{helpDisplayed && (
						<Help
							onClose={() => {
								displayHelp(false);
							}}
						/>
					)}
				</>
			)}
			{gameState.status === 'board' && <LeaderBoard />}
		</div>
	);
};

export default App;
