import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  imgUrl = "https://image.tmdb.org/t/p/w500/"
  constructor(private http: HttpClient, private router: Router,
    private route: ActivatedRoute
    ) { }

  getPopular(pageNumber: number) {
    console.log(pageNumber);
    
    return this.http.get(`https://api.themoviedb.org/3/movie/popular?a73db5ffd7647dd5bf529319baf15248language=en-US&page=${pageNumber}`)
      .pipe(
        map((response) => {
          let popularMovies: any[] = [];
          popularMovies = Object.assign(response).results;
          return popularMovies
        })
      )
  }


  getMatchSearch(movTitle: string, pageNumber: number) {
    return this.http.get(`https://api.themoviedb.org/3/search/movie?query=${movTitle}&include_adult=false&page=${pageNumber}`)
      .pipe(
        map(respon => {
          console.log(respon);
          
         if(Object.assign(respon).total_results == 0 )
         this.router.navigate(['**'] ,{ relativeTo: this.route })        
        // OR
        // if (JSON.stringify(Object.assign(respon).results).length == 2 )
        //  this.router.navigate(['**'])
        let matchSearchMovies: any[] = [];
        matchSearchMovies = Object.assign(respon).results;
        return matchSearchMovies
        }))
  }


  getMovieActors(movieId: number) {
    return this.http.get(` https://api.themoviedb.org/3/movie/${movieId}/credits`)
      .pipe(
        map(response => {
          // console.log(response);

     let fistThreeActors
    Object.keys(Object.assign(response).cast)
          fistThreeActors =  Object.values(Object.assign(response).cast).slice(0,3)
           console.log(fistThreeActors);

          return fistThreeActors;
        })
      )
  }



}
