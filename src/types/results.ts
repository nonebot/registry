export interface PluginData {
  module_name: string;
  project_link: string;
  name: string;
  desc: string;
  author: string;
  homepage: string;
  tags: unknown[];
  is_official: boolean;
  type: string;
  supported_adapters: string[];
  valid: boolean;
  time: string;
}

export interface Results {
  [K: string]: {
    time: string;
    version: string | null;
    results: {
      [K in "validation" | "load" | "metadata"]: string;
    };
    outputs: {
      [K in "validation" | "load" | "metadata"]: string;
    };
    plugin: {
      old: PluginData;
      new: PluginData | null;
    };
  };
}
