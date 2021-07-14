import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {NavigationStart, Router} from '@angular/router';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title = 'Mindory-Front';
  subscription: Subscription;

  constructor(private router: Router) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log("juste avant le refresh");
        console.log(router.navigated);
        browserRefresh = !router.navigated;
        // mettre la modal pour le refresh
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
