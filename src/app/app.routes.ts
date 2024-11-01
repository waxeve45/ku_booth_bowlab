import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ZoneAComponent } from './zone-a/zone-a.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ListbookingComponent } from './listbooking/listbooking.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminzonemanageComponent } from './adminzonemanage/adminzonemanage.component';
import { AdminboothmanageComponent } from './adminboothmanage/adminboothmanage.component';
import { AdminapprovalComponent } from './adminapproval/adminapproval.component';
import { AdminmembermanageComponent } from './adminmembermanage/adminmembermanage.component';
import { AdminbookingreportComponent } from './adminbookingreport/adminbookingreport.component';
import { AdminworkComponent } from './adminwork/adminwork.component';
import { ReservationComponent } from './reservation/reservation.component';
import { EditpasswordComponent } from './editpassword/editpassword.component';
import { AdminnavbarComponent } from './adminnavbar/adminnavbar.component';

export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'zoneA', component: ZoneAComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'EditProfile', component: EditProfileComponent },
    { path: 'listbooking', component: ListbookingComponent },
    { path: 'reservation', component: ReservationComponent },
    { path: 'Editpassword/:userId', component: EditpasswordComponent },

    // admin
    { path: 'adminnavbar', component: AdminnavbarComponent },
    { path: 'dashboard', component: AdmindashboardComponent },
    { path: 'boothmanage', component: AdminboothmanageComponent },
    { path: 'zonemanage', component: AdminzonemanageComponent },
    { path: 'approval', component: AdminapprovalComponent },
    { path: 'membermanage', component: AdminmembermanageComponent },
    { path: 'bookingreport', component: AdminbookingreportComponent },
    { path: 'work', component: AdminworkComponent },
    

    
];
