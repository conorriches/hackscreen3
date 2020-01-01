const io = require("socket.io")();
io.origins("*:*"); // for latest version

const config = require("../config.json");
const integrations = require("./integrations");
var logger = require("./logger");

class App {
  constructor() {
    this.runningIntegrations = {};
    this.clients = [];
    io.listen(config.socket.port);
    io.on("connection", socket => {
      logger.verbose(`Socket Connect: ${socket.id}`);
      this.newClient();
      socket.on("disconnect", function() {
        logger.verbose(`Socket Disconnect: ${socket.id}`);
        socket.disconnect();
      });
    });

    this.connectIntegrations().then(res => {
      Promise.all(res)
        .then(p => {})
        .catch(e => {
          logger.error(e.stack);
        });
    });
  }

  /**
   * Create a custom event handler for an integration.
   * Takes the integration name, returns a function containing that name and event types.
   * @param {*} integrationName
   */
  eventHandler(integrationName) {
    return (type, obj) => {
      const allowedTypes = ["notification", "state"];
      if (allowedTypes.indexOf(type) >= 0) {
        logger.info(
          `Received a '${type}' event from '${integrationName}' integration`
        );

        if (type == allowedTypes[0]) {
          //emit a notification from this integration
          io.emit("NOTIFICATION", {
            integration: integrationName,
            data: obj
          });
          return;
        } else if (type == allowedTypes[1]) {
          //update the state for this integration
          io.emit("STATE_CHANGE", obj);
          return;
        }
      }
      const errMsg = `Unhandled event type '${type}' from '${integrationName}' integration - must be one of: ${allowedTypes.join()}`;
      logger.error(errMsg);
      throw new Error(errMsg);
    };
  }

  // Connect to whatever integrations are needed
  async connectIntegrations() {
    let enabledIntegrations = Object.keys(integrations);
    let promises = [];

    enabledIntegrations.forEach(integrationName => {
      try {
        logger.verbose(`Starting the '${integrationName}' integration...`);
        this.runningIntegrations[integrationName] = new integrations[
          integrationName
        ](this.eventHandler(integrationName));
        logger.info(`Started '${integrationName}' integration.`);
        let p = this.runningIntegrations[integrationName].setup();
        promises.push(p);
      } catch (e) {
        logger.error(
          `\x1b[31mFailed to start '${integrationName}' integration`
        );
        logger.error(`\x1b[31m${e.stack}`);
      }
    });
    return promises;
  }
  async newClient() {
    let enabledIntegrations = Object.keys(integrations);
    let promises = [];

    enabledIntegrations.forEach(integrationName => {
      try {
        logger.info(
          `Letting '${integrationName}' integration know of new client.`
        );
        let p = this.runningIntegrations[integrationName].receive();
        promises.push(p);
      } catch (e) {
        logger.error(`\x1b[31m '${integrationName}' failed for a new client`);
        logger.error(`\x1b[31m${e.stack}`);
      }
    });
  }
}

module.exports = App;
