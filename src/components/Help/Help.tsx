// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Assets --------------------------------------------------------
import Close from '../../assets/close';
import './styles.scss';
// ---------------------------------------------------------------------------------------------------------------------

const Help = ({ onClose }: { onClose: () => void }) => {
	return (
		<div
			className='helpContainer'
			onClick={onClose}
		>
			<div
				className='helpPopup'
				onClick={(ev) => ev.stopPropagation()}
			>
				<div className='header'>
					<p className='headerTitle'>Comment jouer ?</p>
					<button
						className='closeButton'
						onClick={onClose}
					>
						<Close />
					</button>
				</div>
				<div className='content'>
					<p>
						Pour commencer, il suffit de cliquer n'importe où sur la grille.
						<br />
						Les cases vides vont alors se dévoiler jusqu'à atteindre les cases contenant des numéros.
						<br />
						<br />
						Chaque numéro indique que dans les 8 cases autour de celle-ci, il y a X bombes (numéro affiché).
						<br />
						Le but est de dévoiler toute la grille sans faire exploser une bombe en cliquant dessus.
						<br />
						<br />
						Pour éviter tout accident, vous pouvez poser un drapeau sur les cases où vous pensez qu'il y a une bombe en faisant clic droit. Le clic sera alors désactivé jusqu'à ce que vous retiriez le drapeau.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Help;
