import React from 'react';
import './styles.scss';

const arrayBoard = [
	{ date: '12/06/2014', time: '1.06' },
	{ date: '12/06/2014', time: '1.06' },
	{ date: '12/06/2014', time: '1.06' },
	{ date: '12/06/2014', time: '1.06' },
	{ date: '12/06/2014', time: '1.06' },
	{ date: '12/06/2014', time: '1.06' },
	{ date: '12/06/2014', time: '1.06' },
	{ date: '12/06/2014', time: '1.06' },
	{ date: '12/06/2014', time: '1.06' },
	{ date: '12/06/2014', time: '1.06' },
	{ date: '12/06/2014', time: '1.06' },
	{ date: '12/06/2014', time: '1.06' },
	{ date: '12/06/2014', time: '1.06' },
	{ date: '12/06/2014', time: '1.06' },
	{ date: '12/06/2014', time: '1.06' },
];

const LeaderBoard = () => {
	return (
		<div className='boardContainer'>
			<p className='titleBoard'>Time Leaderboard</p>
			<div className='completeBoard'>
				<div className='lineInfo'>
					<p className='infoDate'>Day</p>
					<p className='infoScore'>Time</p>
				</div>

				<div className='containerLittle'>
					{arrayBoard.map((item, index) => {
						return (
							<div
								className='lineBoard'
								key={index}
							>
								<p className='blockDate'>{item.date}</p>
								<p className='blockScore'>{item.time}</p>
							</div>
						);
					})}
					;
				</div>
			</div>
		</div>
	);
};

export default LeaderBoard;
