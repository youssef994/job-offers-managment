import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar/sidebar.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ArticleComponent} from './article/article.component';
import {ButtonModule} from 'primeng/button';
import {DataViewModule} from 'primeng/dataview';
import {MyarticleComponent} from './myarticle/myarticle.component';
import {DialogModule} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {RippleModule} from 'primeng/ripple';
import {ToastModule} from 'primeng/toast';
import {FileUploadModule} from 'primeng/fileupload';
import {SplitButtonModule} from 'primeng/splitbutton';
import {SavedarticleComponent} from './savedarticle/savedarticle.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    ButtonModule,
    DataViewModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    RippleModule,
    ToastModule,
    FileUploadModule,
    SplitButtonModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ArticleComponent,
    MyarticleComponent,
    SavedarticleComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule {
}
