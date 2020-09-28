import { Routes } from '@angular/router';
import { TransactionsDetailsComponent } from 'src/app/pages/transactions/transactions-details/transactions-details.component';
import { TransactionsComponent } from 'src/app/pages/transactions/transactions.component';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { VendorComponent } from '../../pages/vendor/vendor.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'vendor',         component: VendorComponent },
    { path: 'transactions',   component: TransactionsComponent },
    { path: 'transactions-details/:id',   component: TransactionsDetailsComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent }
];
