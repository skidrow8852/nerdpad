import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { api } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
    }

    // Extract headers
    const svix_id = request.headers.get("svix-id");
    const svix_signature = request.headers.get("svix-signature");
    const svix_timestamp = request.headers.get("svix-timestamp");

    // Check if headers are missing
    if (!svix_id || !svix_signature || !svix_timestamp) {
      return new Response("Error occurred -- missing svix headers", {
        status: 400,
      });
    }

    // Parse the request body
    const payload = await request.json();
    const body = JSON.stringify(payload);

    // Initialize Svix Webhook object for verification
    const wh = new Webhook(webhookSecret);
    let evt: WebhookEvent;

    // Verify the webhook signature
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response(`Error occurred: ${err}`, { status: 400 });
    }

    // Handle the event
    const eventType = evt.type;
    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name } = evt.data;

      const email = email_addresses[0].email_address;
      const name = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        // Run mutation to sync user data
        await ctx.runMutation(api.users.syncUser, {
          userId: id,
          email,
          name,
        });
      } catch (error) {
        console.log("Error creating user:", error);
        return new Response("Error creating user", { status: 500 });
      }
    }

    return new Response("Webhook processed successfully", { status: 200 });
  }),
});

export default http;
