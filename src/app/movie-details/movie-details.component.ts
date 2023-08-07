import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { MoviesService } from 'src/services/movies.service';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  title!: string | null
  rate!: string | null
  overview!: string | null
  poster_path!: string | null

  searchResult!: string | null
  pageNumber!: number
  movieId!: number

  actors : any

  constructor(private route: ActivatedRoute,
    private router: Router,
    public service: MoviesService
  ) { }
  ngOnInit(): void {

    this.route.paramMap.subscribe(
      params => {
        this.pageNumber = Number(params.get('pageNumber'))
        this.movieId = +params.get('movieId')!

      }
    )
     this.movieActors()

    this.route.queryParamMap.pipe(
      map((resp => {

        this.title = resp.get('title')
        this.rate = resp.get('rate')
        this.overview = resp.get('overview')
        this.poster_path = resp.get('poster_path')

        this.searchResult = resp.get('SearchTitle')
      }))
    ).subscribe()

  }

   movieActors() {
    this.service.getMovieActors(this.movieId).subscribe(
      response=>{
        this.actors = response
      }
    )
 
   }



  currentSearchPage() {
    console.log(this.searchResult);
    console.log(this.pageNumber);
    
    this.router.navigate(['/search', this.searchResult, this.pageNumber])
    
  }


  returnPopularPage() {

    if (this.searchResult)
      this.router.navigate(['', 1])

    if (this.searchResult == null)
      this.router.navigate(['', this.pageNumber])


  }
}
