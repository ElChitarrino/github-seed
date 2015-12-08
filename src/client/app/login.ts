import {bootstrap, Component} from 'angular2/angular2';

@Component({
    selector: 'app',
    templateUrl: '/client/app/login.html'
})
export class LoginApp { }
bootstrap(LoginApp);
