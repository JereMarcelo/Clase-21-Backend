import dotenv from 'dotenv'
import { Command, program } from 'commander'

const program = new Command()

program
.option('--mode <mode>', "Ingrese el rol o su modo de trabajo", 'DEVELOPMENT')
program.parse()

const environment = environment === 'DEVELOPMENT' ? './.env.development' : './.env.production'
dotenv.config({ path: envFilePath })