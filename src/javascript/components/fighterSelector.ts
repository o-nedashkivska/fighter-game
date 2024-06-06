import createElement from '../helpers/domHelper';
import renderArena from './arena';
import versusImg from '../../../resources/versus.png';
import { createFighterPreview } from './fighterPreview';
import fighterService, { Fighter } from '../services/fightersService';

export type SelectFighterFn = (event: MouseEvent, fighterId: string) => Promise<void>;

const fighterDetailsMap = new Map();

export async function getFighterInfo(fighterId: string) {
    if (fighterDetailsMap.has(fighterId)) {
        return fighterDetailsMap.get(fighterId);
    }

    const fighterInfo = await fighterService.getFighterDetails(fighterId);
    fighterDetailsMap.set(fighterId, fighterInfo);

    return fighterInfo;
}

function startFight(selectedFighters: [Fighter, Fighter]) {
    renderArena(selectedFighters);
}

function createVersusBlock(selectedFighters: [Fighter?, Fighter?]) {
    const canStartFight = selectedFighters.filter(Boolean).length === 2;
    const onClick = () => startFight(selectedFighters as [Fighter, Fighter]);
    const container = createElement({ tagName: 'div', className: 'preview-container___versus-block' });
    const image = createElement({
        tagName: 'img',
        className: 'preview-container___versus-img',
        attributes: { src: versusImg }
    });
    const disabledBtn = canStartFight ? '' : 'disabled';
    const fightBtn = createElement({
        tagName: 'button',
        className: `preview-container___fight-btn ${disabledBtn}`
    });

    fightBtn.addEventListener('click', onClick, false);
    fightBtn.innerText = 'Fight';
    container.append(image, fightBtn);

    return container;
}

function renderSelectedFighters(selectedFighters: [Fighter?, Fighter?]) {
    const fightersPreview = document.querySelector('.preview-container___root') as HTMLDivElement;
    const [playerOne, playerTwo] = selectedFighters;
    const firstPreview = createFighterPreview(playerOne, 'left');
    const secondPreview = createFighterPreview(playerTwo, 'right');
    const versusBlock = createVersusBlock(selectedFighters);

    fightersPreview.innerHTML = '';
    fightersPreview.append(firstPreview, versusBlock, secondPreview);
}

export function createFightersSelector(): SelectFighterFn {
    let selectedFighters: [Fighter?, Fighter?] = [];

    return async (event, fighterId) => {
        const fighter = await getFighterInfo(fighterId);
        const [playerOne, playerTwo] = selectedFighters;
        const firstFighter = playerOne ?? fighter;
        const secondFighter = playerOne ? playerTwo ?? fighter : playerTwo;
        selectedFighters = [firstFighter, secondFighter];

        renderSelectedFighters(selectedFighters);
    };
}
