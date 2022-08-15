export const calculateBasicSalesTax = (isExempt, price) => {
  if (!isExempt) {
    return (price / 100) * 10;
  }

  return 0;
};

export const calculateImportSalesTax = (isImported, price) => {
  if (isImported) {
    return (price / 100) * 5;
  }

  return 0;
};

export const calculateTotalSalesTax = (basicSalesTax, importSalesTax) => {
  return basicSalesTax + importSalesTax;
};

// function calculateTotalSalesTax (product) {
// const total = calculateBasicSalesTax(product) + calculateImportSalesTax(product)
// const roundedTotalSales = total round to nearest
// return roundedTotalSales }

export const calculateRoundedTotalSalesTax = (totalSalesTax) => {
  return Math.ceil(totalSalesTax * 20) / 20;
};

export const calculateFullItemPrice = (roundedTotalSalesTax, price, qty) => {
  return (price + roundedTotalSalesTax) * qty;
};

export const prepareOutputString = (qty, product, fullItemPrice) => {
  return `${qty} ${product}: ${fullItemPrice}`;
};

// [12.49, 3.50, 6.75]
export const calculateCartTotal = (array) => {
  return array.reduce((a, b) => a + b, 0);
};

export const printOutput = (array, roundedTotalSalesTax, cartTotal) => {
  // for (let i = 0; i < array.length; i++) {
  //   console.log[i];
  // }
  array.forEach((el) => {
    console.log(el);
  });
  console.log(`Total Sales Tax: ${roundedTotalSalesTax}`);
  console.log(`Total: ${cartTotal}`);
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
