export type ApplicationSession ={
  currentuser: string | 'system',
  role       : Role,
  isactive   : boolean,
}

export type ExperimentSession = {
  creator    : string,
  role       : Role,
  email      : string,
  slot       : RelaySlot
  duration   : TimeConfig,
  delay      : TimeConfig,
  cycles     : number,
  date       : string,
  description: string,
  timeout    : SessionTimeout,
}

export type Role = 
  | 'student'
  | 'instructor'
  | 'system'

export type TimeConfig = {
  hours  : number,
  minutes: number,
  seconds: number,
}

export type RelaySlot =
  | "Slot 1"
  | "Slot 2"
  | "Slot 3"
  | "Slot 4"
  | "Slot 5"
  | "Slot 6"
  | "Slot 7"
  | "Slot 8"

export type SessionTimeout = {
  timeoutMs: number;
  timerId: ReturnType<typeof setTimeout>;
  cancel: () => void;
  expired: boolean;
};


// Return types
//

type Ok<T> = { Ok: T }
type Err<E> = { Error: E }
export type Result<R, E>  = 
  | Ok<R>
  | Err<E>
