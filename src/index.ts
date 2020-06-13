// tslint:disable-next-line: no-submodule-imports
import 'module-alias/register';

import dotenv from 'dotenv';
import minimist from 'minimist';

import { MovieController } from '@controllers/MovieController';

import { App } from './app';
import { TestController } from './controllers';

dotenv.config();
const processArguments: any = minimist(process.argv);

// tslint:disable-next-line: no-string-literal
const isDev = processArguments["dev"];

const app = new App(
  [
    new MovieController(),
    new TestController(),
  ],
  3030,
  isDev
);

app.listen();