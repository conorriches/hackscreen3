const Integration = require("./proto/Integration");
const logger = require("../logger");

class metrolink extends Integration {
  constructor(callback) {
    super();
    this.callback = callback;
    this.state = {};
  }

  async setup() {
    setInterval(() => {
      this.fetch();
    }, 5000);

    this.fetch();
    return 1;
  }

  fetch() {
    this.state = {
      inbound: [
        { destination: "Eccles", time: Math.floor(Math.random() * 5) },
        { destination: "MediaCityUK", time: 6 },
        { destination: "Eccles", time: 7 }
      ],
      outbound: [
        { destination: "Ashton", time: Math.floor(Math.random() * 5) },
        { destination: "Etihad", time: 6 },
        { destination: "Ashton", time: 10 }
      ]
    };
    this.publish(this.state);
  }

  receive() {
    this.publish(this.state);
  }

  publish(data) {
    this.callback("notification", { message: data });
  }
}
module.exports = metrolink;
