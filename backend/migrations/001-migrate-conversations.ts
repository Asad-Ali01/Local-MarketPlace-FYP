import "dotenv/config";
import mongoose from "mongoose";
import { Conversation } from "../src/models/conversation.model";
async function migration() {
  try {
    let mongoDbUri = process.env.MONGODB_URI;
    if (mongoDbUri) {
      console.log("MongoDB uri: ", mongoDbUri);
    }
    await mongoose.connect(`${mongoDbUri}`);

    const result = await Conversation.updateMany(
      { "members.0": { $type: "objectId" } },

      [
        {
          $set: {
            members: {
              $map: {
                input: "$members",
                as: "member",
                in: {
                  user: "$$member",
                  lastReadMessage: null,
                  lastReadAt: null,
                },
              },
            },
          },
        },
      ],
      {
        updatePipeline: true,
      },
    );

    console.log("Migration Completed");
    console.log("Matched Documents: ", result.matchedCount);
    console.log("Modified Documents: ", result.modifiedCount);
  } catch (error) {
    console.error("Migration failed: ", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from mongoDb");
  }
}

migration()
  .then(() => {
    console.log("Successfully migrated");
  })
  .catch(() => {
    console.log("Migration failed");
  });
