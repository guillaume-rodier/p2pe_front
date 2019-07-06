import { optionsUnConnected, getHeaders, url } from "./Api";

export async function getServices() {

  const rawResponse = await fetch(url + "proposed_services", getHeaders());
  const responseJson = await rawResponse.json();

  console.log("responseJsonJay");
  console.log(responseJson);
  console.log("responseJsonJay");

  return new Promise((resolve, reject) => {
    if (!rawResponse.ok) {
      reject(responseJson.message);
    }
    resolve(responseJson);
  });
}