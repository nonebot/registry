import type { InternalRowData } from "naive-ui/es/data-table/src/interface";

import type { Plugins } from "@/types/plugins";
import type { Results } from "@/types/results";
export interface RowData extends InternalRowData {
  plugin: Plugins[keyof Plugins];
  result: Results[keyof Results];
}
