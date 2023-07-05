import { InternalRowData } from "naive-ui/es/data-table/src/interface";

import { Plugins } from "@/types/plugins";
import { Results } from "@/types/results";
export interface RowData extends InternalRowData {
  plugin: Plugins[keyof Plugins];
  result: Results[keyof Results];
}
