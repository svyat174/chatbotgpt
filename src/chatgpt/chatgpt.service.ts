import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatgptModule } from './chatgpt.module';
import { Observable, catchError, map, of } from 'rxjs';
import { IGptAnswer } from './interfaces/gpt-answer.interface';

@Injectable()
export class ChatgptService {
  private readonly logger = new Logger(ChatgptModule.name);
  private gptUrl: string;
  private apiKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.gptUrl = this.configService.get<string>('GPT_URL');
    this.apiKey = this.configService.get<string>('GPT_API');
  }

  generateResponse(content: string): Observable<string> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content }],
      temperature: 1,
    };
    return this.httpService
      .post<IGptAnswer>(this.gptUrl, data, { headers })
      .pipe(
        map(({ data }) => data.choices[0].message.content.trim()),
        catchError((err) => {
          this.logger.error(err);
          return of('Произошла ошибка');
        }),
      );
  }
}
