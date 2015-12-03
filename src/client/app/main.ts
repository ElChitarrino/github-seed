import {bootstrap, Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http';
@Component({
    selector: 'app',
    directives: [CORE_DIRECTIVES],
    viewProviders: [HTTP_PROVIDERS],
    templateUrl: './client/app/main.html',
    styleUrls: ['./client/app/main.css']
})
class AppComponent {
    public following: Object;

    constructor(http: Http) {
        http.get('/following')
            .map((res: Response) => res.json())
            .subscribe(
                data => { this.following = data; console.log(this.following); }
            );
    }

}
bootstrap(AppComponent, []);
