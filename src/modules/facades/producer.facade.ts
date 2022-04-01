const producer = async (queueName: string, message: string) => {
  const amqplib = require('amqplib')

  // var open = require('amqplib').connect('amqp://localhost')
  const open = await amqplib.connect(`amqp://${process.env.QUEUE_USERNAME}:${process.env.QUEUE_PASSWORD}@${process.env.QUEUE_SERVER}:${process.env.QUEUE_PORT}`)

  const ch = await open.createChannel()
  
  await ch.assertQueue(queueName)
  await ch.sendToQueue(queueName, Buffer.from(message))

  ch.close()
}

export default producer