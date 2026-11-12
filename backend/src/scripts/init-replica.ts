import mongoose from "mongoose";

const MONGO_ADMIN_URI =
  "mongodb://127.0.0.1:27017/admin?directConnection=true";

const initializeReplicaSet = async (): Promise<void> => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(MONGO_ADMIN_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("Connected to MongoDB successfully.");

    const admin = mongoose.connection.db!.admin();

    // Step 1: Check whether the replica set is already initialized.
    try {
      const status = await admin.command({
        replSetGetStatus: 1,
      });

      console.log("Replica set is already initialized.");
      console.log("Replica set name:", status.set);
      console.log(
        "Current primary:",
        status.members?.find(
          (member: { stateStr: string }) =>
            member.stateStr === "PRIMARY"
        )?.name ?? "No primary elected yet"
      );

      return;
    } catch (error: any) {
      // MongoDB error code 94 means the replica set is not initialized.
      if (error.code !== 94) {
        throw error;
      }
    }

    // Step 2: Initialize the replica set.
    console.log("Replica set is not initialized. Initializing...");

    const result = await admin.command({
      replSetInitiate: {
        _id: "rs0",
        members: [
          {
            _id: 0,
            host: "127.0.0.1:27017",
          },
        ],
      },
    });

    console.log("Replica set initialization command successful.");
    console.log(result);
    console.log("Wait a few seconds for the primary election.");
  } catch (error) {
    console.error("Replica set initialization failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
  }
};

initializeReplicaSet();