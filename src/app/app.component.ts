import {Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  Actor: any[];
  Actress: any[];
  Director: any[];
  Editor: any[];
  ArtDirector: any[];
  CostumeDesigner: any[];
  Writer: any[];
  Genres: any[];
  Country: any[];
  Award: any[];
  Movies: any[];
  MovieDetails: any[];

  constructor(public fb: FormBuilder, private http: HttpClient) {

  }
  title = 'front-end-app';

  elements: any = [];
  isSubmitted = false;

 // actorArray: Actor[] = [];

  RequestBody = {
    actor: '',
    actress: '',
    director: '',
    editor: '',
    artDirector: '',
    costumeDesigner: '',
    writer: ''
  };

  MovieObject = {
    genre: '',
    award: '',
    country: '',
    name: ''
  };

  selectedActor = '';
  selectedActress = '';
  selectedDirector = '';
  selectedEditor = '';
  selectedArtEditor = '';
  selectedCostumeDesigner = '';
  selectedWriter = '';
  selectedGenre = '';
  selectedAward = '';
  selectedCountry = '';

  selectActor() {
    // @ts-ignore
    this.RequestBody.actor = this.selectedActor.object;
    console.log(this.selectedActor);
  }

  selectActress() {
    // @ts-ignore
    this.RequestBody.actress = this.selectedActress.object;
    console.log(this.selectedActress);
  }

  selectDirector() {
    // @ts-ignore
    this.RequestBody.director = this.selectedDirector.object;
    console.log(this.selectedDirector);
  }

  selectEditor() {
    // @ts-ignore
    this.RequestBody.editor = this.selectedEditor.object;
    console.log(this.selectedEditor);
  }

  selectArtDirector() {
    // @ts-ignore
    this.RequestBody.artDirector = this.selectedArtEditor.object;
    console.log(this.selectedArtEditor);
  }

  selectCostumeDesigner() {
    // @ts-ignore
    this.RequestBody.costumeDesigner = this.selectedCostumeDesigner.object;
    console.log(this.selectedCostumeDesigner);
  }

  selectWriter() {
    // @ts-ignore
    this.RequestBody.writer = this.selectedWriter.object;
    console.log(this.selectedWriter);
  }

  selectGenre() {
    // @ts-ignore
    this.MovieObject.genre = this.selectedGenre.object;
    console.log(this.selectedGenre);
    this.getMovieByMainAttributes();
  }

  selectCountry() {
    // @ts-ignore
    this.MovieObject.country = this.selectedCountry.object;
    console.log(this.selectedCountry);
    this.getMovieByMainAttributes();
  }

  selectAward() {
    // @ts-ignore
    this.MovieObject.award = this.selectedAward.object;
    console.log(this.selectedAward);
    this.getMovieByMainAttributes();
  }

  ngOnInit() {
     this.getActor();
     this.getActresses();
     this.getArtDirector();
     this.getCostumeDesigner();
     this.getDirector();
     this.getWriter();
     this.getEditor();
     this.getGenre();
     this.getCountry();
     this.getAward();
  }

  onSubmit() {
    this.getFilteredMovies();
  }
  getActor() {
    return this.http.get<any[]>('http://localhost:8033/getActors').subscribe(data => {
      this.Actor = data;
    }, error => {
      console.log(error);
    });
  }
  getActresses() {
    return this.http.get<any[]>('http://localhost:8033/getActresses').subscribe(data => {
      this.Actress = data;
    }, error => {
      console.log(error);
    });
  }
  getDirector() {
    return this.http.get<any[]>('http://localhost:8033/getDirectors').subscribe(data => {
      this.Director = data;
    }, error => {
      console.log(error);
    });
  }
  getArtDirector() {
    return this.http.get<any[]>('http://localhost:8033/getArtDirectors').subscribe(data => {
      this.ArtDirector = data;
    }, error => {
      console.log(error);
    });
  }
  getEditor() {
    return this.http.get<any[]>('http://localhost:8033/getEditors').subscribe(data => {
      this.Editor = data;
    }, error => {
      console.log(error);
    });
  }
  getCostumeDesigner() {
    return this.http.get<any[]>('http://localhost:8033/getCostumeDesigners').subscribe(data => {
      this.CostumeDesigner = data;
    }, error => {
      console.log(error);
    });
  }
  getWriter() {
    return this.http.get<any[]>('http://localhost:8033/getWriters').subscribe(data => {
      this.Writer = data;
    }, error1 => {
      console.log(error1);
    });
  }
  getGenre() {
    return this.http.get<any[]>('http://localhost:8033/getGenres').subscribe(data => {
      this.Genres = data;
    }, error => {
      console.log(error);
    });
  }
  getCountry() {
    return this.http.get<any[]>('http://localhost:8033/getCountry').subscribe(data => {
      this.Country = data;
    }, error => {
      console.log(error);
    });
  }
  getAward() {
    return this.http.get<any[]>('http://localhost:8033/getAwards').subscribe(data => {
      this.Award = data;
    }, error => {
      console.log(error);
    });
  }
  getFilteredMovies() {
    return this.http.post('http://localhost:8033/getFilteredMovies', JSON.stringify(this.RequestBody), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).subscribe(data => {
      this.flushMainList();
      this.populateResults(data);
    });
  }
  getMovieByMainAttributes() {
    return this.http.post<any[]>('http://localhost:8033/getMovieDetails', JSON.stringify(this.MovieObject), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).subscribe(data => {
      this.Movies = data;
      console.log(data);
    });
  }
  populateResults(results) {
    let i = 1;
    results.forEach(result => {
      this.elements.push({id: i, item: result.object});
      i++;
    });
  }
  onClickReset() {
    this.selectedActor = '';
    this.selectedActress = '';
    this.selectedDirector = '';
    this.selectedEditor = '';
    this.selectedArtEditor = '';
    this.selectedCostumeDesigner = '';
    this.selectedWriter = '';
    this.selectedAward = '';
    this.selectedGenre = '';
    this.selectedCountry = '';
    this.RequestBody.actor = '';
    this.RequestBody.actress = '';
    this.RequestBody.director = '';
    this.RequestBody.artDirector = '';
    this.RequestBody.editor = '';
    this.RequestBody.costumeDesigner = '';
    this.RequestBody.writer = '';
  }
  flushMainList() {
    this.elements.splice(0, this.elements.length);
  }
  selectMovie(movie) {
    this.MovieObject.name = movie.object;
    this.getSelectedMovieDetails();
  }
  getSelectedMovieDetails() {
    return this.http.post<any[]>('http://localhost:8033/getSelectedMovieDetails', JSON.stringify(this.MovieObject), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).subscribe(data => {
      this.MovieDetails = data;
      console.log(this.MovieDetails);
    });
  }
}
