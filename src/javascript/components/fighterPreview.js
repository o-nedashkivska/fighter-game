import createElement, { createElementWithTextContent } from '../helpers/domHelper';

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    if (fighter) {
        const { name, health, attack, defense } = fighter;

        const imgElement = createFighterImage(fighter);

        const nameElement = createElementWithTextContent({
            tagName: 'h2',
            className: 'fighter-preview___name',
            textContent: name
        });

        const healthElement = createElementWithTextContent({
            tagName: 'p',
            textContent: `Health: ${health}`,
            className: 'fighter-preview___info-text'
        });
        const attackElement = createElementWithTextContent({
            tagName: 'p',
            textContent: `Attack: ${attack}`,
            className: 'fighter-preview___info-text'
        });
        const defenseElement = createElementWithTextContent({
            tagName: 'p',
            textContent: `Defense: ${defense}`,
            className: 'fighter-preview___info-text'
        });

        fighterElement.append(nameElement, healthElement, attackElement, defenseElement, imgElement);
    }

    return fighterElement;
}
