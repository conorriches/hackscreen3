const Integration = require("./proto/Integration");
const logger = require("../logger");
const MQTT = require("mqtt");

class mqtt extends Integration {
  constructor(callback) {
    super();
    this.callback = callback;
    this.client = {};
  }

  async setup() {
    const thisClass = this;
    this.client = MQTT.connect("mqtt://test.mosquitto.org");

    thisClass.client.on("connect", function() {
      thisClass.client.subscribe("cone/#", function(err) {
        logger.verbose("MQTT is connected");
        if (!err) {
          thisClass.client.publish("presence", "Hello mqtt");
        }
      });
    });

    thisClass.client.on("message", function(topic, message) {
      logger.verbose(`MQTT receive: ${topic}: ${message}`);

      thisClass.callback("notification", {
        topic,
        message: message.toString()
      });
    });
  }

  receive(obj) {}

  publish(obj) {
    thisClass.client.publish(obj.message, obj.topic);
  }
}
module.exports = mqtt;
