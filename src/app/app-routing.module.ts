import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'post', component: PostComponent, canActivate: [AuthGuard] },
  { path: 'requests', loadChildren: () => import('src/app/requests/requests.module').then(m => m.RequestsModule), canActivate: [AuthGuard] },
  { path: 'friends', loadChildren: () => import('src/app/friends/friends-routing.module').then(m => m.FriendsRoutingModule), canActivate: [AuthGuard] },
  { path: 'news', loadChildren: () => import('src/app/news/news-routing.module').then(m => m.NewsRoutingModule), canActivate: [AuthGuard] },
  { path: 'setting', loadChildren: () => import('src/app/setting/setting.module').then(m => m.SettingModule), canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: () => import('src/app/authentication/authentication-routing.module').then(m => m.AuthenticationRoutingModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
