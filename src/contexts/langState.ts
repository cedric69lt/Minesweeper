import { atom } from 'recoil';

export const langAtom = atom({
	key: 'lang',
	default: {
		key: null as any,
		config: null as any,
	},
});
