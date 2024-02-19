import { useRecoilState } from 'recoil';
import { langAtom } from '../../contexts/langState';

import fr from '../../assets/fr.png';
import en from '../../assets/en.png';
import './styles.scss';

const LangToggler = () => {
	const [lang, setLang] = useRecoilState(langAtom);

	return (
		<button
			className='langToggler'
			onClick={() => {
				if (lang.key === 'fr') {
					localStorage.setItem('lang', 'en');
					setLang((prev) => ({
						...prev,
						key: 'en',
					}));
				} else {
					localStorage.setItem('lang', 'fr');
					setLang((prev) => ({
						...prev,
						key: 'fr',
					}));
				}
			}}
		>
			{lang.key == 'fr' ? (
				<img
					src={fr}
					alt='fr flag'
				/>
			) : (
				<img
					src={en}
					alt='en flag'
				/>
			)}
		</button>
	);
};

export default LangToggler;
