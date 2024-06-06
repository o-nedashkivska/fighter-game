import controls from '../../constants/controls';
import { showAttackImage, showBlockImage, showCritImage } from './arenaActions';
import { reduceHealthBar, playerOneCriticalHitAvailable, playerTwoCriticalHitAvailable } from './fightUtils';
import { Fighter } from '../services/fightersService';

interface EventKeys {
    [key: string]: boolean;
}

export function getHitPower(fighter: Fighter) {
    const criticalHitChance = Math.random() + 1;
    const power = fighter.attack * criticalHitChance;
    return power;
}

export function getBlockPower(fighter: Fighter) {
    const dodgeChance = Math.random() + 1;
    const power = fighter.defense * dodgeChance;
    return power;
}

export function getDamage(attacker: Fighter, defender: Fighter) {
    const damage = getHitPower(attacker) - getBlockPower(defender);
    return damage < 0 ? 0 : damage;
}

function getTotalDamage(attacker: Fighter, defender: Fighter, withBlock: boolean) {
    if (withBlock) {
        return getDamage(attacker, defender);
    }
    return getHitPower(attacker);
}

function getCritDamage(fighter: Fighter) {
    return 2 * fighter.attack;
}

export async function fight(firstFighter: Fighter, secondFighter: Fighter): Promise<Fighter> {
    return new Promise(resolve => {
        let firstFighterCurrentHealth = firstFighter.health;
        let secondFighterCurrentHealth = secondFighter.health;
        const keys: EventKeys = {};
        const {
            PlayerOneAttack,
            PlayerOneBlock,
            PlayerTwoAttack,
            PlayerTwoBlock,
            PlayerOneCriticalHitCombination,
            PlayerTwoCriticalHitCombination
        } = controls;

        function handleKeyDown(event: KeyboardEvent) {
            keys[event.code] = true;

            if (keys[PlayerOneBlock]) {
                showBlockImage('left');
            }
            if (keys[PlayerTwoBlock]) {
                showBlockImage('right');
            }
            if (!keys[PlayerOneBlock] && keys[PlayerOneAttack]) {
                showAttackImage('left');

                const damage = getTotalDamage(firstFighter, secondFighter, keys[PlayerTwoBlock]);
                secondFighterCurrentHealth -= damage;
                reduceHealthBar({
                    position: 'right',
                    maxHealth: secondFighter.health,
                    damage
                });
            }
            if (!keys[PlayerTwoBlock] && keys[PlayerTwoAttack]) {
                showAttackImage('right');

                const damage = getTotalDamage(secondFighter, firstFighter, keys[PlayerOneBlock]);
                firstFighterCurrentHealth -= damage;
                reduceHealthBar({
                    position: 'left',
                    maxHealth: firstFighter.health,
                    damage
                });
            }
            if (PlayerOneCriticalHitCombination.includes(event.code)) {
                const isCriticalHitCombination = PlayerOneCriticalHitCombination.every(critCode => keys[critCode]);

                if (isCriticalHitCombination && playerOneCriticalHitAvailable()) {
                    showCritImage('left');
                    const damage = getCritDamage(firstFighter);
                    secondFighterCurrentHealth -= damage;
                    reduceHealthBar({
                        position: 'right',
                        maxHealth: secondFighter.health,
                        damage
                    });
                }
            }
            if (PlayerTwoCriticalHitCombination.includes(event.code)) {
                const isCriticalHitCombination = PlayerTwoCriticalHitCombination.every(critCode => keys[critCode]);

                if (isCriticalHitCombination && playerTwoCriticalHitAvailable()) {
                    showCritImage('right');
                    const damage = getCritDamage(secondFighter);
                    firstFighterCurrentHealth -= damage;
                    reduceHealthBar({
                        position: 'left',
                        maxHealth: firstFighter.health,
                        damage
                    });
                }
            }

            if (firstFighterCurrentHealth <= 0) {
                // eslint-disable-next-line no-use-before-define
                removeEventListeners();
                resolve(secondFighter);
            } else if (secondFighterCurrentHealth <= 0) {
                // eslint-disable-next-line no-use-before-define
                removeEventListeners();
                resolve(firstFighter);
            }
        }

        function handleKeyUp(event: KeyboardEvent) {
            keys[event.code] = false;
        }

        function removeEventListeners() {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
    });
}
