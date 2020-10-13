import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movieAng';

  page = 'Actor';

  changePage() {
    if (this.page == 'Actor') {
      this.page = 'Movie';
    } else if (this.page == 'Movie') {
      this.page = 'MovieActor';
    } else if (this.page == 'MovieActor') {
      this.page = 'Actor';
    }
  }
}
