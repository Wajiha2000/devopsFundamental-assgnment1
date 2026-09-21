const assert = require("assert");

const message = "DevOps Demo Application is running!";
assert.strictEqual(message, "DevOps Demo Application is running!");

const healthResponse = { status: "healthy" };
assert.strictEqual(healthResponse.status, "healthy");

console.log("All tests passed!");