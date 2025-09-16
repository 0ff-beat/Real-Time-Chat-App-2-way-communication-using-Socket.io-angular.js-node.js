import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocketService } from './services/socket.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[CookieService]
})
export class AppComponent {
  private cookieService = inject(CookieService);
  title = 'chat-app';
  constructor(private socketService:SocketService){}
  ngOnInit(){
    this.socketService;
    this.socketService.token = this.cookieService.get("TOKEN") ;
    console.log(this.socketService.token)
  }
}
