const Integration = require("./proto/Integration");
const logger = require("../logger");

class telegram extends Integration {
  constructor() {
    super();
  }

  async setup() {
    return 1;
  }

  receive() {}

  publish() {}
}
module.exports = telegram;
