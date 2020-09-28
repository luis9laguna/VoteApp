import { Component, OnInit } from '@angular/core';
import { VoteService } from '../../services/vote.service';
import { Languages } from '../../interfaces/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  languages: Languages[] = [];

  constructor( private voteService: VoteService) { }

  ngOnInit() {
    this.voteService.getLanguages()
    .subscribe(data=> this.languages = data);
  }

  vote(id){
    this.voteService.voteLanguages(id)
    .subscribe((data: any) => {
      console.log(data);
      if( data.ok ){
        Swal.fire('Thanks', data.message, 'success');
      }else{
        Swal.fire('Oops', data.message, 'error');
      }
    });
  }

}
