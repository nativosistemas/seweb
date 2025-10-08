var url = 'http://localhost:5001' // https://estrellas.duckdns.org  //   http://localhost:5001

export function getUrl() {
    return url;
}
export  const getToken = () => {
    return localStorage.getItem('token');
}