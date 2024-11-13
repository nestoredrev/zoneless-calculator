import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, RouterTestingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'zoneless-calculator';
}
