import { strict as assert } from "assert";

import {
  convertInputStringIntoArray,
  getQuantity,
  getPrice,
  calculateBasicSalesTax,
  calculateImportSalesTax,
  calculateTotalSalesTax,
  calculateRoundedTotalSalesTax,
  calculateFullItemPrice,
  calculateCartTotal,
  prepareOutputString,
  printOutput,
} from "../index.js";

describe("index.js", function () {
  describe("convertInputStringIntoArray()", function () {
    it("should split string into sep elements of an array", function () {
      assert.equal(convertInputStringIntoArray("I am 20"), ["I", "am", "20"]);
    });
  });

  describe("getQuantity()", function () {
    it("should take first element from array", function () {
      assert.equal(getQuantity(["1", "book", "12.49"]), 1);
      assert.equal(getQuantity(["15", "books", "42.49"]), 15);
    });

    it("should return 0 is first element is NaN", function () {
      assert.equal(getQuantity(["toy", "book", "12.49"]), 1);
    });
  });

  describe("getPrice()", function () {
    it("should get last element from array", function () {
      assert.equal(getPrice(["1", "book", "12.49"]), 12.49);
      assert.equal(getPrice(["15", "books", "42.49"]), 42.49);
    });
  });

  describe("calculateBasicSalesTax()", function () {
    it("should return 10 percent tax when isExempt is false", function () {
      assert.equal(calculateBasicSalesTax(false, 100), 10);
      assert.equal(calculateBasicSalesTax(false, 55), 5.5);
      assert.equal(calculateBasicSalesTax(false, 20), 2);
    });

    it("should return 0 percent tax for <exempt> category", function () {
      assert.equal(calculateBasicSalesTax(true, 100), 0);
    });

    it("should return not rounded tax for product", function () {
      assert.ok(calculateBasicSalesTax(false, 47.49) - 4.749 < 0.0001);
    });

    it("should return 0 if price is 0", function () {
      assert.equal(calculateBasicSalesTax(false, 0), 0);
      assert.equal(calculateBasicSalesTax(true, 0), 0);
    });
  });

  describe("calculateImportSalesTax()", function () {
    it("should return 5% when isImported is true", function () {
      assert.equal(calculateImportSalesTax(true, 100), 5);
      assert.equal(calculateImportSalesTax(true, 60), 3);
    });

    it("should return 0% when isImported is false", function () {
      assert.equal(calculateImportSalesTax(false, 100), 0);
    });

    it("should return 0 if price is 0", function () {
      assert.equal(calculateImportSalesTax(true, 0), 0);
    });
  });

  describe("calculateTotalSalesTax()", function () {
    it("should return 25 when basicSalesTax = 10 + importSalesTax = 15", function () {
      assert.equal(calculateTotalSalesTax(10, 15), 25);
      assert.equal(calculateTotalSalesTax(24, 13), 37);
    });

    it("should return 0 when both values = 0", function () {
      assert.equal(calculateTotalSalesTax(0, 0), 0);
    });

    it("should return 20 if importSalesTax = 0", function () {
      assert.equal(calculateTotalSalesTax(20, 0), 20);
    });
  });

  describe("calculateRoundedTotalSalesTax()", function () {
    it("should round sales tax to nearest 0.05 ie 2.51 -> 2.55", function () {
      assert.equal(calculateRoundedTotalSalesTax(24.71), 24.75);
      assert.equal(calculateRoundedTotalSalesTax(2.56), 2.6);
    });
  });

  describe("calculateFullItemPrice()", function () {
    it("should return 75 when totalSalesTax = 15, price = 10, qty = 3", function () {
      assert.equal(calculateFullItemPrice(15, 10, 3), 75);
      assert.equal(calculateFullItemPrice(24, 13, 1), 37);
    });

    it("should return 0 when all values = 0", function () {
      assert.equal(calculateFullItemPrice(0, 0, 0), 0);
    });

    it("should return 0 if qty = 0", function () {
      assert.equal(calculateFullItemPrice(20, 40, 0), 0);
    });
  });

  describe("calculateCartTotal()", function () {
    it("should add all values in the array together", function () {
      assert.equal(calculateCartTotal([15, 10, 3]), 28);
      assert.equal(calculateCartTotal([12.49, 3.5, 6.75]), 22.74);
    });
  });

  describe("prepareOutputString()", function () {
    it("should make a template string with qty, name + fullPrice", function () {
      assert.equal(
        prepareOutputString(15, "bottles of Champagne", 43.99),
        "15 bottles of Champagne: 43.99"
      );
    });
  });

  describe("printOutput()", function () {
    it("console.log final output", function () {
      assert.equal(
        printOutput(
          ["1 book at 12.49", "1 packet of headache pills at 9.75"],
          25.99,
          60
        ),
        "1 book at 12.49",
        "1 packet of headache pills at 9.75",
        25.99,
        60
      );
    });
  });
});
