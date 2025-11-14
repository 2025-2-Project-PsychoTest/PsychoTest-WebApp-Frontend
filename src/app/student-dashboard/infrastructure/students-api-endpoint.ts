import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {Student} from '../domain/model/student.entity';
import {StudentResource, StudentsResponse} from './students-response';
import {StudentAssembler} from './student-assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

export class StudentsApiEndpoint extends BaseApiEndpoint<Student, StudentResource, StudentsResponse, StudentAssembler> {
  /**
   * Creates an instance of CategoriesApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.serverBasePath}${environment.studentsEndpointPath}`,
      new StudentAssembler());
  }

}
