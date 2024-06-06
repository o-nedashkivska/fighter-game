import createElement from '../helpers/domHelper';
import attackImage from '../../../resources/attack.png';
import blockImage from '../../../resources/block.png';
import critImage from '../../../resources/crit.png';
import { FighterPosition } from '../services/fightersService';
import { Attributes } from '../helpers/domHelper';

const root = document.getElementById('root') as HTMLDivElement;

function createActionImage(position: FighterPosition, attributes: Attributes): HTMLImageElement {
    const imgElement = createElement({
        tagName: 'img',
        className: `arena___action arena___action-${position}`,
        attributes
    }) as HTMLImageElement;

    return imgElement;
}

function renderActionImage(imgElement: HTMLImageElement) {
    root.append(imgElement);
    setTimeout(() => {
        imgElement.remove();
    }, 500);
}

export function showAttackImage(position: FighterPosition) {
    const attributes = { src: attackImage, title: 'Attack', alt: 'Attack image' };
    const imgElement = createActionImage(position, attributes);

    renderActionImage(imgElement);
}

export function showBlockImage(position: FighterPosition) {
    const attributes = { src: blockImage, title: 'Block', alt: 'Block image' };
    const imgElement = createActionImage(position, attributes);

    renderActionImage(imgElement);
}

export function showCritImage(position: FighterPosition) {
    const attributes = { src: critImage, title: 'Critical attack', alt: 'Critical attack image' };
    const imgElement = createActionImage(position, attributes);

    renderActionImage(imgElement);
}
