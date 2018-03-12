import { Component, Inject, Input } from '@angular/core';
import { Upcomingelection } from '../electionlist/upcomingelection.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'upcomingelectionlist',
    templateUrl: './upcomingelectionlist.component.html',
   
})
export class UpcomingelectionlistComponent {
    public address: string;
    @Input()
    public upcomingelection: Upcomingelection;
    public election: any;
    public normalizedInput: any;

    constructor(private router: Router) {
    }

    navigateToUpcomingelectionDetails(election: any, normalizedInput: any): void {
        this.address = normalizedInput.line1.concat(" ", normalizedInput.line2, " ", normalizedInput.line3, " ",normalizedInput.city," ", normalizedInput.state," ", normalizedInput.zip);
        this.router.navigate(['/upcomingelectiondetails', this.address, election.id]);
    }
}