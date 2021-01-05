const expect = require("chai").expect;
const request = require("request");

describe("Status and content", () => {
  describe("Init", () => {
    it("status", (done) => {
      request(
        "http://localhost:5000/api/game/reset/5ff395ad653be0020cfdc998",
        (_, response) => {
          expect(response.statusCode).to.equal(200);
          done();
        }
      );
    });
  });
});
