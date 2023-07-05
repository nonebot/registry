import { Tag } from "@/types/tag";

export interface Plugins {
  [K: string]: {
    module_name: string;
    project_link: string;
    name: string;
    desc: string;
    author: string;
    homepage: string;
    tags: Array<Tag>;
    is_official: boolean;
    type: string;
    supported_adapters: string[];
    valid: boolean;
    time: string;
  };
}
