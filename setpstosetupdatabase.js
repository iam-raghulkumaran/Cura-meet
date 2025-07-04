use MycortexVideoConference;

const setupDatabase = async () => {
  try {
    await db.createUser({
      user: "Mycortex",
      pwd: "Mycortex7890@123",
      roles: ["readWrite"]
    });
    await db.auth("Mycortex", "Mycortex7890@123");
    await db.createCollection("cortexCollection");
    await db.cortexCollection.insertOne({ "name": "John Doe", "age": 30 });
    const result = await db.cortexCollection.find().pretty();
    print(result);
  } catch (error) {
    print(error);
  }
};

setupDatabase();
