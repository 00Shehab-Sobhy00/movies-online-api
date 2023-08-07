import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthInterceptorService } from 'src/services/auth-interceptor.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieDetailsComponent,
    NotFoundComponent,
    SearchComponent,

  ],
  imports: [
    BrowserModule, HttpClientModule, MatCardModule, MatButtonModule, BrowserAnimationsModule, NgbModule, FormsModule,
    RouterModule.forRoot([

      { path: '', component: HomeComponent },
      { path: ':pageNumber', component: HomeComponent },
      { path: 'search/:SearchTitle/:pageNumber', component: SearchComponent },
      { path: 'details/:pageNumber/:movieId', component: MovieDetailsComponent },
      { path: '**', component: NotFoundComponent },

    ]),
    ToastrModule.forRoot({
      positionClass: "toast-center-center",
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
