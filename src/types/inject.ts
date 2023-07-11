import type { InjectionKey } from "vue";

export const CopyText = Symbol("CopyText") as InjectionKey<
  (text: string, show?: string) => void
>;
