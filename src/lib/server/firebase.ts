import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

/*
const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
} as ServiceAccount;
*/

// ベタ書きはNGだよ！！！
const serviceAccount = {
    type: "service_account",
    project_id: "punihoppe",
    private_key_id: "bbf1b1fb44c2a54741e8374eccfb84c708b52326",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDCyorhXo2Dh+U4\nvUL9Q4M9EzwDOIPyU0GLYuLjFwqIkjYofZ+Xr+OPNCPbLNEtZm+Kjz/WGmYhNdIH\nYo/H6D2RKWORfmfO2oIUesjNm66oMNwbBx9A2kRZKB9AIuS9aGq+pZI6iEU6lo0V\nWxrQbCP4ERx1LmP1zFYKLyC75p2DK3DGIS+vCKRnGUZLhaYYCbYcg4hJxdtE27jR\nOABiLp5kQYs7uUK37DI3pxbdoJU6WrCVaGdZDctv3zCwAUYMKU25CePSc1dw/eoR\n/MENzlfysSb8ZgpGoyOaZVtp3yk7Lm8HkWrAJWmfYgGLgEexGhSb/ZnZ9rn7IiZQ\nrKCgi/SfAgMBAAECggEAFAw2ePV7SRM+czV/ZIODSVDmd0pkwhbxgv/9a/PeIKoz\nqr0rJLh0ijOKkS8upCaLyk3t+wIiir54TExHkgKD+6Gv3rSMyIxSoPr2GbsxIZxN\nuvZjsBAGwspPVRGCS0Ao5FA0GZQW0+3UvWLwAo1uskRIkoLgxNZv8IJjMxOMGIi8\ntlp6GQxIjgWGsBrmDZRo2EpVQ2Vcv6YBGFbcsCqKtv4/JvqoxzhNHt+XW+W7Caio\nFTscZZtrhVxIJu/wo2DW284WtbhKzSPftjTTi2SjQ0QUJCYf6FCplzfpm3/aNh6o\nCTmqhMJWLQvSJCzkjP+s5/bd3MmD5b1Ts66XgROzaQKBgQD8VFhyRV6KoUnLK7N5\nCSMVh73hZuCUrI3Dpblb/vu0AZTJWaVZfQXrTdankDVk4MUhTsm+2ZzGS/0T67zY\nB0/5jJLR9/innyr5r5l3+KH2x6OincYJiUFJmhT6TYES0b4sUFgMK/PTzr37ry3i\nZSmN20Wit0CR7vnUVIzOossu4wKBgQDFn+3XgVVTkKv3jThhVzlGaepLY7AYvv0z\ng+3iZ0BRX1YaTrWavuaRVacOWWil/iBnxRz7veIBIBhnt7N2IQfZ+aWLPNslbDu8\nWKaziRP8+SFaARieYljIvJW6XPKmj/eF3GR0/ltMlk4zoiMT0D0fCcA1PdWYJ3Ac\nz5fS6ik0FQKBgAyTH31CW73I3+aSHPWRMQBnrVzIRbTjDIWNgrlE8cI8ue922jil\ndGAPlvzuwNpwISLRzFgIfDmdm9UcUGLrql6jVMXF98xSsE+VIq7J4zhrJop6Fl5v\nSqOiXB1FM4N+lF2c+2ZP4mzRxsH+LukzZWi+XrAHNd6P7D9an1HE5x9FAoGAWja4\nn0EGD4CiT/5id2UW20LsVn/qWlGNSl/2TvztSngn2RiHJF3y6PNdsFo2QFgyuMwt\nf+ndasAZA/fC77ECYYnp/RbJv1qaJk+dwaVYv4mGpQyNDXg9qV0VSJ63kjt0NeI2\n5YVbbinLBx0DwD62OB3+ZQ+WGsAeGLjXSMvmBUUCgYEAqHCKy2Ylct3pRUvcozp2\nv1n/a9ejYQdnEI9MwOZ+CneP8TLPHmNVPxHxrmai+Y2nwxxLc6KLRPy/iZFCo4XJ\nKi4sd1/0NxfKJExqddJiHPd3pfPMKcYNcA52KVTxKR8L7sAafN/u69ivm3xQvcRL\nzUIdyfE2XcFsjQclo1Wg1yk=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-xvif2@punihoppe.iam.gserviceaccount.com",
    client_id: "100906914517540265370",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xvif2%40punihoppe.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
} as ServiceAccount;

// Firebase Admin の初期化
const app = initializeApp({
    credential: cert(serviceAccount)
});

export const db = getFirestore(app);