import './App.scss';
import Grid from './components/Grid/Grid';
import Timer from './components/Timer/Timer';

const App = () => {
	return (
		<div className='App'>
			<Timer />
			<Grid />
		</div>
	);
};

export default App;
