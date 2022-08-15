// parsing input

export const getQuantity = (arr) => {
  const qty = Number(arr[0]);
  return Number.isNaN(qty) ? 0 : qty;
};

export const getPrice = (arr) => {
  const price = Number(arr[arr.length - 1]);
  return Number.isNaN(price) ? 0 : price;
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

export const roundSalesTax = (totalSalesTax) => {
  return Math.ceil(totalSalesTax * 20) / 20;
};

export const calculateSalesTaxTotal = (product) => {
  const totalSalesTax =
    calculateBasicSalesTax(product) + calculateImportSalesTax(product);
  const totalRoundedSalesTax = roundSalesTax(totalSalesTax);
  return totalRoundedSalesTax;
};

export const calculateFullProductPrice = (product, roundedTotalSalesTax) => {
  return (product.price + roundedTotalSalesTax) * product.qty;
};

export const printOutputString = (product, fullProductPrice) => {
  return `${product.qty} ${product.name}: ${fullProductPrice.toFixed(2)}`;
};

export const printTotals = (totalSalesTax, billTotal) => {
  console.log(`Sales Taxes: ${totalSalesTax.toFixed(2)}`);
  console.log(`Total: ${billTotal.toFixed(2)}`);
};
