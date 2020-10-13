import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service"

@Component({
  selector: 'app-movie-actor',
  templateUrl: './movie-actor.component.html',
  styleUrls: ['./movie-actor.component.css']
})
export class MovieActorComponent implements OnInit {

  constructor(private dbService: DatabaseService) { }

  ngOnInit(): void {
    this.onGetMovies();
    this.onGetActors();
  }

  moviesDB: any[] = [];
  actorsDB: any[] = [];
  title: string = "";
  year: number = 0;
  actorId: string = "";
  fullName: string = "";
  bYear: number = 0;
  movieId: string = "";

  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  onSelectMovieUpdate(item) {
    this.title = item.title;
    this.year = item.year;
    this.movieId = item._id;
  }

  onSelectActorUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }

  onAddMovieActor() {
    let obj = {id: this.actorId};
    this.dbService.addMovieActor(this.movieId,obj).subscribe(result => {
      this.onGetMovies();
    });
  }

}
