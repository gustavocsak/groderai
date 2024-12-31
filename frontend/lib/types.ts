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

export type Student = {
  name: string;
  filename: string;
  methods: Method[];
  code_analysis: CodeAnalysis;
};

export type ApiResponse = {
  metadata: Metadata;
  students: Student[];
};
