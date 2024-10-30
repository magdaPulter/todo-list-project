import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environment/environment';

export const servicesUtils = {
  headers: new HttpHeaders().set(
    `Authorization`,
    `Bearer 23c109ece8896fe9b8c55fae14c29cdd327373ab`
    // `Bearer ${environment.TOKEN}`
  ),
  url: 'https://api.todoist.com/rest/v2',
};
