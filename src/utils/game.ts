import { Difficulty, CellValue, GridType } from '../types/game';
import { getRandomArbitrary } from './generics';

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

export const genBombs = (grid: GridType, difficulty: Difficulty) => {
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

	for (let i = 0; i <= bombs; i++) {
		let needRegenerate = false;

		do {
			const row = getRandomArbitrary(0, grid.length);
			const col = getRandomArbitrary(0, grid.length);
			let bombsArounds = 0;

			for (let testRowIndex = -1; testRowIndex <= 1; testRowIndex++) {
				const testedRow = row + testRowIndex;

				if (testedRow < 0) continue;
				if (testedRow >= grid.length) continue;

				for (let testColIndex = -1; testColIndex <= 1; testColIndex++) {
					const testedCol = col + testColIndex;

					if (testedCol < 0) continue;
					if (testedCol >= grid.length) continue;
					if (testedRow === row && testedCol === col) continue;

					if (grid[testedRow][testedCol].value === 'bomb') {
						bombsArounds++;

						if (bombsArounds > 3) {
							needRegenerate = true;
							break;
						}
					}
				}

				if (needRegenerate) break;
			}

			if (bombsArounds <= 3) {
				grid[row][col].value = 'bomb';
			}
		} while (needRegenerate);
	}

	return grid;
};

export const genNumbers = (grid: GridType): GridType => {
	for (let row = 0; row < grid.length; row++) {
		for (let col = 0; col < grid[row].length; col++) {
			let bombsArounds = 0;

			checkAroundCell(grid, row, col, (testedCell: { hidden: boolean; value: CellValue }, testedRow: number, testedCol: number) => {
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

export const checkAroundCell = (grid: GridType, row: number, col: number, callback: Function): void => {
	for (let testRowIndex = -1; testRowIndex <= 1; testRowIndex++) {
		const testedRow = row + testRowIndex;

		if (testedRow < 0) continue;
		if (testedRow >= grid.length) continue;

		for (let testColIndex = -1; testColIndex <= 1; testColIndex++) {
			const testedCol = col + testColIndex;

			if (testedCol < 0) continue;
			if (testedCol >= grid.length) continue;
			if (testedRow === row && testedCol === col) continue;

			callback(grid[testedRow][testedCol], testedRow, testedCol);
		}
	}
};

export const discoverAroundCell = (grid: GridType, rowIndex: number, colIndex: number): GridType => {
	grid[rowIndex][colIndex].hidden = false;

	checkAroundCell(grid, rowIndex, colIndex, (cell: { hidden: boolean; value: CellValue; flag: boolean }, testedRowIndex: number, testedColIndex: number) => {
		if (!cell.flag && cell.hidden) {
			if (cell.value === 'empty') {
				grid = discoverAroundCell(grid, testedRowIndex, testedColIndex);
			} else if (typeof cell.value === 'number') {
				grid[testedRowIndex][testedColIndex].hidden = false;
			}
		}
	});

	return grid;
};

export const revealAllGrid = (grid: GridType, excludeGoodFlags: boolean = true) => {
	return grid.map((row) => {
		return row.map((col) => {
			if (excludeGoodFlags && col.value === 'bomb' && col.flag) {
				return col;
			}
			return {
				...col,
				hidden: false,
				flag: false,
			};
		});
	});
};
