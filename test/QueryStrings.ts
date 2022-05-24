export function createNewProductQueryString(name: string) {
  return `mutation{	createProduct(createProductInput:{ name:"${name}"}){  name id }}`;
}
export function removeProductQueryString(id: string) {
  return `mutation{
  removeProduct(id:"${id}"){
    id
  }
}`;
}
export function updateProductQueryString(id: string) {
  return `mutation{
  	updateProduct(updateProductInput:{ id:"${id}" name:"banana" supplier:"kazistan"})
      { name id supplier} }`;
}
export function findProductByIdQueryString(id: string) {
  return `{
 OneProduct(id:"${id}"){  name}}`;
}
export const findProductQueryString = `query{ products{ name, price}}`;
