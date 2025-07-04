use MycortexMDM;

const setupMDM = async () => {
  try {
    await db.createUser({
      user: "MycortexMDMApplication",
      pwd: "Mycortex4520@123",
      roles: ["readWrite"]
    });
    await db.auth("MycortexMDMApplication", "Mycortex4520@123");
    await db.createCollection("MDMmanagement");
    await db.MDMmanagement.insertOne({ "name": "John Doe", "age": 30 });
    const result = await db.MDMmanagement.find().pretty();
    print(result);
  } catch (error) {
    print(error);
  }
};

setupMDM();
