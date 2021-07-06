export interface ParamGameProps {
  mode?: 'solo' | 'duo' | null;
  deckId?: number | null;
  time: number;
}

export class ParamGameModel implements ParamGameProps {
  mode: 'solo' | 'duo' | null;
  deckId: number | null;
  time: number;
  constructor(props: ParamGameProps) {
    this.mode = props.mode;
    this.deckId = props.deckId;
    this.time = props.time;
  }
}
