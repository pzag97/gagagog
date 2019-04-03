import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromApp from '@app/store/app.reducer';
import { getLayoutTitle } from '@app/operational-client/store/reducers';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    title$ = this.store.pipe(select(getLayoutTitle));

    constructor(private store: Store<fromApp.State>) {
    }

    ngOnInit() {
    }

}
