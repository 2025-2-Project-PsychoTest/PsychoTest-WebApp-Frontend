import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Student } from '../domain/model/student.entity';
import { Progress } from '../domain/model/progress.entity';
import { Career } from '../domain/model/career.entity';
import { Test } from '../domain/model/test.entity';
import {
  StudentResource,
  StudentsResponse,
  ProgressResource,
  CareerResource,
  TestResource
} from './students-response';

export class StudentAssembler implements BaseAssembler<Student, StudentResource, StudentsResponse> {

  toEntityFromResource(resource: StudentResource): Student {
    return new Student({
      id: resource.id,
      fullName: resource.fullName,
      userType: resource.userType,
      progress: this.toProgressEntity(resource.progress),
      recommendedCareers: resource.recommendedCareers.map(c => this.toCareerEntity(c))
    });
  }

  toResourceFromEntity(entity: Student): StudentResource {
    return {
      id: entity.id,
      fullName: entity.fullName,
      userType: entity.userType,
      progress: this.toProgressResource(entity.progress),
      recommendedCareers: entity.recommendedCareers.map(c => this.toCareerResource(c))
    };
  }

  toEntitiesFromResponse(response: StudentsResponse): Student[] {
    return response.students.map(resource => this.toEntityFromResource(resource));
  }

  private toProgressEntity(resource: ProgressResource): Progress {
    return new Progress({
      overallPercentage: resource.overallPercentage,
      tests: resource.tests.map(t => this.toTestEntity(t))
    });
  }

  private toProgressResource(entity: Progress): ProgressResource {
    return {
      overallPercentage: entity.overallPercentage,
      tests: entity.tests.map(t => this.toTestResource(t))
    };
  }

  private toTestEntity(resource: TestResource): Test {
    return new Test({
      name: resource.name,
      status: resource.status,
      completionDate: resource.completionDate,
      estimatedTime: resource.estimatedTime
    });
  }

  private toTestResource(entity: Test): TestResource {
    return {
      name: entity.name,
      status: entity.status,
      completionDate: entity.completionDate,
      estimatedTime: entity.estimatedTime
    };
  }

  private toCareerEntity(resource: CareerResource): Career {
    return new Career({
      name: resource.name,
      description: resource.description,
      compatibilityPercentage: resource.compatibilityPercentage
    });
  }

  private toCareerResource(entity: Career): CareerResource {
    return {
      name: entity.name,
      description: entity.description,
      compatibilityPercentage: entity.compatibilityPercentage
    };
  }
}

