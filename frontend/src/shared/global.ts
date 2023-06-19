import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

export const BASE_URL= 'http://localhost:3000';

export function createAuthorizationHeader() {
  const headers = new HttpHeaders();
  return headers.set('authorization', 'bearer ' + (localStorage.getItem('token') || ''));
}

export function AutoLogout(): void {
  const arr = ['token', 'userId'];
      arr.forEach((i) => {
        localStorage.removeItem(i);
      });
      window.location.href = '';
    }

export function handleReponse(response: any) {
  if(response.status === 401){
    AutoLogout();
  }else if(response.status === 500){
    window.alert('Bad Request');
  }else{
    return;
  }
}


