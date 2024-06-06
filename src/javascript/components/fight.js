import controls from '../../constants/controls';
import { showAttackImage, showBlockImage, showCritImage } from './arenaActions';
import { reduceHealthBar, playerOneCriticalHitAvailable, playerTwoCriticalHitAvailable } from './fightUtils';

export function getHitPower(fighter) {
    const criticalHitChance = Math.random() + 1;
    const power = fighter.attack * criticalHitChance;
    return power;
}

export function getBlockPower(fighter) {
    const dodgeChance = Math.random() + 1;
    const power = fighter.defense * dodgeChance;
    return power;
}

export function getDamage(attacker, defender) {
    const damage = getHitPower(attacker) - getBlockPower(defender);
    return damage < 0 ? 0 : damage;
}

function getTotalDamage(attacker, defender, withBlock) {
    if (withBlock) {
        return getDamage(attacker, defender);
    }
    return getHitPower(attacker);
}

function getCritDamage(fighter) {
    return 2 * fighter.attack;
}

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        let firstFighterCurrentHealth = firstFighter.health;
        let secondFighterCurrentHealth = secondFighter.health;
        const keys = {};
        const {
            PlayerOneAttack,
            PlayerOneBlock,
            PlayerTwoAttack,
            PlayerTwoBlock,
            PlayerOneCriticalHitCombination,
            PlayerTwoCriticalHitCombination
        } = controls;

        function handleKeyDown(event) {
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

        function handleKeyUp(event) {
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
