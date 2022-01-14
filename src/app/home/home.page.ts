import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private navController: NavController,
    private router: Router,

  ) { }

  navTo(path: string) {
    this.navController.navigateForward(`/${path}`);
  }
}
