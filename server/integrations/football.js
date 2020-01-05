const Integration = require("./proto/Integration");
const logger = require("../logger");
const ical = require("node-ical");

class football extends Integration {
  constructor(callback) {
    super();
    this.callback = callback;
    this.state = {};
  }

  async setup() {
    setInterval(() => {
      this.fetch();
    }, 30000);

    this.fetch();
    return 1;
  }

  receive() {
    this.publish(this.state);
  }

  async fetch() {
    const toReturn = [];
    const data = await ical.async.fromURL(
      "https://ics.fixtur.es/v2/home/manchester-city.ics"
    );
    try {
      for (let k in data) {
        if (data.hasOwnProperty(k)) {
          const event = data[k];
          if (event.type == "VEVENT") {
            if (new Date(event.start) > Date.now()) {
              toReturn.push({
                start: new Date(event.start),
                end: new Date(event.end),
                title: event.summary
              });
            }
          }
        }
      }
      this.state = toReturn;
      this.publish(this.state);
    } catch (e) {
      logger.error("Failed to get football");
      console.log(e);
    }
  }

  publish(data) {
    this.callback("notification", { message: data });
  }
}
module.exports = football;
