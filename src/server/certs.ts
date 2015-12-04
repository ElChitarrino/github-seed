import * as path from 'path';
import * as fs from 'fs';
let sslRootCas = require('ssl-root-cas');

class CertificateLoader implements ICertificateLoader {
    private certificatePath: string;

    public setPath(path: string) {
        this.certificatePath = path;
    }

    public loadCertificates() {
        let certs = fs.readdirSync(path.join(__dirname, this.certificatePath));
        certs.forEach( cert => {
            if (path.extname(cert) === '.crt') {
                sslRootCas.inject().addFile(path.join(__dirname, this.certificatePath, cert));
            }
        });
    }
}

export = new CertificateLoader;
