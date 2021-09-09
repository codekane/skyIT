import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomFilterTitleComponent } from '../../custom-filter-title.component';
import { CustomFloatingFilterTitleComponent } from '../../custom-floating-filter-title.component';
import "ag-grid-enterprise";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies:any = [];

  private frameworkComponents = { 
    customFilterTitle: CustomFilterTitleComponent,
    customFloatingFilterTitle: CustomFloatingFilterTitleComponent
  };

  columnDefs = [
    { field: 'title',
      checkboxSelection: true,
      floatingFilterComponent: "customFloatingFilterTitle" },
    { field: 'releaseDate'},
    { field: 'length'},
    { field: 'director', filter: 'agSetColumnFilter', floatingFilterComponentParams: { suppressFilterButton: false }},
    { field: 'certification'},
    { field: 'rating'}
  ]
  defaultColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
    floatingFilterComponentParams: {
      suppressFilterButton: true
    },
    suppressMenu: true,
    flex: 1
  }

  rowData!: Observable<any[]>;


  constructor(private movieService:MovieService, private http:HttpClient) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(movies => this.movies = movies)
    this.rowData = this.http.get<any[]>('https://skyit-coding-challenge.herokuapp.com/movies');
  }

  whatMovie() {
    return this.movies
  }
}
