const FISH_TYPES = ['🐟', '🐠', '🦐', '🐡', '🦞', '🐙', '🐢', '🦀'];

function pickRandomFish() {
  return FISH_TYPES[randomInt(0, FISH_TYPES.length - 1)];
}
