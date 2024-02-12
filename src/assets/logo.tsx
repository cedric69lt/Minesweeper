const Logo = (props: any) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 512 512'
			{...props}
		>
			{/* Edges */}
			<path
				d='M256 32 l0 448 M32 256 l448 0 M112 112 l286 286 M400 112 L112 400'
				stroke='currentColor'
				strokeLinecap='round'
				strokeMiterlimit='10'
				strokeWidth={32}
			/>
			{/* Main circle */}
			<circle
				cx={256}
				cy={256}
				r={150}
				fill='currentColor'
			/>
			{/* Light on main circle */}
			<circle
				cx={206}
				cy={206}
				r={40}
				fill='#ffffff'
			/>
		</svg>
	);
};

export default Logo;
