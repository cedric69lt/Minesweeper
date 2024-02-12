const Clock = (props: any) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 512 512'
			{...props}
		>
			<path
				d='M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z'
				fill='none'
				stroke='currentColor'
				strokeMiterlimit='10'
				strokeWidth='32'
			/>
			<path
				fill='none'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='32'
				d='M256 128v144h96'
			/>
		</svg>
	);
};

export default Clock;
