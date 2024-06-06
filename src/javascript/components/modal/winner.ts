import showModal from './modal';
import createElement from '../../helpers/domHelper';
import { createFighterImage } from '../fighterPreview';
import { Fighter } from '../../services/fightersService';

export default function showWinnerModal(fighter: Fighter) {
    const title = `Fighter ${fighter.name} wins!`;

    const bodyElement = createElement({ tagName: 'div', className: 'modal-body' });
    const imageElement = createFighterImage(fighter);
    bodyElement.append(imageElement);

    const onClose = () => window.location.reload();

    showModal({ title, bodyElement, onClose });
}
