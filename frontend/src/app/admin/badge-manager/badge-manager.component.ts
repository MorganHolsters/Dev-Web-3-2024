import { Component } from '@angular/core';

@Component({
  selector: 'app-badge-manager',
  standalone: true,
  imports: [],
  templateUrl: './badge-manager.component.html',
  styleUrl: './badge-manager.component.scss'
})
export class BadgeManagerComponent {
  badges = [{
    id: '1', name: 'première leçon', description: 'premiers pas', icon: '../../../assets/badge_icons/bitmap_g16.png'
  }, {
    id: '2', name: '5 leçons', description: 'ça commence à devenir une habitude', icon:'../../../assets/badge_icons/bitmap_g17.png'
  }, {
    id: '3', name: '10 leçons', description: 'complètement adicte', icon:'../../../assets/badge_icons/bitmap_g18.png'
  }, {
    id: '4', name: 'bonne ambi', description: 'un bon moment garanti', icon:'../../../assets/badge_icons/bitmap_g15.png'
  }, {
    id: '5', name: 'cavalier avancé', description: 'l\'élève dépasse le maitre', icon:'../../../assets/badge_icons/bitmap_g14.png'
  }
];
}
