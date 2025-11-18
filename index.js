const noblox = require("noblox.js");
const express = require("express");
const app = express();
app.use(express.json());

async function startBot() {
    await noblox.setCookie(process.env.ROBLOX_COOKIE);
    console.log("Bot is online!");
}

app.post("/rank", async (req, res) => {
    try {
        const userId = req.body.userId;
        const rank = req.body.rank;

        await noblox.setRank(process.env.GROUP_ID, userId, rank);

        res.send("Rank updated!");
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

startBot();
app.listen(10000);
