const calculateBasicSalesTax = (product) => {
  if (!product.isExempt) {
    return (product.price / 100) * 10;
  }

  return 0;
};

const calculateImportSalesTax = (product) => {
  if (product.isImported) {
    return (product.price / 100) * 5;
  }

  return 0;
};

const calculateRoundedTotalSalesTax = (totalSalesTax) => {
  return Math.ceil(totalSalesTax * 20) / 20;
};

export const calculateTotalRoundedSalesTax = (product) => {
  const totalSalesTax =
    calculateBasicSalesTax(product) + calculateImportSalesTax(product);
  const totalRoundedSalesTax = calculateRoundedTotalSalesTax(totalSalesTax);
  return totalRoundedSalesTax;
};

export const calculateFullItemPrice = (product, roundedTotalSalesTax) => {
  return (product.price + roundedTotalSalesTax) * product.qty;
};

export const printOutputString = (product, fullProductPrice) => {
  console.log(
    `${product.qty} ${product.productName}: ${fullProductPrice.toFixed(2)}`
  );
};

export const printTotals = (totalSalesTax, billTotal) => {
  console.log(`Sales Tax: ${totalSalesTax}`);
  console.log(`Total: ${billTotal.toFixed(2)}`);
};

// input:  1 book at 12.49 -> ["1", "book", "12.49"]
// input:  1 packet of headache pills at 9.75 -> ["1", "packet of headache pills", "9.75"]
export const convertInputStringIntoArray = (input) => {
  return input.split(" ");
};

export const getQuantity = (inputArray) => {
  return parseInt(inputArray[0]);
};

export const getPrice = (inputArray) => {
  return parseFloat(inputArray.at(-1));
};
