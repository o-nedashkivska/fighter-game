import createElement from '../helpers/domHelper';
import attackImage from '../../../resources/attack.png';
import blockImage from '../../../resources/block.png';
import critImage from '../../../resources/crit.png';

const root = document.getElementById('root');

function createActionImage(position, attributes) {
    const imgElement = createElement({
        tagName: 'img',
        className: `arena___action arena___action-${position}`,
        attributes
    });

    return imgElement;
}

function renderActionImage(imgElement) {
    root.append(imgElement);
    setTimeout(() => {
        imgElement.remove();
    }, 500);
}

export function showAttackImage(position) {
    const attributes = { src: attackImage, title: 'Attack', alt: 'Attack image' };
    const imgElement = createActionImage(position, attributes);

    renderActionImage(imgElement);
}

export function showBlockImage(position) {
    const attributes = { src: blockImage, title: 'Block', alt: 'Block image' };
    const imgElement = createActionImage(position, attributes);

    renderActionImage(imgElement);
}

export function showCritImage(position) {
    const attributes = { src: critImage, title: 'Critical attack', alt: 'Critical attack image' };
    const imgElement = createActionImage(position, attributes);

    renderActionImage(imgElement);
}
