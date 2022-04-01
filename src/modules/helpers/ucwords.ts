export const ucwords = async (str: string = '') =>
(str.toLocaleLowerCase() + '').replace(/^(.)|\s+(.)/g, $1 => {
  return $1.toUpperCase();
})