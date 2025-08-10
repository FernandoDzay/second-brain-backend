import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bodyParser: false,
    });

    app.enableCors({
        origin: (origin, callback) => {
            callback(null, origin || '*');
        },
        credentials: true,
    });

    await app.listen(3000);
}
bootstrap();
