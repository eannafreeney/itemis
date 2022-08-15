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
  calculateTotalRounded,
  calculateSalesTaxTotal,
  calculateFullProductPrice,
  printOutputString,
  printTotals,
} from "../utils.js";

describe("index.js", function () {
  // input parsing tests

  describe("getQuantity()", function () {
    it("should take first element from array", function () {
      assert.equal(getQuantity(["1", "book", "12.49"]), 1);
      assert.equal(getQuantity(["15", "books", "42.49"]), 15);
    });

    // it("should return 0 if first element is NaN", function () {
    //   assert.equal(getQuantity(["toy", "book", "12.49"]), 0);
    // });
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
      assert.equal(getIsExempt(["box", "of", "chocolates"]), true);
    });

    it("should return false if no term in exemptProducts matches the string", function () {
      assert.equal(getIsExempt(["box", "of", "apples"]), false);
    });
  });

  describe("getProductName()", function () {
    it("should remove first and last 2 elements from the array and then return them as a string", function () {
      assert.equal(
        getProductName(["1", "box", "of", "chocolates", "at", "12.49"]),
        "box of chocolates"
      );
    });

    // it("should return false if no term in exemptProducts matches the string", function () {
    //   assert.equal(getProductName(["box", "of", "apples"]), false);
    // });
  });

  describe("parseInput()", function () {
    // it("should remove first and last 2 elements from the array and then return them as a string", function () {
    //   assert.equal(parseInput("1 book of fairytales at 12.49"), {
    //     qty: 1,
    //     price: 12.49,
    //     isImported: false,
    //     isExempt: true,
    //     name: "book of fairytales",
    //   });
    // });
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

  describe("calculateTotalRounded()", function () {
    it("should round sales tax to nearest 0.05 ie 2.56 -> 2.6", function () {
      assert.equal(calculateTotalRounded(2.56), 2.6);
    });

    it("should round sales tax to nearest 0.05 ie 24.71 -> 24.75", function () {
      assert.equal(calculateTotalRounded(24.71), 24.75);
    });
  });

  describe("calculateSalesTaxTotal()", function () {
    it("should return sum of basicSalesTax + importSalesTax", function () {
      assert.equal(
        calculateSalesTaxTotal({
          price: 10,
          isExempt: false,
          isImported: false,
        }),
        1
      );
      assert.equal(
        calculateSalesTaxTotal({
          price: 50,
          isExempt: true,
          isImported: true,
        }),
        2.5
      );
      assert.equal(
        calculateSalesTaxTotal({
          price: 20,
          isExempt: false,
          isImported: true,
        }),
        3
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

  describe.only("printOutputString()", function () {
    it("should make a template string with qty, name + fullPrice: for champagne", function () {
      assert.equal(
        printOutputString({ qty: 1, name: "bottle of Champagne" }, 43.99),
        "1 bottle of Champagne: 43.99"
      );
    });

    // it("should make a template string with qty, name + fullPrice", function () {
    //   assert.equal(
    //     prepareOutputString(1, "imported box of chocolates", 10.2),
    //     "1 imported box of chocolates: 10.20"
    //   );
    // });

    // it("should not round first 2 digits after decimal point", function () {
    //   assert.equal(
    //     prepareOutputString(1, "imported box of chocolates", 10.23),
    //     "1 imported box of chocolates: 10.23"
    //   );
    // });
  });
});
