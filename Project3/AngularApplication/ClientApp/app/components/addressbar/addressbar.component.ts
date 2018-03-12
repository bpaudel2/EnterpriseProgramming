import { Component, Inject, Input } from '@angular/core';
import { Representative } from '../electionlist/representative.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'addressbar',
    templateUrl: './addressbar.component.html',
   
})
export class AddressBarComponent {
    public address: string;
    @Input()
    public representative: Representative;

    constructor(private router: Router) {
    }

    navigateToRepresentativeDetails(representative: Representative): void {
        this.address = representative.normalizedInput.line1.concat(" ",representative.normalizedInput.city," ", representative.normalizedInput.state," ", representative.normalizedInput.zip);
        this.router.navigate(['/representativelist', this.address]);
    }
}