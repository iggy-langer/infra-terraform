export interface TerraformModule {
  name: string;
  source: string;
  version?: string;
  variables?: Record<string, any>;
}

export interface TerraformProvider {
  name: string;
  source: string;
  version?: string;
  config?: Record<string, any>;
}

export interface TerraformResource {
  type: string;
  name: string;
  config: Record<string, any>;
}

export interface TerraformOutput {
  name: string;
  value: string | number | boolean | Record<string, any>;
  description?: string;
}

export interface TerraformPlan {
  modules: TerraformModule[];
  providers: TerraformProvider[];
  resources: TerraformResource[];
  outputs: TerraformOutput[];
}

export interface TerraformState {
  version: number;
  terraformVersion: string;
  serial: number;
  lineage: string;
  outputs: Record<string, any>;
  resources: TerraformResource[];
}

export interface TerraformConfig {
  requiredProviders: TerraformProvider[];
  modules: TerraformModule[];
  resources: TerraformResource[];
  outputs: TerraformOutput[];
}