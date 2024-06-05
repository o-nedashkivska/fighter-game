export function reduceHealthBar({ position, maxHealth, damage }) {
    const healthReduction = (damage / maxHealth) * 100;

    const healthBarElement = document.getElementById(`${position}-fighter-indicator`);
    const currentHealthBarWidth = healthBarElement.style.width || '100%';

    let newHealthBarWidth = currentHealthBarWidth.slice(0, -1) - healthReduction;
    if (newHealthBarWidth < 0) newHealthBarWidth = 0;

    healthBarElement.style.width = `${newHealthBarWidth}%`;
}

function isCriticalHitAvailable() {
    let critIsAvailable = true;

    return () => {
        if (critIsAvailable) {
            critIsAvailable = false;
            setTimeout(() => {
                critIsAvailable = true;
            }, 10000);

            return true;
        }

        return false;
    };
}

export const playerOneCriticalHitAvailable = isCriticalHitAvailable();
export const playerTwoCriticalHitAvailable = isCriticalHitAvailable();
