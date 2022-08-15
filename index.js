import {
  calculateTotalRoundedSalesTax,
  calculateFullItemPrice,
  printOutputString,
  printTotals,
} from "./utils.js";

// parse -> products
const products = [
  {
    productName: "book",
    price: 12.49,
    qty: 1,
    isExempt: true,
    isImported: false,
  },
  {
    productName: "music CD",
    price: 14.99,
    qty: 1,
    isExempt: false,
    isImported: false,
  },
  {
    productName: "chocolate bar",
    price: 0.85,
    qty: 1,
    isExempt: true,
    isImported: false,
  },
];

let totalSalesTax = 0;
let billTotal = 0;

products.forEach((product) => {
  const roundedTotalSalesTax = calculateTotalRoundedSalesTax(product);

  const fullProductPrice = calculateFullItemPrice(
    product,
    roundedTotalSalesTax
  );
  printOutputString(product, fullProductPrice);

  totalSalesTax += roundedTotalSalesTax;
  billTotal += fullProductPrice;
});

// prints
printTotals(totalSalesTax, billTotal);
