const rotate_cube = () => {
    let el = document.getElementById("cube1");
    let el1 = document.getElementById("cube2");

    let x = 0, y = 0;
    let x1 = 0, y1 = 0;

    const steps = 500;
    const delay = 5;
    const delayFollower = 1000; // Verzögerung in ms

    // Funktion für Bewegungen
    const animate = (updateFn, timeOffset, element) => {
        for (let i = 0; i < steps; i++) {
            setTimeout(() => {
                updateFn(i);
                element.style.transform = `translate(${element === el ? x : x1}px, ${element === el ? y : y1}px)`;
            }, i * delay + timeOffset);
        }
    };

    // cube1 Animation (Leader)
    animate(i => { x = i; }, 0, el);                                     // nach rechts
    animate(i => { y = i; }, steps * delay, el);                         // nach unten
    animate(i => { x = steps - i; }, 2 * steps * delay, el);             // nach links
    animate(i => { y = steps - i; }, 3 * steps * delay, el);             // nach oben

    // cube2 Animation (Follower) – mit Zeitversatz
    animate(i => { x1 = i; }, delayFollower, el1);                                       // nach rechts
    animate(i => { y1 = i; }, steps * delay + delayFollower, el1);                       // nach unten
    animate(i => { x1 = steps - i; }, 2 * steps * delay + delayFollower, el1);           // nach links
    animate(i => { y1 = steps - i; }, 3 * steps * delay + delayFollower, el1);           // nach oben
};

const repead = () => {
    const rounds = 50;
    const oneRoundTime = 4 * 500 * 5; // 4 Richtungen × 500 Schritte × 5ms Delay = 10000ms

    for (let i = 0; i < rounds; i++) {
        setTimeout(() => {
            rotate_cube();
        }, i * oneRoundTime);
    }
};