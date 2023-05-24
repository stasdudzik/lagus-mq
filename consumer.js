const amqp = require("amqplib");

connect();
async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel(); // different tcp connection then publisher tcp connection! This connection should be kept alive
    const result = await channel.assertQueue("jobs");

    channel.consume("jobs", (message) => {
      const input = JSON.parse(message.content.toString());
      console.log(
        `Received job with input ${JSON.stringify({ input }, null, 2)}`
      );
    });

    console.log("Waiting for messages...");
  } catch (ex) {
    console.error(ex);
  }
}
