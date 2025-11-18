import 'dotenv/config';
import express from 'express';
import { Client, GatewayIntentBits } from 'discord.js';

const app = express();
const port = process.env.PORT || 3000;

// Parse JSON from Roblox
app.use(express.json());

// Discord bot setup
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once('ready', () => {
    console.log(`Discord bot logged in as ${client.user.tag}`);
});

// Endpoint for Roblox script to call
app.post('/promote', async (req, res) => {
    const username = req.body.username;
    if (!username) return res.status(400).send('Missing username');

    try {
        const channel = client.channels.cache.get(process.env.CHANNEL_ID);
        if (!channel) return res.status(500).send('Channel not found');

        await channel.send(`/promote ${username}`);
        console.log(`Sent /promote command for ${username}`);
        res.send(`Promote command sent for ${username}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error sending promote command');
    }
});

// Log in to Discord
client.login(process.env.DISCORD_TOKEN);

// Start HTTP server
app.listen(port, () => {
    console.log(`Render server listening on port ${port}`);
});
