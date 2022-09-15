import { Optional } from "@angular/core";
import { Subject } from "rxjs";
import { LoggerConfig } from "./models";
import { ESError } from "./models/es-error.i";

export abstract class BaseLoggingServiceService {
  abstract errQueue$: Subject<ESError>;
  protected interval = 5000;

  constructor(@Optional() config?: LoggerConfig) {
    if (config?.interval) {
      this.interval = config.interval;
    }
  }
  abstract addErr: (err: ESError) => void;
  abstract flushErr: (err: ESError[]) => void;
}
