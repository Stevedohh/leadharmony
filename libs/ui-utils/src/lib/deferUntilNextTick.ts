export const deferUntilNextTick = (cb: () => void) => {
  window.setTimeout(() => {
    cb();
  });
};
