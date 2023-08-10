
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MoviesService } from 'src/services/movies.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  matchSearchMovies: any[] = [];
  movTitle!: string | null
  pageNumber: number = 1
  index = 1
  currentMovTitle!: string | null; 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    protected service: MoviesService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.index == 1) {
      this.getPageNum()
      this.index--
    }
    // update search title
    this.route.paramMap.subscribe(
      params => {
        if (params.get('SearchTitle')) {
          this.movTitle = params.get('SearchTitle');
          this.currentMovTitle = this.movTitle;
        }
        return this.movTitle;
      })
     this.matchSearch();

    // no need to reload all page in order to update the page value
    this.route.params.subscribe(
      (params: Params) => {
        if (params['pageNumber']){
          this.matchSearch();
          console.log(this.currentMovTitle);
          
        }
      }
    )
  }
  matchSearch() {
    if (this.currentMovTitle !== this.movTitle){
       this.currentMovTitle = this.movTitle;
      
       this.pageNumber =1;
      this.navigateSearch()
    }

    
    this.service.getMatchSearch(this.movTitle!, this.pageNumber)
      .subscribe({
        next: (popmovies) => {
          this.matchSearchMovies = popmovies;
        },
        error: () => {
          this.showError()
        }
      });
  }

  // when switch from search and cameback
  getPageNum() {
    this.route.paramMap.pipe(
      map(params => {
        if (params.has('pageNumber') && Number(params.get('pageNumber')) >= 1) {

          return this.pageNumber = +params.get('pageNumber')!;
        }
        return this.pageNumber
      })
    ).subscribe()
  }

  previousPage() {
    this.pageNumber--;
    this.navigateSearch()
  }

  nextPage() {
    this.pageNumber++;
    this.navigateSearch()
  }

  showError() {
    this.toastr.error(" An Expected Error Occured . ", "Error", {
      easing: 'ease-in',
      easeTime: 800
    })
  }

  navigateSearch() {
    this.router.navigate(['search', this.movTitle, this.pageNumber])
  }

  returnPopularPage() {
    this.router.navigate(['', 1]
    )
  }
  increaseIndex() {
    this.index++
  }

}


