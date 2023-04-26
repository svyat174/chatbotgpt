import { ConfigService } from '@nestjs/config';
import {
  TelegrafModuleAsyncOptions,
  TelegrafModuleOptions,
} from 'nestjs-telegraf';

export const telegramModuleOptions = (
  configService: ConfigService,
): TelegrafModuleOptions => {
  return {
    token: configService.get('TELEGRAM_API'),
  };
};

export const options = (): TelegrafModuleAsyncOptions => {
  return {
    inject: [ConfigService],
    useFactory: (configService: ConfigService) =>
      telegramModuleOptions(configService),
  };
};
