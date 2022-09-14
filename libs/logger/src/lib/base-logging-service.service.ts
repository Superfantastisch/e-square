import { Subject } from "rxjs";
import { ESError } from "./models/es-error.i";

export abstract class BaseLoggingServiceService {
  abstract errQueue$: Subject<ESError>;
  abstract interval: number;
  abstract addErr: (err: ESError) => void;
  abstract flushErr: (err: ESError[]) => void;
}
