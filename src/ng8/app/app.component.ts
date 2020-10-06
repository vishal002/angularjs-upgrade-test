import { Component } from '@angular/core';
import { UpgradeModule } from "@angular/upgrade/static";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularjs-upgrade-test';

  constructor(private upgrade: UpgradeModule) { }
  ngOnInit() {
    this.upgrade.bootstrap(document.body, ['managerApp']);
    // this.upgrade.bootstrap(document.body, ['tvDashboard']);
    // this.upgrade.bootstrap(document.body, ['phonecatApp']);
  }
}
