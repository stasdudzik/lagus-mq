const amqp = require("amqplib");

const msg = { number: 19, string: "Pub/Sub, rabbit MQ" };

connect();
async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("jobs");
    console.log("Result", result);
    channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
    console.log(`Job sent successfully ${msg.number + " " + msg.string}`);
  } catch (ex) {
    console.error(ex);
  }
}
