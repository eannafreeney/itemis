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
  console.log(`${product.qty} ${product.name}: ${fullProductPrice.toFixed(2)}`);
};

export const printTotals = (totalSalesTax, billTotal) => {
  console.log(`Sales Tax: ${totalSalesTaxtoFixed(2)}`);
  console.log(`Total: ${billTotal.toFixed(2)}`);
};

// parsing input

const getQuantity = (arr) => {
  return Number(arr[0]);
};

const getPrice = (arr) => {
  return Number(arr.at(-1));
};

const getIsImported = (arr) => {
  return arr.includes("imported") ? true : false;
};

const getIsExempt = (arr) => {
  // return arr.join(" ").includes("chocolate" || "pills" || "book")
  //   ? true
  //   : false;
};

const getProductName = (arr) => {
  return arr.slice(1, -2).join(" ");
};

export const parseInput = (input) => {
  const product = {};
  const arr = input.split(" ");
  product.qty = getQuantity(arr);
  product.price = getPrice(arr);
  product.isImported = getIsImported(arr);
  product.isExempt = getIsExempt(arr);
  product.name = getProductName(arr);
  return product;
};
