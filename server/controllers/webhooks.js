import { Webhook } from "svix";
import User from "../models/User.js";

// API controller Function to Manage Clerk User With Database
export const clerkWebhooks = async (req, res) => {
  try {
    const payload = JSON.stringify(req.body);
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify and get the event data
    const evt = wh.verify(payload, headers);
    const { data, type } = evt;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url || data.profile_image_url, // Fallback to profile_image_url if image_url is missing
          resume: "", // Placeholder for the resume field
        };

        // Check if the user already exists to avoid duplicate entries
        const existingUser = await User.findById(data.id);
        if (!existingUser) {
          await User.create(userData);
          console.log("User created:", userData);
        } else {
          console.log("User already exists:", data.id);
        }
        break;
      }

      case "user.updated": {
        const updatedData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url || data.profile_image_url,
        };
        await User.findByIdAndUpdate(data.id, updatedData);
        console.log("User updated:", updatedData);
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log("User deleted:", data.id);
        break;
      }

      default:
        console.log("Unhandled event type:", type);
        break;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error processing webhook:", error.message); // Log any errors
    res.status(400).json({ success: false, message: "Webhook processing failed" });
  }
};
