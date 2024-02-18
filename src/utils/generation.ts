import { getRandomArbitrary } from './generics';
import { Difficulty, CellValue, GridType } from '../types/game';
import { checkAroundCell } from './gameInteractions';

export const genGrid = (size: number): GridType => {
	let grid: GridType = Array.apply(null, Array(size)).map(() => {
		return Array.apply(null, Array(size)).map(() => {
			return {
				hidden: true,
				value: 'empty',
				flag: false,
			};
		});
	});

	return grid;
};

const genBombs = (grid: GridType, difficulty: Difficulty) => {
	const surface = grid.length * grid.length;

	let bombs = 0;
	if (difficulty === 'beginner') {
		bombs = surface * 0.05;
	} else if (difficulty === 'intermediate') {
		bombs = surface * 0.1;
	} else if (difficulty === 'expert') {
		bombs = surface * 0.15;
	}

	bombs = Math.floor(bombs);

	for (let i = 1; i <= bombs; i++) {
		let needRegenerate = false;

		do {
			const row = getRandomArbitrary(0, grid.length);
			const col = getRandomArbitrary(0, grid.length);

			let bombsArounds = 0;

			if (grid[row][col].value === 'bomb') {
				continue;
			}

			checkAroundCell(grid, row, col, (cell: { hidden: boolean; flag: boolean; value: CellValue }) => {
				if (cell.value === 'bomb') {
					bombsArounds++;
				}
			});

			if (bombsArounds <= 3) {
				grid[row][col].value = 'bomb';
				needRegenerate = false;
			}
		} while (needRegenerate);
	}

	return { grid: grid, bombsCount: bombs };
};

const genNumbers = (grid: GridType): GridType => {
	for (let row = 0; row < grid.length; row++) {
		for (let col = 0; col < grid[row].length; col++) {
			if (grid[row][col].value === 'bomb') {
				continue;
			}

			let bombsArounds = 0;

			checkAroundCell(grid, row, col, (testedCell: { hidden: boolean; value: CellValue }) => {
				if (testedCell.value === 'bomb') {
					bombsArounds++;
				}
			});

			if (bombsArounds > 0) {
				grid[row][col].value = bombsArounds;
			}
		}
	}

	return grid;
};

export const startGame = (size: number, difficulty: Difficulty, needEmpty: boolean = true, rowIndex?: number, colIndex?: number): { grid: GridType; bombsCount: number } => {
	let grid = genGrid(size);

	if (needEmpty) {
		if (rowIndex === undefined || rowIndex < 0 || rowIndex >= size) {
			throw Error('Missing rowIndex and/or colIndex parameters.');
		} else if (colIndex === undefined || colIndex < 0 || colIndex >= size) {
			throw Error('Missing rowIndex and/or colIndex parameters.');
		}

		let bombsCount = 0;

		do {
			grid = genGrid(size);
			const { grid: bombsGrid, bombsCount: bombsCountFromGen } = genBombs(grid, difficulty as Difficulty);
			grid = genNumbers(bombsGrid);

			bombsCount = bombsCountFromGen;
		} while (grid[rowIndex][colIndex].value !== 'empty');

		return { grid, bombsCount };
	}

	const { grid: bombsGrid, bombsCount } = genBombs(grid, difficulty);
	grid = genNumbers(bombsGrid);

	return { grid, bombsCount };
};
