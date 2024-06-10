import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from '../../services/admin.service';

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

  users$!: Observable<unknown>;

  constructor(
    private adminService: AdminService     
  ){}

  ngOnInit(): void {
    this.users$ = this.adminService.getAdmin()
  }

}
