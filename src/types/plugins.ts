import type { Tag } from "@/types/tag";

export interface Plugin {
  author: string;
  desc: string;
  homepage: string;
  is_official: boolean;
  module_name: string;
  name: string;
  project_link: string;
  skip_test: boolean;
  supported_adapters: string[] | null;
  tags: Array<Tag>;
  time: string;
  type: string;
  valid: boolean;
  version: string;
}

export type PluginsResponse = Array<Plugin>;

export interface Plugins {
  [K: string]: Plugin;
}
