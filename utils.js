// parsing input

export const getQuantity = (arr) => {
  return Number(arr[0]) !== NaN ? Number(arr[0]) : 0;
};

export const getPrice = (arr) => {
  return Number(arr.at(-1));
};

export const getIsImported = (arr) => {
  return arr.includes("imported");
};

export const getIsExempt = (arr) => {
  const exemptProducts = ["chocolate", "pills", "book"];
  return exemptProducts.some((el) => arr.join(" ").includes(el));
};

export const getProductName = (arr) => {
  return arr.slice(1, -2).join(" ");
};

export const parseInput = (input) => {
  const product = {};
  const splitInput = input.split(" ");
  product.qty = getQuantity(splitInput);
  product.price = getPrice(splitInput);
  product.isImported = getIsImported(splitInput);
  product.isExempt = getIsExempt(splitInput);
  product.name = getProductName(splitInput);
  return product;
};

// calculation tasks
export const calculateBasicSalesTax = (product) => {
  if (!product.isExempt) {
    return (product.price / 100) * 10;
  }

  return 0;
};

export const calculateImportSalesTax = (product) => {
  if (product.isImported) {
    return (product.price / 100) * 5;
  }

  return 0;
};

export const calculateTotalRounded = (totalSalesTax) => {
  return Math.ceil(totalSalesTax * 20) / 20;
};

export const calculateSalesTaxTotal = (product) => {
  const totalSalesTax =
    calculateBasicSalesTax(product) + calculateImportSalesTax(product);
  const totalRoundedSalesTax = calculateTotalRounded(totalSalesTax);
  return totalRoundedSalesTax;
};

export const calculateFullProductPrice = (product, roundedTotalSalesTax) => {
  return (product.price + roundedTotalSalesTax) * product.qty;
};

export const printOutputString = (product, fullProductPrice) => {
  console.log(`${product.qty} ${product.name}: ${fullProductPrice.toFixed(2)}`);
};

export const printTotals = (totalSalesTax, billTotal) => {
  console.log(`Sales Tax: ${totalSalesTax.toFixed(2)}`);
  console.log(`Total: ${billTotal.toFixed(2)}`);
};
