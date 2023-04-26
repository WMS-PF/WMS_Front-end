export interface GpsJson {
  orderid: number;
  date?: number;
  business?: string;
  products?: [produtName: string, quantity: number];
  status: string;
}
export default async function OrderInformation() {
  // const resp = await fetch("https://jsonplaceholder.typicode.com/users",{method:"GET"})
  // const response = await resp.json()
  // console.log(response)

  //OrderId simulations
  const max = 10000;
  const min = 1455;
  const orderid = Math.floor(Math.random() * (max - min + 1) + min);

  //Date simulation
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const dateformat = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year.toString()}`;

  //bussiness
  const business = "Homecenter";

  //status update simulation
  const randomNumber = Math.random();
  // Asignar el estado del pedido basado en el número aleatorio
  let statusUpdate;
  if (randomNumber < 0.5) {
    statusUpdate = "Completado";
  } else {
    statusUpdate = "Pendiente";
  }

  //products simulation
  const randomNumber2 = Math.random();
  // Asignar el estado del pedido basado en el número aleatorio
  let productName;
  if (randomNumber2 < 0.5) {
    productName = "Taladro";
  } else {
    productName = "Puerta";
  }

  //quantity simulation
  const max2 = 100;
  const min2 = 1;
  const quantity = Math.floor(Math.random() * (max - min + 1) + min);

  const gpsjson = {
    orderid: orderid,
    date: dateformat,
    business: business,
    status: statusUpdate,
    products: [productName, quantity],
  };
  return gpsjson;
}
