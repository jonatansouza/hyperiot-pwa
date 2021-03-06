import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CreateDevicePage } from './create-device/create-device.page';
import { DeviceDetailPage } from './device-detail/device-detail.page';
import { HistoryPage } from './history/history.page';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { SharedPage } from './shared/shared.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'devices',
    pathMatch: 'full'
  },
  {
    path: 'devices',
    component: HomePage
  },
  {
    path: 'devices/:id',
    component: DeviceDetailPage
  },
  {
    path: 'history/:id',
    component: HistoryPage
  },
  {
    path: 'create-device',
    component: CreateDevicePage
  },
  {
    path: 'shared',
    component: SharedPage
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'register',
    component: RegisterPage
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
