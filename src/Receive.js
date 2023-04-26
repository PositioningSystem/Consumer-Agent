import amqp from "amqplib";
import insert from './db_con.js'

async function main() {
  const connection = await amqp.connect('amqp://rmq0'); // Connect to RabbitMQ server
  const channel = await connection.createChannel();

  // create the queues with different priorities
  await channel.assertQueue('high-priority', { arguments: { 'x-max-priority': 10 } });
  await channel.assertQueue('low-priority', { arguments: { 'x-max-priority': 1 } });

  console.log('Consuming messages...');

  while (true) {
    // check for messages in high-priority queue
    const msgFromHighPriority = await channel.get('high-priority');
    if (msgFromHighPriority) {
      console.log(`Received message from high-priority: ${msgFromHighPriority.content.toString()}`);
      // process the message here
      await insert(msgFromHighPriority.content.toString())
      channel.ack(msgFromHighPriority);
      continue; // go to next iteration of loop
    }

    // check for messages in low-priority queue
    const msgFromLowPriority = await channel.get('low-priority');
    if (msgFromLowPriority) {
      console.log(`Received message from low-priority: ${msgFromLowPriority.content.toString()}`);
      // process the message here
      await insert(msgFromLowPriority.content.toString())
      channel.ack(msgFromLowPriority);
      continue; // go to next iteration of loop
    }

    // wait for a short time before checking again
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

main().catch(console.error);
