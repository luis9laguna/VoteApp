import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Languages } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   public data:any[];

  constructor(private db: AngularFirestore) { }

  ngOnInit() {

    this.db.collection('languages').valueChanges()
    .pipe(
      map( (languages: Languages[]) => {
        return languages.map( ({name, votes}) => ({name, value: votes}))
      })
    )
    .subscribe(languages => {
      this.data = languages;
    })
  }
}
