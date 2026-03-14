require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');
const client = new Client();

const { TOKEN, TARGET_USER_ID, TARGET_TYPE, TARGET_ID, REPLY_DELAY } = process.env;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    console.log(`Targeting User: ${TARGET_USER_ID}`);
    console.log(`Mode: ${TARGET_TYPE} | Delay: ${REPLY_DELAY}ms`);
});

client.on('messageCreate', async (message) => {
    if (message.author.id !== TARGET_USER_ID) return;
    let shouldReply = false;

    if (TARGET_TYPE === 'dm') {
        if (message.channel.type === 'DM') shouldReply = true;
    } else {
        if (message.channel.id === TARGET_ID) shouldReply = true;
    }

    if (shouldReply) {
        console.log(`User said: "${message.content}". Waiting ${REPLY_DELAY}ms to reply...`);
        
        setTimeout(async () => {
            try {

                await message.reply(message.content);
            } catch (err) {
                console.error("Failed to reply:", err.message);
            }
        }, parseInt(REPLY_DELAY));
    }
});

client.login(TOKEN);
