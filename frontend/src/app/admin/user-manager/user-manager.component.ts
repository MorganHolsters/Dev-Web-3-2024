import { Component } from '@angular/core';

@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.scss'
})
export class UserManagerComponent {
  users = [{
    id: '1', name: 'john', email: 'rando@gmx.com'
  }, {
    id: '2', name: 'sarah', email: 'lol@gmx.com'
  }, {
    id: '3', name: 'jeff', email: 'killmeplease@gmx.com'
  }];
}
