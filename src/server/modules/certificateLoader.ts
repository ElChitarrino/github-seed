import * as path from 'path';
import * as fs from 'fs';
let sslRootCas = require('ssl-root-cas');

class CertificateLoader implements ICertificateLoader {
    public loadCertificates(certificatePath: string) {
        let certs = fs.readdirSync(certificatePath);
        certs.forEach( cert => {
            if (path.extname(cert) === '.crt') {
                sslRootCas.inject().addFile(path.join(certificatePath, cert));
            }
        });
    }
}

export = new CertificateLoader;
