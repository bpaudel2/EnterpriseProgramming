import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Representative } from '../electionlist/representative.interface';
import { ElectionService} from '../electionlist/election.service';




@Component({
    selector: 'representative-list',
    templateUrl: './representativelist.component.html',
    styleUrls: ['./representativelist.component.css']
})
export class RepresentativelistComponent implements OnInit {
    public representative: Representative;
    public address: any;
    public errorMessage: any;



    constructor(private activeRoute: ActivatedRoute,private electionService: ElectionService) {
    
    }

    ngOnInit(): void {
        this.activeRoute.paramMap.subscribe(paramMap=>this.fetchRepresentative(paramMap));

    }
    fetchRepresentative(paramMap: ParamMap): void {
        this.address = paramMap.get('address');
        this.electionService.getRepresentativeList(this.address)
            .subscribe(representative => {
                this.representative = representative;
                for (let office of this.representative.offices) {
                    for (let index of office.officialIndices) {
                        this.representative.officials[index].office = office.name;
                    }
                }
            }, error =>this.errorMessage=error);
    }

}
