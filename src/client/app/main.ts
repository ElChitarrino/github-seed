import {bootstrap, Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http';

declare var io: any;
@Component({
    selector: 'app',
    directives: [CORE_DIRECTIVES],
    viewProviders: [HTTP_PROVIDERS],
    templateUrl: './client/app/main.html',
    styleUrls: ['./client/app/main.css']
})
class AppComponent {
    public users: any = [];
    private following: any = [];
    private online: any = [];

    constructor(http: Http) {
        let socket = io.connect();
        socket.on('update', (object) => {
            if (object === 'user') {
                http.get('/api/online')
                    .map((res: Response) => res.json())
                    .subscribe(
                        data => { this.online = data; this.mergeData(); }
                    );
            }
        });
        let githubFollowing = http.get('/api/github/following').map((res: Response) => res.json());
        githubFollowing.subscribe( data => { this.following = data; this.mergeData(); } );
    }

    private mergeData() {
        this.users = this.following;
        for (let i = 0; i < this.following.length; i++) {
            this.users[i].online = false;
            for (let j = 0; i < this.online.length; j++) {
                if (this.online[this.following[i].login]) {
                    this.users[i].online = true;
                }
            }
        }
    }
}
bootstrap(AppComponent, []);
