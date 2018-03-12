import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { SearchComponent } from './components/search/search.component';
import { ElectionService } from './components/electionlist/election.service';
import { ElectionlistComponent } from './components/electionlist/electionlist.component';
import { RepresentativelistComponent } from './components/representativelist/representativelist.component';
import { AddressBarComponent } from './components/addressbar/addressbar.component';
import { UpcomingelectionlistComponent } from './components/upcomingelectionlist/upcomingelectionlist.component';
import { UpcomingelectiondetailsComponent } from './components/upcomingelectiondetails/upcomingelectiondetails.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        SearchComponent,
        ElectionlistComponent,
        RepresentativelistComponent,
        AddressBarComponent,
        UpcomingelectionlistComponent,
        UpcomingelectiondetailsComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'search', pathMatch: 'full' },
            { path: 'search', component: SearchComponent },
            { path: 'electionlist', component: ElectionlistComponent },
            { path: 'representativelist/:address', component: RepresentativelistComponent },
            { path: 'upcomingelectiondetails/:address/:electionid', component: UpcomingelectiondetailsComponent },
            { path: '**', redirectTo: 'search' }
         
        ])
    ],
    providers: [
        ElectionService
    ]
})
export class AppModuleShared {
}
