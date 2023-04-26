import { Ctx, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { Context } from './interface/context.interfce';

@Update()
export class TelegramService extends Telegraf<Context> {
  @Start()
  onStart(@Ctx() ctx: Context) {
    ctx.reply(`Hello, ${ctx.from.first_name}!`);
  }
}
