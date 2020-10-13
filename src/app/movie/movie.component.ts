import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service"

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor(private dbService: DatabaseService) { }

  ngOnInit(): void {
    this.onGetMovies();
  }

  section = 1;
  moviesDB: any[] = [];
  movieId: string = "";
  title: string = "";
  year: number = 0;
  aYear: number = 0;

  changeSection(sectionId) {
    this.section = sectionId;
  }

  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  onSaveMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }

  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }

  onDeleteMoviesBeforeYear() {
    this.dbService.deleteMoviesBeforeYear(this.aYear).subscribe(result => {
      this.onGetMovies();
    });
  }

  resetValues() {
    this.title = "";
    this.year = 0;
    this.movieId = "";
  }

}
