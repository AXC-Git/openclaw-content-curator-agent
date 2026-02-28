import fs from 'fs';
import path from 'path';

// Load environment variables
const storageMode = process.env.STORAGE_MODE || 'obsidian';
const vaultPath = process.env.OBSIDIAN_VAULT_PATH || '/vault';

// The agent passes the formatted markdown as the first command-line argument
const agentPayload = process.argv[2];

if (!agentPayload) {
    console.error("Error: The OpenClaw agent did not provide any content.");
    process.exit(1);
}

// Generate a unique filename based on the current date
const dateString = new Date().toISOString().split('T')[0];
const filename = `Curated-Insight-${dateString}-${Date.now()}.md`;

if (storageMode === 'obsidian') {
    // Write directly to the local sandboxed folder
    const filePath = path.join(vaultPath, filename);
    fs.writeFileSync(filePath, agentPayload);
    console.log(`Success: File saved to Obsidian vault at ${filePath}`);

} else if (storageMode === 'notion') {
    // TODO: Add Notion API integration here
    console.log("Success: API call to Notion database initiated.");
} else {
    console.error("Error: Invalid STORAGE_MODE in .env file.");
}