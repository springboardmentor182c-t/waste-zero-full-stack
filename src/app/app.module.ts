import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostService } from './services/post.service';

@NgModule({
  declarations: [
    AppComponent,
    EditPostComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: EditPostComponent }
    ])
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
