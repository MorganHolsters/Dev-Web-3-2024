import { Component } from '@angular/core';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { BadgeManagerComponent } from './badge-manager/badge-manager.component';
import { PlanningManagerComponent } from './planning-manager/planning-manager.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [UserManagerComponent, BadgeManagerComponent, PlanningManagerComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  closeModal(modalId: string){
    document.getElementById(modalId)?.classList.remove('is-active');
  }
  openModal(modalId: string){
    document.getElementById(modalId)?.classList.add('is-active');
  }
}
