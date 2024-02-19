// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ React --------------------------------------------------------
import { useEffect, useState } from 'react';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Context -------------------------------------------------------
import { useRecoilState } from 'recoil';
import { gameStateAtom } from './contexts/gameState';
import { langAtom } from './contexts/langState';
// ---------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------- Components ------------------------------------------------------
import Home from './components/Home/Home';
import Timer from './components/Stats/Timer/Timer';
import MinesCounter from './components/Stats/MinesCounter/MinesCounter';
import Grid from './components/Grid/Grid';
import Help from './components/Help/Help';
import LeaderBoard from './components/Leaderboard/Leaderboard';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Langs --------------------------------------------------------
import frConf from './langs/fr.json';
import enConf from './langs/en.json';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Styles --------------------------------------------------------
import Logo from './assets/logo';
import './App.scss';
import LangToggler from './components/LangToggler/LangToggler';
// ---------------------------------------------------------------------------------------------------------------------

const App = () => {
	const [helpDisplayed, displayHelp] = useState(false);

	const [gameState] = useRecoilState(gameStateAtom);
	const [lang, setLang] = useRecoilState(langAtom);

	useEffect(() => {
		const storedLang = localStorage.getItem('lang');

		if (storedLang === null) {
			localStorage.setItem('lang', 'fr');
			setLang({
				key: 'fr',
				config: frConf,
			});
			return;
		}

		if (storedLang === 'fr') {
			setLang({
				key: 'fr',
				config: frConf,
			});
			return;
		}

		setLang({
			key: 'en',
			config: enConf,
		});
	}, [lang.key]);

	if (lang.config) {
		return (
			<div className='App'>
				<LangToggler />
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
							<span>{lang.config.how}</span>
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
	}

	return <></>;
};

export default App;
