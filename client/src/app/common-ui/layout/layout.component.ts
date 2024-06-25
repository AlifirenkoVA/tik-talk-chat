import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  imports: [RouterOutlet, SidebarComponent],
})
export class LayoutComponent implements OnInit {
  private profileService: ProfileService;

  constructor(@Inject(ProfileService) profileService: ProfileService) {
    this.profileService = profileService;
  }

  ngOnInit() {
    this.profileService.getMe().subscribe((val) => {
      console.log(val);
    });
  }
}
