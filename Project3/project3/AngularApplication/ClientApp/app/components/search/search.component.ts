import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Election } from '../electionlist/election.interface';
import { Representative } from '../electionlist/representative.interface';
import { Upcomingelection } from '../electionlist/upcomingelection.interface';
import { ElectionService } from '../electionlist/election.service';
import { Router } from '@angular/router';

@Component({
    selector: 'user-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search-component.css']
})
export class SearchComponent {
    public searchString: string = '';
    public choice: string='';
    public representative: Representative;
    public upcomingelection: Upcomingelection;
    public errorMessage: any;
   
    

    constructor(private electionService: ElectionService, private router: Router) {
    }

    public search() {
        if (this.choice == "Representative Info") {
            this.electionService.getRepresentativeList(this.searchString).subscribe(representative => {
                this.representative = representative;
            }, error => this.errorMessage = error);
        }
        else if (this.choice == "Upcoming Election") {
            this.electionService.getUpComingElectionList(this.searchString).subscribe(upcomingelection => {
                this.upcomingelection = upcomingelection;
            }, error => this.errorMessage = error);
        }
    }
    
}


