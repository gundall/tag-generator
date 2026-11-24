import type { ColorPair } from "./color-pair";

export type Tag = Readonly<
  {
    text: string;
  } & ColorPair
>;
