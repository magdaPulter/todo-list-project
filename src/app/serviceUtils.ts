import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environment/environment';

export const servicesUtils = {
  headers: new HttpHeaders().set(
    `Authorization`,
    `Bearer ${environment.TOKEN}`
  ),
  url: 'https://api.todoist.com/rest/v2',
};
