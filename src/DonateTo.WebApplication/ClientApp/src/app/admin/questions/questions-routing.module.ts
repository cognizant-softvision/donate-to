import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { QuestionsComponent } from './questions.component';
import { QuestionsCreateComponent } from './question-create/questions-create.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionsComponent,
    children: [{ path: 'create', component: QuestionsCreateComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsRoutingModule {}
