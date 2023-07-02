export interface Results {
  [K: string]: {
    time: string;
    version: string | null;
    inputs: {
      [K in "configs"]: string;
    };
    results: {
      [K in "validation" | "load" | "metadata"]: boolean;
    };
    outputs: {
      [K in "validation" | "load" | "metadata"]: string;
    };
  };
}
