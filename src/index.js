import { getRSSFeeds, getRecipients } from "./db.js";
import { fetchFeedItems } from "./rss.js";
import { sendEmail } from "./email.js";

async function main() {
    try {
        const feedUrls = await getRSSFeeds();
        const items = await fetchFeedItems(feedUrls);
        const recipients = await getRecipients();

        if (items.length === 0) {
            console.log("No feed items to send.");
            return;
        }

        if (recipients.length === 0) {
            console.log("No recipients to send to.");
            return;
        }

        await sendEmail(recipients, items);
        console.log("Emails sent successfully!");
    } catch (err) {
        console.error("Error:", err);
    }
}

main();
