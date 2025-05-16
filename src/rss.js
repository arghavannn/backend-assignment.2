import pkg from "pg";
import { DATABASE_URL } from "./config.js";

import Parser from "rss-parser";
const parser = new Parser();
/* I USE AI IN THIS PART BECAUSE CALLING FROM DATABASE WAS NEW FOR US AND TEACHER KET US TI USE AI*/
const { Pool } = pkg;
const pool = new Pool({
    connectionString: DATABASE_URL,
});

export async function getRSSFeeds() {
    const res = await pool.query("SELECT rss_url FROM rss_feeds");
    return res.rows.map((row) => row.rss_url);
}

export async function getRecipients() {
    const res = await pool.query("SELECT email FROM recipients");
    return res.rows.map((row) => row.email);
}

export async function fetchFeedItems(feedUrls) {
    const allItems = [];

    for (const url of feedUrls) {
        try {
            const feed = await parser.parseURL(url);
            allItems.push(...feed.items);
        } catch (err) {
            console.error(`Failed to fetch ${url}:`, err.message);
        }
    }

    return allItems;
}
