import { BaseResponse, BaseResource } from '../../shared/infrastructure/base-response';

export interface StudentsResponse extends BaseResponse {
  students: StudentResource[];
}

export interface StudentResource extends BaseResource {
  id: number;
  fullName: string;
  userType: string;
  progress: ProgressResource;
  recommendedCareers: CareerResource[];
}

export interface ProgressResource {
  overallPercentage: number;
  tests: TestResource[];
}

export interface TestResource {
  name: string;
  status: string;
  completionDate?: string;
  estimatedTime?: string;
}

export interface CareerResource {
  name: string;
  description: string;
  compatibilityPercentage: number;
}

