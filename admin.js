const kafka = require("./client"); // Import Kafka instance

async function init() {
  const admin = kafka.admin();

  console.log("Admin connecting...");
  await admin.connect(); // ✅ MUST await
  console.log("✅ Admin connection success");

  console.log("Creating topic [rider-updates]...");
  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates", // ✅ FIXED name
        numPartitions: 2,
      },
    ],
  });

  console.log("✅ Topic created successfully [rider-updates]");

  await admin.disconnect();
  console.log("✅ Admin disconnected");
}

init().catch((err) => {
  console.error("❌ Kafka admin error:", err);
});
