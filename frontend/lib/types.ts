export type CodeAnalysis = {
  documentation: string[];
  linting_errors: string[];
  missing_requirements: string[];
  readability: string[];
  restricted_usage: string[];
};

export type Metadata = {
  description: string;
  language: string;
  requirements: string[];
  title: string;
};

export type Method = {
  errors: string[];
  expected_prototype: string;
  is_correct: boolean;
  is_documented: boolean;
  prototype: string | "N/A";
  time_complexity: string;
};

export type ApiResponse = {
  code_analysis: CodeAnalysis;
  metadata: Metadata;
  methods: Method[];
};
