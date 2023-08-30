import type { Tag } from "./tag";

export interface ValidationErrorContext {
  plugin_test_result: boolean;
}

export interface ValidationError {
  ctx: ValidationErrorContext & Record<string, unknown>;
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

export interface Results {
  [K: string]: {
    inputs: {
      [K in "configs"]: string;
    };
    outputs: {
      load: string;
      metadata: string | null;
      validation: ValidationResult | null;
    };
    results: {
      [K in "validation" | "load" | "metadata"]: boolean;
    };
    time: string;
    version: string | null;
  };
}
