import { Command, CommandRunner, Option } from 'nest-commander';
import { AuthService } from '../auth/auth.service';

// Dev run:  npx ts-node src/main.command.ts create-user --email test@example.com --name Testing --password 123456
// Prod run: node dist/main.command.js create-user --email test@example.com --name Testing --password 123456

interface CreateUserCommandOptions {
    email: string;
    name: string;
    password: string;
}

@Command({
    name: 'create-user',
    description: 'Crea un usuario manualmente',
})
export class CreateUserCommand extends CommandRunner {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async run(_: string[], options: CreateUserCommandOptions): Promise<void> {
        const { email, name, password } = options;
        if (!email || !password || !name) {
            console.error('Faltan parámetros: --email, --name y --password');
            process.exit(1);
        }

        await this.authService.createUser(email, name, password);
        console.log(`✅ Usuario ${email} creado correctamente`);
        process.exit(1);
    }

    @Option({
        flags: '-e, --email <email>',
        description: 'Correo del usuario',
    })
    parseEmail(val: string): string {
        return val;
    }

    @Option({
        flags: '-e, --name <name>',
        description: 'Nombre completo del usuario',
    })
    parseName(val: string): string {
        return val;
    }

    @Option({
        flags: '-p, --password <password>',
        description: 'Contraseña del usuario',
    })
    parsePassword(val: string): string {
        return val;
    }
}
