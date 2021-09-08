import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://skyit-coding-challenge.herokuapp.com/movies';

  constructor(private http:HttpClient) { }

  getMovies() {
    return this.http.get(this.apiUrl)
  }

}
