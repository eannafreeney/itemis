import { strict as assert } from "assert";

import { printReceiptDetails } from "../index.js";

describe("index.js", function () {
  describe("printReceiptDetails()", function () {
    it("should return 10", function () {
      assert.equal(printReceiptDetails(), 10);
    });
  });
});
