import axios from "axios"
const uri = `${process.env.URI}/api`
console.log('the uri is ',uri)
let cart = []
const products = [
{ id: 1, imageUrl: 'https://via.placeholder.com/300?text=Product+1', name: 'Product 1', price: '29.99' },
    { id: 2, imageUrl: 'https://via.placeholder.com/300?text=Product+2', name: 'Product 2', price: '39.99' },
    { id: 3, imageUrl: 'https://via.placeholder.com/300?text=Product+3', name: 'Product 3', price: '49.99' },
    { id: 4, imageUrl: 'https://via.placeholder.com/300?text=Product+4', name: 'Product 4', price: '59.99' },
    { id: 5, imageUrl: 'https://via.placeholder.com/300?text=Product+5', name: 'Product 5', price: '69.99' },
    { id: 6, imageUrl: 'https://via.placeholder.com/300?text=Product+6', name: 'Product 6', price: '79.99' },
    { id: 7, imageUrl: 'https://via.placeholder.com/300?text=Product+7', name: 'Product 7', price: '89.99' },
    { id: 8, imageUrl: 'https://via.placeholder.com/300?text=Product+8', name: 'Product 8', price: '99.99' },
    { id: 9, imageUrl: 'https://via.placeholder.com/300?text=Product+9', name: 'Product 9', price: '109.99' },
    { id: 10, imageUrl: 'https://via.placeholder.com/300?text=Product+10', name: 'Product 10', price: '119.99' },
    { id: 11, imageUrl: 'https://via.placeholder.com/300?text=Product+11', name: 'Product 11', price: '129.99' },
    { id: 12, imageUrl: 'https://via.placeholder.com/300?text=Product+12', name: 'Product 12', price: '139.99' },
    { id: 13, imageUrl: 'https://via.placeholder.com/300?text=Product+13', name: 'Product 13', price: '149.99' },
    { id: 14, imageUrl: 'https://via.placeholder.com/300?text=Product+14', name: 'Product 14', price: '159.99' },
    { id: 15, imageUrl: 'https://via.placeholder.com/300?text=Product+15', name: 'Product 15', price: '169.99' },
    { id: 16, imageUrl: 'https://via.placeholder.com/300?text=Product+16', name: 'Product 16', price: '179.99' },
    { id: 17, imageUrl: 'https://via.placeholder.com/300?text=Product+17', name: 'Product 17', price: '189.99' },
    { id: 18, imageUrl: 'https://via.placeholder.com/300?text=Product+18', name: 'Product 18', price: '199.99' },
    { id: 19, imageUrl: 'https://via.placeholder.com/300?text=Product+19', name: 'Product 19', price: '209.99' },
    { id: 20, imageUrl: 'https://via.placeholder.com/300?text=Product+20', name: 'Product 20', price: '219.99' },
  ];
const API = axios.create({ baseURL: uri });
export const logIn = (formData) => {
    console.log(formData)
    return {
        name : "Vimal ",
        email:"skk180509@gmail.com",
        cart:[],
        oders:[],

    }
    // return API.post('/login', formData);
}
export const signUp = (formData) => {
    console.log(formData)
    return {message : "Registered !", status:201}
    // return API.post('/signup', formData);
}
export const getUserDetails = (formData) => {
    const data =  {
        name : "Vimal ",
        email:"skk180509@gmail.com",
        cart:[],
        oders:[],

    }
    return {data, status:200}
    // return API.post('/userdetails', formData);
}

export const getItems = async() => {

    

  return {data:products, status:200}
    // return API.get("/getitems");
}
export const particularprod = (formData) => {
    const id = formData.id;
    const product = products.find(item => item.id === parseInt(id));
    return {data:product, status:200}
    // return API.post('/particularprod', formData);
}




export const orderslist = (formData) => {
    return API.post('/orders', formData);
}
export const orderinfo = (formData) => {
    return API.post('/order', formData);
}




export const addtocart = (formData) => {
    return {message:"Added To Cart !", status:200}
    // return API.post('/addtocart', formData);
}
export const getcart = (formData) => {
    const data  =[{"id":1,"imageUrl":"https://via.placeholder.com/300?text=Product+1","name":"Product 1","price":"29.99","quantity":1},{"id":2,"imageUrl":"https://via.placeholder.com/300?text=Product+2","name":"Product 2","price":"39.99","quantity":4}]
    console.log(data)
    return {data, status:200}
    // return API.post('/getcart', formData);
}
export const updateCart = (formData) => {
    const {id, quantity} = formData;
    console.log(formData)
    let cart  =[{"id":1,"imageUrl":"https://via.placeholder.com/300?text=Product+1","name":"Product 1","price":"29.99","quantity":1},{"id":2,"imageUrl":"https://via.placeholder.com/300?text=Product+2","name":"Product 2","price":"39.99","quantity":4}]
    const o = cart.filter((obj)=>{
        return obj?.id == id;
    })   
    let p1 = o[0];
    console.log(o,p1)
    p1.quantity = quantity;
    const rem = cart.filter((obj)=>{
        return obj?.id != id;
    })   
    console.log(rem)
    let newData = [
        ...rem,
    ]
    newData.push(p1)
    console.log(newData)
cart = newData;
        return {message:"Quantity Increased", status:200}

    // return API.post('/getcart', formData);
}
export const delfromcart = (formData) => {
   return {message:"Deleted", status:200}    

    // return API.post('/delfromcart', formData);
}
