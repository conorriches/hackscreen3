const Integration = require("./proto/Integration");
const logger = require("../logger");
const axios = require("axios");

class metrolink extends Integration {
  constructor(callback) {
    super();
    this.callback = callback;
    this.state = {};
    this.instance = axios.create({
      baseURL: "https://api.tfgm.com/odata",
      timeout: 1000,
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.METROLINK_API_KEY
      }
    });
  }

  async setup() {
    setInterval(() => {
      this.fetch();
    }, 5000);

    this.fetch();
    return 1;
  }

  fetch() {
    this.instance
      .get("/Metrolinks?$filter=TLAREF eq 'HOT'&$top=10")
      .then(response => {
        logger.info("Successfully fetched Metrolink data");

        const data = response.data.value;

        let toReturn = {
          inbound: [],
          outbound: []
        };
        // work out whihc obj is inbound/outbound
        data.forEach(platform => {
          let tram = [];
          [0, 1, 2].forEach(i => {
            if (platform[`Dest${i}`]) {
              tram.push({
                destination: platform[`Dest${i}`],
                time: platform[`Wait${i}`]
              });
            }
          });

          if (platform.Direction === "Incoming") {
            toReturn.outbound = tram;
          } else {
            toReturn.inbound = tram;
          }
          toReturn.message = platform.MessageBoard;
          toReturn.lastUpdated = platform.LastUpdated;
        });

        this.state = toReturn;
        this.publish(this.state);
      })
      .catch(error => {
        logger.error("Error fetching Metrolink data");

        this.publish([]);
      });
  }

  receive() {
    this.publish(this.state);
  }

  publish(data) {
    this.callback("notification", { message: data });
  }
}
module.exports = metrolink;
