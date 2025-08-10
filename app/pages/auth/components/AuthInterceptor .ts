import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Si usas Angular Material para mostrar el mensaje

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private snackBar: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Redirigir al usuario a la página de login
          this.router.navigate(['/login']);
          // Mostrar un mensaje de sesión caducada
          this.snackBar.open('Your session has expired. Please log in again.', 'Close', {
            duration: 5000, // Duración en milisegundos
          });
        }
        return throwError(error);
      })
    );
  }
}
