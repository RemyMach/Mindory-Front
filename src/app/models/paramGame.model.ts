export interface ParamGameProps {
  mode?: 'solo' | 'duo' | null;
  deckId?: number | null;
  time: number;
  link?: string;
}

export class ParamGameModel implements ParamGameProps {
  mode: 'solo' | 'duo' | null;
  deckId: number | null;
  time: number;
  link: string;
  constructor(props: ParamGameProps) {
    this.mode = props.mode;
    this.deckId = props.deckId;
    this.time = props.time;
    this.link = props.link;
  }
}
