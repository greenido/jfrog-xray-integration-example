//
// An example to a REST API Server that works with JFrog Xray
// Author: @greenido
//Date: Dec 2019
//
//
//
// This defines three routes that our API is going to use.
//
var routes = function(app) {
  //
  // The home page end-point
  //
  app.get("/", function(req, res) {
    res.send(
      '<h1>An example to a REST API Server that works with JFrog Xray ☀️</h1> <br> <br>\
      <p>This projects implements a simple RESTful API that processes HTTP requests that Xray will send with Custom Integration.<br> \
      It makes use of Express.js, a minimal and flexible Node.js framework that includes a myriad of HTTP utility methods for quickly <br> \
      creating robust APIs. We also use the Body Parser package, which is Node.js middleware that allows us to process any POST requests we receive.<br>\
      </p> For some background check this <a href="https://greenido.wordpress.com/2019/12/04/how-to-build-an-integration-with-jfrog-xray/" target="_blank">post</a><br><br>\
        <p> Test it with a POST to: /xray/api/test <br>\
        <b>curl -H "Content-Type: application/json" -X POST -d \'{"components" : [ { "component_id": \
       "gav://ant:ant:1.6.5", "blobs": [ "97282a3b066de4ee4c9409979737f3911f95ceab" ] } ], "context" : "project_id" }\' \
        https://xray-api-1.glitch.me/xray/api/test </b> \
        <br><br> <img src="https://source.unsplash.com/random" alt="random image for the smile" /> </p>'
    );
  });

  //
  // The API end-point that get the components and return the ones which we have more info on them back to Xray
  // In this example we are returning information about a docker image
  //
  app.post("/xray/api/", function(req, res) {
    let returnGenericObj = {
      components: [
        {
          component_id: "docker://gae-alerts-il:v1",
          licenses: ["Apache 2.0"],
          provider: "Momo LTD",
          vulnerabilities: [
            {
              cve: "CVE-10-10",
              type: "security",
              source_id: "unique id of the reported issue",
              summary: "Momo Algorithmic complexity vulnerability",
              description:
                "This is just an example for something like: Algorithmic complexity vulnerability in the sorting algorithms in bzip2 compressing stream",
              cvss_v2: "7.9",
              url: "http://greenido.wordpress.com",
              publish_date: "2018-11-03T07:30:51.991+00:00",
              references: [
                "http://archives.neohapsis.com/archives/bugtraq/2012-05/0130.html"
              ]
            }
          ]
        }
      ]
    };

    let payload = req.body;
    console.log(
      "🎾 /xray/api/ Received GET full payload: " + JSON.stringify(payload)
    );
    let i = 0;
    let totalComponents = payload.components.length;

    // Search our 'example' docker image and return our info only on it
    while (i < totalComponents && payload.components[i] != null) {
      if (payload.components[i].component_id == "docker://gae-alerts-il:v1") {
        console.log(
          "🔔 FOUND the docker example with component_Id: " +
            payload.components[i].component_id
        );
        return res.json(returnGenericObj);
      }
      i++;
    }

    console.log(
      "🌻 /xray/api/ could not find the obj Xray is asking on. The component_Id: " +
        payload.components.component_id
    );
    return res.json({ components: ["N/A"] });
  });

  //
  // The testing end-point - This is a small unit test for this server
  // You can try it with: curl -H "Content-Type: application/json" -X POST -d
  // '{"components" : [ { "component_id": "gav://ant:ant:1.6.5", "blobs": [ "97282a3b066de4ee4c9409979737f3911f95ceab" ] } ], "context" : "project_id" }'
  // https://xray-api-1.glitch.me/xray/api/test
  //
  app.post("/xray/api/test", function(req, res) {
    let mockReturnObj = {
      components: [
        {
          component_id: "gav://ant:ant:1.6.5",
          licenses: ["Apache 2.0"],
          provider: "the feed provider",
          vulnerabilities: [
            {
              cve: "CVE-2012-2098",
              type: "security",
              source_id: "unique id of the reported issue",
              summary: "Algorithmic complexity vulnerability",
              description:
                "Algorithmic complexity vulnerability in the sorting algorithms in bzip2 compressing stream",
              cvss_v2: "7.9",
              url: "http://greenido.wordpress.com",
              publish_date: "2015-11-03T07:30:51.991+00:00",
              references: [
                "http://archives.neohapsis.com/archives/bugtraq/2012-05/0130.html"
              ]
            }
          ]
        }
      ]
    };

    let payload = req.body;
    console.log(
      "🎾 /xray/api/ Received GET: " +
        JSON.stringify(payload) +
        " | ID: " +
        payload.components[0].component_id
    );

    if (payload.components[0].component_id === "gav://ant:ant:1.6.5") {
      console.log(
        "⛸ /xray/api/test could find the component_Id: " +
          payload.components.component_id
      );
      return res.json(mockReturnObj);
    } else {
      console.log(
        "🕵 /xray/api/test could not find the obj Xray is asking on. The component_Id: " +
          payload.components.component_id
      );
      return res.json("{components: [N/A] } ");
    }
  });

  //
  // The check Authentication end-point
  //
  app.get("/xray/api/checkauth", function(req, res) {
    console.log(
      "🚦 /xray/api/ Received HEADERS GET: " + JSON.stringify(req.headers)
    );

    // TODO: make sure you have the right API_KEY you insert into your X-ray Intergration
    if (req.headers.apikey == process.env.API_KEY) {
      return res.json({ valid: true, error: "" });
    }
  });
};

module.exports = routes;
