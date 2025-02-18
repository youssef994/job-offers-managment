import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import {LoginComponent} from './pages/login/login.component';
import {CandidateComponent} from './components/candidat/candidat.component';
import {CreateCandidateComponent} from './components/candidat/create-candidate/create-candidate.component';
import {FileUploadComponent} from './components/file-upload/file-upload.component';
import {PdfDownloadComponent} from './components/file-download/pdf-download/pdf-download.component';
import {ImageDownloadComponent} from './components/file-download/image-download/image-download.component';
import {UpdateCandidateComponent} from './components/candidat/candidate-update/candidate-update.component';
import {AuthGuard} from 'src/app/pages/login/_auth/auth.guard';
import {RegisterComponent} from './pages/register/register.component';
import {CompanyCreateComponent} from './components/company/company-create/company-create.component';
import {CompanyGetComponent} from './components/company/company-get/company-get.component';
import {JobCreateComponent} from './components/company/job-create/job-create.component';
import {JobGetByCompanyIdComponent} from './components/company/job-get-by-company-id/job-get-by-company-id.component';
import {JobGetComponent} from './components/company/job-get/job-get.component';
import {JobApplicationListComponent} from './components/application/job-application-list/job-application-list.component';
import {LogementComponent} from './components/logement/logement.component';
import {GetAllRoomsComponent} from './components/get-all-rooms/get-all-rooms.component';
import {AddProgramComponent} from './components/ExchangeProgram/AddProgramComponent';
import {ExternalRedirectComponent} from './external-redirect/external-redirect.component';

const routes: Routes = [
  // { path: 'SignIn', component: LoginComponent },
  // { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data:{role:'ADMIN'} },
  {path: 'candidate', component: CandidateComponent, canActivate: [AuthGuard], data: {role: 'VISITEUR'}},
  {path: 'create-candidate', component: CreateCandidateComponent, canActivate: [AuthGuard], data: {role: 'VISITEUR'}},
  // { path: 'company', component: CompanyComponent, canActivate: [AuthGuard], data:{role:'COMPANY'} },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  // { path: 'forbidden', component: ForbiddenComponent },
  {path: 'upload', component: FileUploadComponent},
  {path: 'downloadPDF', component: PdfDownloadComponent},
  {path: 'downloadImage', component: ImageDownloadComponent},
  {path: 'updatecandidate', component: UpdateCandidateComponent},
  {path: 'createCompany', component: CompanyCreateComponent, canActivate: [AuthGuard], data: {role: 'ADHERANT'}},
  {path: 'getCompany', component: CompanyGetComponent, canActivate: [AuthGuard], data: {role: 'ADHERANT'}},
  {path: 'create-job/:companyId', component: JobCreateComponent, canActivate: [AuthGuard], data: {role: 'ADHERANT'}},
  {path: 'getAlljobsCompany/:companyId', component: JobGetByCompanyIdComponent, canActivate: [AuthGuard], data: {role: 'ADHERANT'}},
  {path: 'AllJobs', component: JobGetComponent},
  {path: 'applications/:jobId', component: JobApplicationListComponent},
  {path: 'logement', component: LogementComponent},
  {path: 'echange', component: AddProgramComponent, canActivate: [AuthGuard], data: {role: 'VISITEUR'}},
  {path: 'GetAllRoomsComponent', component: GetAllRoomsComponent, canActivate: [AuthGuard], data: {role: 'ADHERANT'}},
  {
    path: 'goto-room',
    redirectTo: '/externalRedirect',
    pathMatch: 'full',
    data: {
      externalUrl: 'http://localhost:4300/room'
    }
  },


  { path: 'externalRedirect',
    resolve: {
      url: 'externalUrlProvider'
    },
    component: ExternalRedirectComponent
  },

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  }, {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [],
})
export class AppRoutingModule {
}
