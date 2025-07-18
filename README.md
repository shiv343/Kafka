# KafkaJS Playground

This project demonstrates how to connect to **Apache Kafka** using **KafkaJS** in Node.js.

It includes:  
- ✅ `client.js` → Kafka client configuration  
- ✅ `admin.js` → Admin script to connect and create topics  
- (Planned) `producer.js` & `consumer.js` → for producing & consuming messages  

---

## 🚀 Prerequisites

1. **Node.js** ≥ 16  
2. **Docker** (to run Kafka + Zookeeper easily)  
3. Yarn or npm  

---

## 🐳 1. Start Kafka & Zookeeper with Docker

Create a `docker-compose.yml` (optional) OR run manually:

```bash
# Create a shared network
docker network create kafka-net

# Start Zookeeper
docker run -d \
  --name zookeeper \
  --network kafka-net \
  -p 2181:2181 \
  -e ZOOKEEPER_CLIENT_PORT=2181 \
  confluentinc/cp-zookeeper:7.3.2

# Start Kafka
docker run -d \
  --name kafka \
  --network kafka-net \
  -p 9092:9092 \
  -e KAFKA_BROKER_ID=1 \
  -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \
  -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://192.168.1.37:9092 \
  -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
  confluentinc/cp-kafka:7.3.2
```

Check if Kafka is running:

```bash
docker ps
```

---

## 📦 2. Install dependencies

Inside the project folder:

```bash
yarn config set nodeLinker node-modules   # Only for Yarn v4+
yarn install
yarn add kafkajs
```

Or with npm:

```bash
npm install kafkajs
```

---

## 📂 3. Project Structure

```
Kafka/
 ├── client.js   # Kafka client configuration
 ├── admin.js    # Creates topics
 ├── producer.js # (Planned) Send messages
 └── consumer.js # (Planned) Read messages
```

---

## 🛠 4. Configure Kafka Client

In `client.js`:

```js
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["192.168.1.37:9092"], // Update with your broker IP
});

module.exports = kafka;
```

---

## 🎯 5. Create Kafka Topics

Run the admin script:

```bash
node admin.js
```

It will:

✅ Connect to Kafka  
✅ Create topic `rider-updates` with 2 partitions  
✅ Disconnect cleanly  

Expected output:

```
Admin connecting...
✅ Admin connection success
Creating topic [rider-updates]...
✅ Topic created successfully [rider-updates]
✅ Admin disconnected
```

---

## 🚧 Next Steps

- `producer.js` → Send test messages to `rider-updates`  
- `consumer.js` → Read messages from `rider-updates`  

---

## 🔗 References

- [KafkaJS Docs](https://kafka.js.org/)  
- [Confluent Kafka Docker Images](https://hub.docker.com/r/confluentinc/cp-kafka)  
