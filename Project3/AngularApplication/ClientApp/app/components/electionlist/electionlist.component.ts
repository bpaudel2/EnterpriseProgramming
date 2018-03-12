import { Component, OnInit } from '@angular/core';
import { Election } from './election.interface';
import { ElectionService} from './election.service';




@Component({
    selector: 'election-list',
    templateUrl: './electionlist.component.html',
    styleUrls: ['./electionlist.component.css']
})
export class ElectionlistComponent implements OnInit {
    public election: Election;
    public errorMessage: any;
  


    constructor(private electionService: ElectionService) {
    
    }

    ngOnInit(): void {
        this.getElectionList();

    }


    getElectionList(): void {
        this.electionService.getElectionList().subscribe(election => {
            this.election = election;
        }, error => this.errorMessage = error);
           
    }
}


