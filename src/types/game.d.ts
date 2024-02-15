export type Difficulty = 'beginner' | 'intermediate' | 'expert';
export type CellValue = 'empty' | 'bomb' | number;
export type GridType = { hidden: boolean; value: CellValue; flag: boolean }[][];
export type LeaderBoardItem = { date: string; time: `${number | ''}${number}m ${number}${number}s` };
