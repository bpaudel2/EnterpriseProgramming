import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Upcomingelection } from '../electionlist/upcomingelection.interface';
import { ElectionService } from '../electionlist/election.service';




@Component({
    selector: 'upcominglectiondetails',
    templateUrl: './upcomingelectiondetails.component.html',
   
})
export class UpcomingelectiondetailsComponent implements OnInit {
    public upcomingelection: Upcomingelection;
    public errorMessage: any;
    
    constructor(private activeRoute: ActivatedRoute, private electionService: ElectionService) {

    }

    ngOnInit(): void {
        this.activeRoute.paramMap.subscribe(paramMap => this.fetchElectionDetails(paramMap));

    }
    fetchElectionDetails(paramMap: ParamMap): void {
        let address:any = paramMap.get('address');
        let id: any = paramMap.get('electionid');
        this.electionService.getUpComingElectionDetails(address, id)
            .subscribe(upcomingelection => {
                this.upcomingelection = upcomingelection;
            }, error => this.errorMessage = error);
    }

}
