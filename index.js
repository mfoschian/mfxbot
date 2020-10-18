const { Telegraf } = require('telegraf')

const TOKEN = process.env.BOT_TOKEN;

const bot = new Telegraf(TOKEN)
bot.start( (ctx) => {
	if( ctx.message ) {
		console.table( ctx.message );
		if( ctx.message.entities ) {
			console.table( ctx.message.entities );
		}
	}
	if( ctx.inlineQuery ) {
		console.table( ctx.inlineQuery );
	}
	ctx.reply('Welcome')
});

bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears(/hi/i, (ctx) => ctx.reply('Hey there'))


bot.command('oldschool', (ctx) => ctx.reply('Hello'))
bot.command('modern', ({ reply }) => reply('Yo'))
bot.command('hipster', Telegraf.reply('λ'))
bot.launch()
