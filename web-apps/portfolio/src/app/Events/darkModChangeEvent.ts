export interface DarkModChangeEventDetails {
  state: boolean;
}
export class DarkModChangeEvent extends CustomEvent<DarkModChangeEventDetails> {
  public static eventName = 'darkModChange';
  constructor(eventname: string, state: boolean) {
    super(eventname, { detail: { state }, bubbles: true, composed: true });
  }
}
