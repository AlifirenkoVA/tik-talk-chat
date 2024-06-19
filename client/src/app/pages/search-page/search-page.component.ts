import { Component, Inject} from '@angular/core';
import { ProfileService } from '../../data/services/profile.service';
import { Profile } from '../../data/interfaces/profile.interface';
import { ProfileCardComponent } from "../../common-ui/profile-card/profile-card.component";

@Component({
    selector: 'app-search-page',
    standalone: true,
    templateUrl: './search-page.component.html',
    styleUrl: './search-page.component.scss',
    imports: [ProfileCardComponent]
})
export class SearchPageComponent {
  profiles: Profile[] = [];

  constructor(@Inject(ProfileService) profileService: ProfileService) {
    profileService.getTestAccounts().subscribe(val => {
      this.profiles = val;
    });
  }
}
