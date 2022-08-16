## Project Description

In this project, the app receives a receipt which lists all the items and their price and quantity. The app must parse this input, checking if the product in question is applicable for sales Tax exemption or Improt Sales Tax. Finally, it must calculate and output a final receipt detailing the product at its full price(including any sales tax), the sales tax total, and the receipt total.

## How to Run

Pass the input as an array of strings in a variable in index.js and run the `printReceeipt` function.

For example

```
const input = [
 "1 book at 12.49",
  "1 music CD at 14.99",
  "1 chocolate bar at 0.85"
];


printReceipt(input);
```

Save and run the next command in terminal

`node index.js` and it will print the correct output.
For example:

```
1 book: 12.49
1 music CD: 16.49
1 chocolate bar: 0.85
Sales Taxes: 1.50
Total: 29.83
```

## Assumptions

In this project, I have made a number of assumptions about how the data will be received. For example, I assume that:

- each shopping basket (input) will be run separately from one another
- the format will always be: qty + name of product + 'at' + price. i.e. "1 book at 12.49"
- the price will be the price for 1 individual item, and that 2 items would be formatted as "2 books at 12.99"
- the product is:

  - in the book category if the string contains "book"
  - in food category is the string contains "chocolate"
  - in the medical category if the string contains "pill"

  to edit or amend this, more words that match the exempt products can be added to the variable EXEMPT_PRODUCTS in index.js

## How to Test

A number of tests have been set up to test this application. To run the tests, one can run `npm i && npm run test`
