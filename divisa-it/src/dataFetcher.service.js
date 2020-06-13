const proxyUrl = "https://cors-anywhere.herokuapp.com/";
function dataFetcher(targetUrl) {
  return fetch(proxyUrl + targetUrl).then((res) => res.json());
}
export default dataFetcher;
