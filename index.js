import {
  parseInput,
  calculateTotalRoundedSalesTax,
  calculateFullItemPrice,
  printOutputString,
  printTotals,
} from "./utils.js";

// parse -> products
// const products = [
//   {
//     productName: "imported box of chocolates",
//     price: 10,
//     qty: 1,
//     isExempt: true,
//     isImported: true,
//   },
//   {
//     productName: "imported bottle of perfume",
//     price: 47.5,
//     qty: 1,
//     isExempt: false,
//     isImported: true,
//   },
// ];

const input1 = [
  "1 book at 12.49",
  "1 music CD at 14.99",
  "1 chocolate bar at 0.85",
];
const input2 = [
  "1 imported box of chocolates at 10.00",
  "1 imported bottle of perfume at 47.50",
];
const input3 = [
  "1 imported bottle of perfume at 27.99",
  "1 bottle of perfume at 18.99",
  "1 packet of headache pills at 9.75",
  "1 box of imported chocolates at 11.25",
];
const products = input3.map(parseInput);

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
