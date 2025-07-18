const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["192.168.1.37:9092"], // use your Kafka broker IP
});

module.exports = kafka;