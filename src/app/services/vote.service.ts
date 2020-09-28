import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Languages } from '../interfaces/interfaces';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  languages: Languages[] = [];


  constructor( private http: HttpClient ) { }

  getLanguages(){

    if(this.languages.length > 0){

      return of (this.languages);
      
    }

    return this.http.get<Languages[]>(`${environment.url}/api/languages`)
    .pipe(
          tap(data => this.languages = data)
          );
  }

  voteLanguages(id){
    return this.http.post(`${environment.url}/api/languages/${id}`,{})
    .pipe(
      catchError( err => {
        return of (err.error);
      })
    )
  }


}
