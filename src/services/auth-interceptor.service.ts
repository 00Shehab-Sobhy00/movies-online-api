import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor{

    intercept  (req: HttpRequest<any>, next  : HttpHandler){
        const authReq = req.clone({
            headers: new HttpHeaders({
              'Authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzNkYjVmZmQ3NjQ3ZGQ1YmY1MjkzMTliYWYxNTI0OCIsInN1YiI6IjVkNDA0OTAyOWNjNjdiMDAxMTc3NDU3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Cpm4fTaTqE_2ZcYqE1f7b-n5sVNrRvzg8tXrqdw_KvI',
              'accept': 'application/json'
            })
          });
          
    // console.log('Intercepted HTTP call', authReq);

    return next.handle(authReq)
    }
}