const Size = (props: any) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 512 512'
			{...props}
		>
			<path
				fill='none'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='32'
				d='M304 96h112v112M405.77 106.2L111.98 400.02M208 416H96V304'
			/>
		</svg>
	);
};

export default Size;
