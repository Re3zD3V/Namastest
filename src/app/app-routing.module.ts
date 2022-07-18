import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  ADMIN,
  CAMPAIGN_CREATE,
  CAMPAIGN_LIST,
  CATALOG_CREATE,
  CATALOG_DETAILS,
  CATALOG_LIST,
  DASHBOARD,
  HOME,
  LOGIN,
  PASSWORD_RESET,
  PASSWORD_RESET_CHECK_EMAIL,
  PASSWORD_RESET_REQUEST,
  PROFILE,
  PROJECT_CREATE,
  PROJECT_DETAILS,
  PROJECT_LIST,
  REGISTER,
  TEST_CREATE,
  TEST_DETAILS,
  TEST_LIST,
  USERS_RIGHTS,
} from './shared/constants/NamedRoutes';

const routes: Routes = [
  {
    path: '',
    redirectTo: HOME,
    pathMatch: 'full',
  },
  {
    path: HOME,
    loadChildren: () =>
      import('./accueil/accueil.module').then((m) => m.AccueilPageModule),
  },
  {
    path: DASHBOARD,
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardPageModule),
  },
  {
    path: TEST_CREATE,
    loadChildren: () =>
      import('./test/create/create.module').then((m) => m.CreatePageModule),
  },
  {
    path: TEST_LIST,
    loadChildren: () =>
      import('./test/list/list.module').then((m) => m.ListPageModule),
  },
  {
    path: TEST_DETAILS,
    loadChildren: () =>
      import('./test/details/details.module').then((m) => m.DetailsPageModule),
  },
  {
    path: REGISTER,
    loadChildren: () =>
      import('./user/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: LOGIN,
    loadChildren: () =>
      import('./user/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: USERS_RIGHTS,
    loadChildren: () =>
      import('./static/legal/legal.module').then((m) => m.LegalPageModule),
  },
  {
    path: PASSWORD_RESET_REQUEST,
    loadChildren: () =>
      import('./user/reset-password/request/request.module').then(
        (m) => m.RequestPageModule
      ),
  },
  {
    path: PASSWORD_RESET_CHECK_EMAIL,
    loadChildren: () =>
      import('./user/reset-password/check-email/check-email.module').then(
        (m) => m.CheckEmailPageModule
      ),
  },
  {
    path: PASSWORD_RESET,
    loadChildren: () =>
      import('./user/reset-password/reset/reset.module').then(
        (m) => m.ResetPageModule
      ),
  },
  {
    path: ADMIN,
    loadChildren: () =>
      import('./user/admin/admin.module').then((m) => m.AdminPageModule),
  },
  {
    path: PROFILE,
    loadChildren: () =>
      import('./user/profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: CATALOG_CREATE,
    loadChildren: () =>
      import('./catalog/create/create.module').then((m) => m.CreatePageCatalogModule),
  },
  {
    path: CATALOG_LIST,
    loadChildren: () =>
      import('./catalog/list/list.module').then((m) => m.ListPageModule),
  },
  {
    path: CATALOG_DETAILS,
    loadChildren: () =>
      import('./catalog/detail/detail.module').then((m) => m.DetailPageModule),
  },
  {
    path: PROJECT_DETAILS,
    loadChildren: () =>
      import('./project/details/details.module').then(
        (m) => m.DetailsPageModule
      ),
  },
  {
    path: PROJECT_LIST,
    loadChildren: () =>
      import('./project/list/list.module').then((m) => m.ListPageModule),
  },
  {
    path: PROJECT_CREATE,
    loadChildren: () => import('./project/create/create.module').then( m => m.CreateProjectPageModule)
  },
  {
    path: CAMPAIGN_LIST,
    loadChildren: () => import('./campaign/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: CAMPAIGN_CREATE,
    loadChildren: () => import('./campaign/create/create.module').then( m => m.CreateCampaignPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
