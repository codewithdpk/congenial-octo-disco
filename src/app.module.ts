import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaModule } from 'nestjs-prisma';
import { PreAuthMiddleware } from './middlerware/AuthGaurd';
import { ScrapModule } from './scrap/scrap.module';

@Module({
  imports: [PrismaModule.forRoot(), ScrapModule],
  controllers: [],
  providers: [PrismaClient],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(PreAuthMiddleware).forRoutes({
      path: 'shorten/new',
      method: RequestMethod.POST,
    });
  }
}
