import {
  parseInput,
  calculateSalesTaxTotal,
  calculateFullProductPrice,
  printOutputString,
  printTotals,
} from "./utils.js";

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

function printReceipt(input) {
  const products = input.map(parseInput);

  // declare variables for printing later
  let totalSalesTax = 0;
  let billTotal = 0;

  // loop through the products array
  products.forEach((product) => {
    const roundedTotalSalesTax = calculateSalesTaxTotal(product);
    const fullProductPrice = calculateFullProductPrice(
      product,
      roundedTotalSalesTax
    );
    console.log(printOutputString(product, fullProductPrice));
    totalSalesTax += roundedTotalSalesTax;
    billTotal += fullProductPrice;
  });

  // prints
  printTotals(totalSalesTax, billTotal);
  console.log("\n");
}

printReceipt(input1);
printReceipt(input2);
printReceipt(input3);
