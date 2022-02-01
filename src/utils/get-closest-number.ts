const getClosest = (a: number[], numberD1: number) =>
  a.sort((a, b) => Math.abs(numberD1 - a) - Math.abs(numberD1 - b))[0];

export default getClosest;
