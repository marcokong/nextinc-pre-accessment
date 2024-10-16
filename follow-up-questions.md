**Explain the architecture of your WebSocket server and RESTful API server. How have you structured your code ot handle different endpoints and requests efficiently?**
 
The websocket is built using the ws library, listening on port 8080 for client connection. It adopts the event-driven approach to handle different connections even, such as new connection, receiving message from clients etc. When clients send new message to the server, it triggers the message event and the server will broadcast to all other clients.

For the RESTful API, the server is created using the express framework, listening on port 3000 or the one set in the environment variable. I have created an in-memory list of resources for this task. There are endpoints handling basics  requests for CRUD operations on the resources. Each request has some simple checking to prevent invalid request.

**Discuss the design decisions, libraries, and frameworks used in your implementation. Explain how your servers handle different types of requests and how they could be extended or modified for additional functionality in the future.**

For the websocket server, I chose to use the ws library due to its simplicity and lightweight implementation.

And for the Restful API server, the Express web framework is used also because its flexibility and efficiency to build apps.

For logging, I use the log4js library because it is easy to set up. There are many other powerful libraries like Pino that are highly customizable as well but personally I like the log output of log4js.

In order to be used in real-life applications, there are some additional functionality that can be made.

1.  Database integration

To handle a large scale application, the server will need to deal with a lot of data. Database integration and ORM/ODM such as Mongoose and Prisma can then be added to the server to work with different databases.

2.  Authentication and authorization

Servers can add authentication and authorization features, for example, OAuth or JWT, to secure the connection and request, and to manage the access and rights of different users.  

3.  Load Balancing and scaling

When the server handles a lot of requests, it is important to scale up the server and distribute the work across multiple instances to maintain the application performance and availability. An additional functionality could be containerizing the server app. For example, we can build docker image out of the server and deployed in a Kubernetes cluster to easily scale up/down the server.

4.  Caching

Caching can also be implemented in the server to enhance the server performance. Data could be cached in memory so that results are retrieved faster and reduce latency. This can be done with the help of the caching libraries such as node-cache, Redis etc.
