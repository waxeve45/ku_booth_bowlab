import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ZoneAComponent } from './zone-a/zone-a.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ZoneBComponent } from './zone-b/zone-b.component';
import { ZoneCComponent } from './zone-c/zone-c.component';
import { ZoneDComponent } from './zone-d/zone-d.component';
import { ZoneEComponent } from './zone-e/zone-e.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ListbookingComponent } from './listbooking/listbooking.component';

export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'zoneA', component: ZoneAComponent },
    { path: 'zoneB', component: ZoneBComponent },
    { path: 'zoneC', component: ZoneCComponent },
    { path: 'zoneD', component: ZoneDComponent },
    { path: 'zoneE', component: ZoneEComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'EditProfile', component: EditProfileComponent },
    { path: 'listbooking', component: ListbookingComponent },
    
];
