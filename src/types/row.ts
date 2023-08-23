import type { Plugins } from "@/types/plugins";
import type { Results } from "@/types/results";
export interface RowData {
  plugin: Plugins[keyof Plugins];
  result: Results[keyof Results];
}
