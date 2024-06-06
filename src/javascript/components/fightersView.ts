import createElement from '../helpers/domHelper';
import { SelectFighterFn, createFightersSelector } from './fighterSelector';
import { Fighter } from '../services/fightersService';

function createImage(fighter: Fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter___fighter-image',
        attributes
    });

    return imgElement;
}

function createFighter(fighter: Fighter, selectFighter: SelectFighterFn) {
    const fighterElement = createElement({ tagName: 'div', className: 'fighters___fighter' });
    const imageElement = createImage(fighter);
    const onClick = (event: MouseEvent) => selectFighter(event, fighter._id);

    fighterElement.append(imageElement);
    fighterElement.addEventListener('click', onClick, false);

    return fighterElement;
}

export default function createFighters(fighters: [Fighter, Fighter]) {
    const selectFighter = createFightersSelector();
    const container = createElement({ tagName: 'div', className: 'fighters___root' });
    const preview = createElement({ tagName: 'div', className: 'preview-container___root' });
    const fightersList = createElement({ tagName: 'div', className: 'fighters___list' });
    const fighterElements = fighters.map(fighter => createFighter(fighter, selectFighter));

    fightersList.append(...fighterElements);
    container.append(preview, fightersList);

    return container;
}
