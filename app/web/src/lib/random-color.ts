export function getRandomColorHex(): string {
    const value = Math.floor(Math.random() * 0xffffff);

    return `#${value.toString(16).padStart(6, '0').toUpperCase()}`;
}
