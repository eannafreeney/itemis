import { strict as assert } from "assert";

import {
  getQuantity,
  getPrice,
  getIsExempt,
  getIsImported,
  getProductName,
  parseInput,
  calculateBasicSalesTax,
  calculateImportSalesTax,
  roundSalesTax,
  calculateSalesTaxTotal,
  calculateFullProductPrice,
  printReceiptItem,
  printSalesTaxTotal,
  printReceiptTotal,
} from "../utils.js";

describe("index.js", function () {
  // input parsing tests

  describe("getQuantity()", function () {
    it("should take first element from array", function () {
      assert.equal(getQuantity(["1", "book", "12.49"]), 1);
      assert.equal(getQuantity(["15", "books", "42.49"]), 15);
    });

    it("should return 0 if first element is NaN", function () {
      assert.equal(getQuantity(["toy", "book", "12.49"]), 0);
    });
  });

  describe("getPrice()", function () {
    it("should get last element from array", function () {
      assert.equal(getPrice(["1", "book", "12.49"]), 12.49);
      assert.equal(getPrice(["15", "books", "42.49"]), 42.49);
    });

    it("should return 0 if last el is not a number", function () {
      assert.equal(getPrice(["1", "book", "apple"]), 0);
      assert.equal(getPrice(["15", "books", "forty"]), 0);
    });
  });

  describe("getIsImported()", function () {
    it("should return true is product includes the word imported", function () {
      assert.equal(
        getIsImported(["imported", "bottle", "of", "perfume"]),
        true
      );
    });

    it("should return false is product does NOT include the word imported", function () {
      assert.equal(getIsImported(["bottle", "of", "perfume"]), false);
    });
  });

  describe("getIsExempt()", function () {
    it("should return true if a term in exemptProducts matches the string", function () {
      assert.equal(
        getIsExempt(["box", "of", "chocolates"], ["chocolate", "pill", "book"]),
        true
      );
    });

    it("should return false if no term in exemptProducts matches the string", function () {
      assert.equal(
        getIsExempt(["box", "of", "apples"], ["chocolate", "pill", "book"]),
        false
      );
    });
  });

  describe("getProductName()", function () {
    it("should remove first and last 2 elements from the array and then return them as a string", function () {
      assert.equal(
        getProductName(["1", "box", "of", "chocolates", "at", "12.49"]),
        "box of chocolates"
      );
    });
  });

  describe("parseInput()", function () {
    it("should return an obj with the values for the product", function () {
      assert.deepEqual(
        parseInput("1 book of fairytales at 12.49", [
          "chocolate",
          "pill",
          "book",
        ]),
        {
          qty: 1,
          price: 12.49,
          isImported: false,
          isExempt: true,
          name: "book of fairytales",
        }
      );
    });
  });

  // calculations

  describe("calculateBasicSalesTax()", function () {
    it("should return 10 percent tax when isExempt is false", function () {
      assert.equal(calculateBasicSalesTax({ price: 100, isExempt: false }), 10);
    });

    it("should return 0 percent tax for <exempt> category", function () {
      assert.equal(calculateBasicSalesTax({ price: 100, isExempt: true }), 0);
    });

    it("should return not rounded tax for product", function () {
      assert.ok(
        calculateBasicSalesTax({ price: 47.49, isExempt: false }) - 4.749 <
          0.0001
      );
    });

    it("should return 0 if price is 0", function () {
      assert.equal(calculateBasicSalesTax({ price: 0, isExempt: false }), 0);
      assert.equal(calculateBasicSalesTax({ price: 0, isExempt: true }), 0);
    });
  });

  describe("calculateImportSalesTax()", function () {
    it("should return 5% when isImported is true", function () {
      assert.equal(
        calculateImportSalesTax({ price: 50, isImported: true }),
        2.5
      );
    });

    it("should return 0% when isImported is false", function () {
      assert.equal(
        calculateImportSalesTax({ price: 50, isImported: false }),
        0
      );
    });

    it("should return 0 if price is 0", function () {
      assert.equal(calculateImportSalesTax({ price: 0, isImported: true }), 0);
      assert.equal(calculateImportSalesTax({ price: 0, isImported: false }), 0);
    });
  });

  describe("roundSalesTax()", function () {
    it("should round sales tax to nearest 0.05 ie 2.56 -> 2.6", function () {
      assert.equal(roundSalesTax(2.56), 2.6);
    });

    it("should round sales tax to nearest 0.05 ie 2.96 -> 3", function () {
      assert.equal(roundSalesTax(2.96), 3);
    });

    it("should round sales tax to nearest 0.05 ie 24.71 -> 24.75", function () {
      assert.equal(roundSalesTax(24.71), 24.75);
    });
  });

  describe("calculateSalesTaxTotal()", function () {
    it("should return 1.50 when price is 14.99, not exempt, not imported", function () {
      assert.equal(
        calculateSalesTaxTotal({
          price: 14.99,
          isExempt: false,
          isImported: false,
        }),
        1.5
      );
    });

    it("should return 0.50 when price is 10, is exempt, is imported", function () {
      assert.equal(
        calculateSalesTaxTotal({
          price: 10,
          isExempt: true,
          isImported: true,
        }),
        0.5
      );
    });

    it("should return 1.50 when price is 7.15, noy exempt, is imported", function () {
      assert.equal(
        calculateSalesTaxTotal({
          price: 47.5,
          isExempt: false,
          isImported: true,
        }),
        7.15
      );
    });

    it("should return 0 when both values = 0", function () {
      assert.equal(
        calculateSalesTaxTotal({
          price: 20,
          isExempt: true,
          isImported: false,
        }),
        0
      );
    });
  });

  describe("calculateFullProductPrice()", function () {
    it("should return sum of price + roundedTotalSalesTax * qty", function () {
      assert.equal(
        calculateFullProductPrice(
          {
            price: 20,
            qty: 1,
          },
          5
        ),
        25
      );
      assert.equal(
        calculateFullProductPrice(
          {
            price: 40,
            qty: 1,
          },
          7
        ),
        47
      );
    });

    it("should return 0 when all values = 0", function () {
      assert.equal(
        calculateFullProductPrice(
          {
            price: 0,
            qty: 0,
          },
          0
        ),
        0
      );
    });

    it("should return 0 if qty = 0", function () {
      assert.equal(
        calculateFullProductPrice(
          {
            price: 10,
            qty: 0,
          },
          0
        ),
        0
      );
    });
  });

  describe("printReceiptItem()", function () {
    it("should make a template string with qty, name + fullPrice: for champagne", function () {
      assert.equal(
        printReceiptItem({ qty: 1, name: "bottle of Champagne" }, 43.99),
        "1 bottle of Champagne: 43.99"
      );
    });

    it("should make a template string with qty, name + fullPrice", function () {
      assert.equal(
        printReceiptItem({ qty: 1, name: "imported box of chocolates" }, 10.2),
        "1 imported box of chocolates: 10.20"
      );
    });
  });

  describe("printSalesTaxTotal()", function () {
    it("should make a template string with sales tax total", function () {
      assert.equal(printSalesTaxTotal(43.99), "Sales Taxes: 43.99");
    });
  });

  describe("printReceiptTotal()", function () {
    it("should make a template string with receipt total", function () {
      assert.equal(printReceiptTotal(95.0), "Total: 95.00");
    });
  });
});
