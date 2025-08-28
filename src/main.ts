import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvType } from './env-validator';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        bodyParser: false,
    });
    app.use(helmet());

    const configService = app.get(ConfigService<EnvType>);

    const origin = ['https://second-brain.luisdzay.com'];
    if (configService.get('NODE_ENV') === 'development') origin.push('http://localhost:5173');
    app.enableCors({
        origin,
        credentials: true,
    });

    app.useGlobalPipes(new ValidationPipe({ validationError: { target: true } }));
    app.useGlobalPipes(new ZodValidationPipe());

    app.set('trust proxy', 1);

    await app.listen(configService.get('APP_PORT') || 3000);
}
bootstrap();
