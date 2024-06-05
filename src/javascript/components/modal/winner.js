import showModal from './modal';
import { createFighterImage } from '../fighterPreview';

export default function showWinnerModal(fighter) {
    const title = `Fighter ${fighter.name} wins!`;
    const bodyElement = createFighterImage(fighter);
    const onClose = () => window.location.reload();

    showModal({ title, bodyElement, onClose });
}
