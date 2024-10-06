export const formatNumberIndian = (num: number) => {
  const x = num.toString().split(".");
  let lastThree = x[0].slice(-3);
  const otherNumbers = x[0].slice(0, -3);
  if (otherNumbers !== "") lastThree = "," + lastThree;
  const result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  return x.length > 1 ? result + "." + x[1] : result;
};
