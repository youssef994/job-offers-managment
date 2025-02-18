import {Routes} from '@angular/router';
import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {IconsComponent} from '../../pages/icons/icons.component';
import {MapsComponent} from '../../pages/maps/maps.component';
import {UserProfileComponent} from '../../pages/user-profile/user-profile.component';
import {TablesComponent} from '../../pages/tables/tables.component';
import {CandidateComponent} from '../../components/candidat/candidat.component';
import {CreateCandidateComponent} from '../../components/candidat/create-candidate/create-candidate.component';
import {UpdateCandidateComponent} from '../../components/candidat/candidate-update/candidate-update.component';
import {AuthGuard} from 'src/app/pages/login/_auth/auth.guard';
import {CompanyComponent} from '../../components/company/company.component';
import {AdminComponent} from '../../components/admin/admin.component';
import {CreateRoomComponent} from '../../components/create-room/create-room.component';
import {GetAllRoomsComponent} from '../../components/get-all-rooms/get-all-rooms.component';
import {BookingComponent} from '../../components/booking/booking.component';
import {ExtendBookingComponent} from '../../components/extend-booking/extend-booking.component';
import {CreateBookingComponent} from '../../components/create-booking/create-booking.component';
import {ArticleComponent} from '../../components/article/article.component';
import {MyarticleComponent} from '../../components/myarticle/myarticle.component';
import {SavedarticleComponent} from '../../components/savedarticle/savedarticle.component';
import {AddProgramComponent} from '../../components/ExchangeProgram/AddProgramComponent';

export const AdminLayoutRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'tables', component: TablesComponent},
  {path: 'icons', component: IconsComponent},
  {path: 'maps', component: MapsComponent},
  {path: 'candidate', component: CandidateComponent, canActivate: [AuthGuard], data: {role: 'VISITEUR'}},
  {path: 'create-candidate', component: CreateCandidateComponent, canActivate: [AuthGuard], data: {role: 'VISITEUR'}},
  {path: 'updatecandidate', component: UpdateCandidateComponent},
  {path: 'room', component: CreateRoomComponent},
  {path: 'BookingComponent', component: BookingComponent},
  {path: 'CreateBookingComponent', component: CreateBookingComponent},
  {path: 'ExtendBooking', component: ExtendBookingComponent},
  {path: 'company', component: CompanyComponent, canActivate: [AuthGuard], data: {role: 'ADHERANT'}},
  {path: 'getAllUsers', component: AdminComponent, canActivate: [AuthGuard], data: {role: 'ADMIN'}},
  {path: 'addExchageProgram', component: AddProgramComponent, canActivate: [AuthGuard], data: {role: 'VISITEUR'}},


  {path: 'allarticles', component: ArticleComponent, canActivate: [AuthGuard], data: {role: 'VISITEUR'}},
  {path: 'myarticles', component: MyarticleComponent, canActivate: [AuthGuard], data: {role: 'VISITEUR'}},
  {path: 'savedarticles', component: SavedarticleComponent, canActivate: [AuthGuard], data: {role: 'VISITEUR'}},
  {path: 'GetAllRoomsComponent', component: GetAllRoomsComponent, canActivate: [AuthGuard], data: {role: 'ADHERANT'}},
];
