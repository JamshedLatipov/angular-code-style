import { Subject } from 'rxjs';

export interface IUnsubscribe {
  readonly unSubscribe$: Subject<void>;
}
