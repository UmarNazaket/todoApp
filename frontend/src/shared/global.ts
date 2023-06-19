import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

export const BASE_URL= 'http://localhost:3000';

export function createAuthorizationHeader() {
  const headers = new HttpHeaders();
  return headers.set('authorization', 'bearer ' + (localStorage.getItem('token') || ''));
}

export function AutoLogout(err: any): void {
  const arr = ['token', 'userId'];
  if (err instanceof HttpErrorResponse) {
    if (err.status === 401) {
      arr.forEach((i) => {
        localStorage.removeItem(i);
      });

      window.location.href = '';
    }
  }
}


