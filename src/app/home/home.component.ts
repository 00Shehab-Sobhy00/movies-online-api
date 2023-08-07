import { map } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MoviesService } from 'src/services/movies.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
//popular
export class HomeComponent implements OnInit {
  popularMovies: any[] = []
  movieTitle!: string
  pageNumber!: number
  index = 1

  constructor(
    protected service: MoviesService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.index == 1) {
      this.getcurrentPage()
      this.index--
      
    }
    this.getHomePage()

    this.route.params.subscribe(
      (params: Params) => {
        if (params['pageNumber'])
          this.getHomePage()
      }
    )
  }

  getHomePage() {
    if (!Number.isNaN(this.pageNumber))
    return this.service.getPopular(this.pageNumber).pipe(
      map(params => {
        this.popularMovies = params;
        // console.log(params);
      })
    ).subscribe({
      error: () => {
        this.showError()
      }
    });
    return this.router.navigate(['**'], { relativeTo: this.route });
  }
  
  
  getSearchMovies() {
    if (this.movieTitle)
      this.router.navigate(['/search', this.movieTitle, 1], { relativeTo: this.route });
  }


  navigateToHome() {
    this.router.navigate(['/', this.pageNumber], { relativeTo: this.route })
  }

  getcurrentPage() {
    this.route.paramMap.subscribe(
      params => {
        if (+params.get('pageNumber')! == 0)
          return this.pageNumber = 1

        return this.pageNumber = +params.get('pageNumber')!
      }
    )
  }

  previousPage() {
    this.pageNumber--;
    this.navigateToHome()

  }
  nextPage() {
    this.pageNumber++;
    this.navigateToHome()
  }

  showError() {
    this.toastr.error(" An Expected Error Occured . ", "Error", {
      easing: 'ease-in',
      easeTime: 800
    })
  }

  increaseIndex() {
    this.index++
  }

}






