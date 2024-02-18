import { CellValue, GridType } from '../types/game';
import Bomb from '../assets/bomb.png';
import Flag from '../assets/flag.png';

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

export const getCellDisplayContent = (cell: { hidden: boolean; flag: boolean; value: CellValue }) => {
	if (cell.hidden && cell.flag) {
		return (
			<img
				src={Flag}
				alt='flag'
			/>
		);
	}

	if (!cell.hidden) {
		if (cell.value === 'bomb') {
			return (
				<img
					src={Bomb}
					alt='bomb'
				/>
			);
		}
		if (cell.value !== 'empty') {
			return cell.value;
		}
	}
};
