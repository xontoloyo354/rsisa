export const isOdd = async (params: number) => {
  if (params % 2 > 0) { return true; }
  else { return false; }
}