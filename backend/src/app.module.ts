import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { RequestMiddleware } from './common/request-logging/request.middleware';
import { ShuttingDownHook } from './common/shuttingdown-hook';
import { typeormConfig } from './config/datasource';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    // Event Emitter
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      global: true,
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 20, // 20 requests per minute per IP
      },
    ]),

    // Database connection
    TypeOrmModule.forRoot(typeormConfig),

    UsersModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [
    ShuttingDownHook,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestMiddleware).forRoutes('*');
  }
}
