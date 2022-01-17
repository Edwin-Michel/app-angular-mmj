import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ApiService ]
})
export class AppComponent {
  title = 'mmj-iot';
  saludo = 'Hola mi nombr es Edwin'
}
