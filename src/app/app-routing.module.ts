import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardManagementComponent } from './pages/board-management/board-management.component';

const routes: Routes = [
  { path: '', redirectTo: 'board-management', pathMatch: "full" },
  { path: 'board-management', component: BoardManagementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
