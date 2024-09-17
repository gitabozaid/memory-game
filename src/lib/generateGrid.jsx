export function generateGrid(theme, gridSize, icons, shuffleArray) {
  const randomIconsSet = new Set([]);

  if (+gridSize === 4 && theme === 'Icons') {
    while (randomIconsSet.size < 8) randomIconsSet.add(Math.floor(Math.random() * 18));
  }

  const randomIcons = [...randomIconsSet];

  return shuffleArray([
    ...Array.from({ length: (gridSize * gridSize) / 2 }, (_, i) => {
      if (theme === 'Numbers') return i;
      if (theme === 'Icons') return icons[+gridSize === 4 ? randomIcons[i] : i];
    }),
    ...Array.from({ length: (gridSize * gridSize) / 2 }, (_, i) => {
      if (theme === 'Numbers') return i;
      if (theme === 'Icons') return icons[+gridSize === 4 ? randomIcons[i] : i];
    }),
  ]);
}
