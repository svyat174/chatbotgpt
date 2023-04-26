import { Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { Context } from './interface/context.interfce';
import { ChatgptService } from 'src/chatgpt/chatgpt.service';
import { ConfigService } from '@nestjs/config';

@Update()
export class TelegramService extends Telegraf<Context> {
  constructor(
    private readonly chatgptService: ChatgptService,
    private readonly configService: ConfigService,
  ) {
    super(configService.get('TELEGRAM_API'));
  }

  @Start()
  onStart(@Ctx() ctx: Context) {
    ctx.reply(`Hello, ${ctx.from.first_name}!`);
  }

  @On('text')
  onMessage(@Message('text') text: string) {
    return this.chatgptService.generateResponse(text);
  }
}
