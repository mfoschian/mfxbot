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


function dump( ctx, field ) {
	let info = ctx[field];
	if( info ) {
		console.log( '%s:', field );
		console.table( info );
	}
}


bot.command('info', (ctx) =>  {
	dump( ctx, 'chat' );
	dump( ctx, 'from' );
	ctx.reply('ok')
})

let Auth = {
	_users: [ 211468854 ],
	allow: (x) => Auth._users.indexOf(x) >= 0
};

bot.command('priv', (ctx) =>  {
	console.log( 'priv' );
	let uid = ctx.from;

	if( ctx.from ) {
		console.log( 'from id: %s', ctx.from.id );
		if( Auth.allow(ctx.from.id) ) {
			console.log( 'ok' );
			ctx.reply('ok');
			return;
		}
	}

	console.log( 'volentieri' );
	ctx.reply('volentieri');
})



bot.launch()
