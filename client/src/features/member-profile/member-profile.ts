import { Component, inject, signal } from '@angular/core';
import { Member } from '../../types/member';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-profile',
  imports: [],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css'
})
export class MemberProfile {
  private route = inject(ActivatedRoute);
  protected member = signal<Member | undefined>(undefined);

  ngOnInit(): void {
    this.route.parent?.data.subscribe(data => {
      this.member.set(data["member"])
    });
  }
}
