let products=[]; 
let cartProducts=[];
const printCartList=document.getElementById('printCartList')
let clickCountProduct=0;
let grandTotal=0;
const printTotalPrice=document.getElementById('printTotalPrice');


const getProductList = async () => {
   const rawData = await fetch('http://localhost:3000/products');
   products = await rawData.json(); 
const productList = document.getElementById('productList');
productList.innerHTML = '';
products.forEach((product, id) => {
  const productObject = document.createElement('div');
  productObject.id = product.name;
  productObject.innerHTML = `<div class="bg-image card shadow-1-strong rounded-2">
  <div class="card-body text-white">
    <h4 class="card-title">${product.name}</h4>
    <p class="card-text"> ${product.description}</p>
  <h5>Product price:${product.price}$</h5>
  </div>
  <div class="d-flex  d-flex justify-content-center align-items-center">
    <button type="button" id="productAvailable"class="btn btn-primary m-1">${product.availability}</button>
   
    </div>
  </div>
  `

  productList.appendChild(productObject);
  
  const deleteProductButton = document.createElement('button');
  deleteProductButton.innerHTML = '<button class="btn btn-danger"><i class="fa fa-trash"></i></button>'
  deleteProductButton.onclick = () => {
    deleteProduct(id)
  }
 productObject.appendChild(deleteProductButton);

 const addProductButton = document.createElement('button');
  addProductButton.innerHTML = '<button class="btn btn-success"><i class="fa fa-cart-plus"></i></button>'
  addProductButton.onclick = () => {
    addToCart(id)
  }
 productObject.appendChild(addProductButton);
  
})
}

const addProduct = async (ev) => { 
  

   const name = document.getElementById('productName').value;
   const description = document.getElementById('productDescription').value;
   const price=Number(document.getElementById("productPrice").value);
   const availability=document.getElementById("productAvailability").checked==true;
   //let stock = availability == "true" ? "in stock" : "out of stock";
  
   
   await fetch(`http://localhost:3000/products?name=${name}&description=${description}&price=${price}&availability=${availability}`, {
      method: 'POST'
    });
    if (!product.name|!product.description |!product.price) {
      alert("Fulfil the form!");
     
    }
  
    getProductList();
    ev.preventDefault();
   
  }


  const deleteProduct = async (name) => {
   await fetch(`http://localhost:3000/products/${name}`, {
     method: 'DELETE'
   });
   getProductList();
 }


const addToCart = (name) =>{ 
  
        printCartList.innerHTML="";
        printTotalPrice.innerHTML="";
        let grandTotal=0;
        clickCountProduct= clickCountProduct+1;
        //console.log(clickCountProduct);
       //document.getElementById("addToCart").addEventListener("onclick",addToCart);
         cartProducts.push(Object.entries(products).forEach(([i,v])=>{ 
            //console.log(products);
         
          printCartList.innerHTML+=`<h6>${v.name}&nbsp${v.price}$*${clickCountProduct}<h6>`
                                     
                                       grandTotal+=v.price*clickCountProduct;
         printTotalPrice.innerHTML=`<h4 class="text-capitalize">total price:${grandTotal}$</h4>`
        
}
   ))
   
}
getProductList();
document.getElementById("myButton").onclick=addProduct;
