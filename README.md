# An example to a REST API Server that works with JFrog Xray Custom Integrations

This projects implements a simple RESTful API that processes HTTP requests that Xray will send with [Custom Integration](https://www.jfrog.com/confluence/display/XRAY/Integrations).

It makes use of [Express.js](http://expressjs.com/), a minimal and flexible Node.js framework that includes a myriad of HTTP utility methods for quickly creating robust APIs. We also use the [Body Parser](https://github.com/expressjs/body-parser) package, which is Node.js middleware that allows us to process any POST requests we receive.

## Getting Started

Check the routes.js file and see the end-points that are being used.
The main ones are:
1. /xray/api - Get the components from Xray and return the ones which we have more specific info on them back to Xray. 
2. /xray/api/checkauth - To check the authentication with Xray. You will have a 'test url' in Xray UI.
3. /xray/api/test - Testing this server.

#### Create the integration in your Xray by following [these steps](https://www.jfrog.com/confluence/display/XRAY/Integrations#Integrations-AddingaCustomIntegration).
![](https://www.jfrog.com/confluence/download/attachments/54986625/CustomProvider.jpg?version=1&modificationDate=1491408622000&api=v2)

#### To test this project:

### With curl

```
curl -H "Content-Type: application/json" -X POST -d '{"components" : [ { "component_id": "gav://ant:ant:1.6.5", "blobs": [ "97282a3b066de4ee4c9409979737f3911f95ceab" ] } ], "context" : "project_id" }' https://xray-api-1.glitch.me/xray/api/test
```

☀️ When you send inforamtion to Xray (as JSON) please give it few seconds so consume it.

### The results in Xray

This is the screen we can use in order to find the new information we added:
![](https://cdn.glitch.com/012b123f-b0cb-4bfd-8f5b-223b2d9ff1fb%2FScreen%20Shot%202019-12-04%20at%2011.59.28%20AM.png?v=1575489615429)

This is the new custom Violation with the full details we provided in this example
![](https://cdn.glitch.com/012b123f-b0cb-4bfd-8f5b-223b2d9ff1fb%2FScreen%20Shot%202019-12-04%20at%2011.59.49%20AM.png?v=1575489621549)


### Component Identifiers
Several endpoints require the use of a component identifier which must be formatted, according to its package type, using the convention described below:

```
* Maven - gav://group:artifact:version -- gav://ant:ant:1.6.5
* Docker -docker://Namespace/name:tag -- docker://jfrog/artifactory-oss:latest
* RPM - rpm://dist(optional):arch:name:version -- rpm://el6:i386:ImageMagick:6.7.2.7-4
* Debian - deb://dist(optional):arch:name:version -- deb://lucid:i386:acl:2.2.49-2
* NuGet - nuget://module:version -- nuget://log4net:9.0.1
* Generic file - generic://sha256:<Checksum>/name  -- generic://sha256:244fd47e07d1004f0aed9c156aa09083c82bf8944eceb67c946ff7430510a77b/foo.jar
* NPM - npm://package:version -- npm://mocha:2.4.5
* Python - pip://package:version -- pip://raven:5.13.0
```

### More Info
https://www.jfrog.com/confluence/display/XRAY/Integrations
