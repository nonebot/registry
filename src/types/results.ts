import type { Tag } from "./tag";

export interface ValidationError {
  ctx: Record<string, unknown>;
  loc: string[];
  msg: string;
  type: string;
}

export interface ValidationResultData {
  author: string;
  is_official: boolean;
  module_name: string;
  project_link: string;
  tags: Tag[];
}

export interface ValidationResult {
  data: ValidationResultData & Record<string, unknown>;
  errors: Array<ValidationError>;
}

export interface Metadata {
  name: string;
  description: string;
  usage: string;
  type: string | null;
  homepage: string | null;
  supported_adapters: string[] | null;
}

export interface Results {
  [K: string]: {
    inputs: {
      [K in "configs"]: string;
    };
    outputs: {
      load: string;
      metadata: Metadata | null;
      validation: ValidationResult | null;
    };
    results: {
      [K in "validation" | "load" | "metadata"]: boolean;
    };
    time: string;
    version: string | null;
  };
}
