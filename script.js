//target html container or div
console.log("DOOOM");

const container = document.getElementById("products-container");

const baseUrl = "https://btl-products-api.onrender.com/products";

const fetchProducts = async () => {
  try {
    const response = await fetch(baseUrl, { method: "GET" });
    console.log(response);
    const data = await response.json();
    console.log(data);
    displayData(data); //Calling the card creation function
  } catch (error) {
    console.log(error);
  } finally {
    console.log("");
  }
};

const h1=document.getElementsByTagName("h1")
const displayData = (data) =>{
    console.log(data);
    
    //FOR A SINGLE ITEM 
    // const item =data[0];
    //Create Product card for item
    //insert card into container div

    // let poductCard = document.createElement("div");
    // productCard.classList.add("product-card");
    // productCard.innerHTML=`
    // <img src=${item.image} alt="${item.title}"/>
    // <h2> ${item.title}</h2>
    // <p>${item.description}</p>
    // `;
    // container.appendChild(productCard);

    //loop over the "data" array
    //create card element for each item
    //append that item to the container

    data.forEach((item,index) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML=`
        <div id="product-image-container"> <img src=${item.image} alt=${item.title} /></div>
        <h2>${item.title}</h2>
        <p>${item.description}</p>
        <p> ${item.rating}</p>
        <p class="price"> Price: &#8373; ${item.price}</p>
        <button class="delete">Delete</button>
        `;
        container.appendChild(productCard);
    });

}

const form= document.getElementById("product-form");

form.addEventListener('submit',(event)=>{
  //Declaring form variables
  event.preventDefault();
  const message=document.getElementById("form-message");
  const productName=document.getElementById("product-name").value;
  const description=document.getElementById("description").value;
  const imageUrl=document.getElementById("image").value;
  const price=parseInt(document.getElementById("price").value);
  console.log(`Price= ${price}`);
  const brand=document.getElementById("brand-name").value;

  console.log("Checkpoint");

  //Input validation

  if (productName =="") {
    message.textContent="The Product Name field is empty";
    message.className="error";
    return;
  }
  if (description =="") {
    message.textContent="The Description field is empty";
    message.className="error";
    return;
  }
  if (imageUrl =="") {
    message.textContent="The Image field is empty";
    message.className="error";
    return;
  }
  if (!price) {
    message.textContent="The Price field is empty";
    message.className="error";
    return;
  }
  if(brand ==""){
    message.textContent="The Brand Name field is empty";
    message.className="error";
    return;
  }
//Uploading the success message
message.className="success";
message.innerText="Product Added successfully!";

//Creating new object for the input products
let randomId=Math.random()*1000;
const newProduct={
  id:randomId,
  title:productName,
  category:"product",
  description: description,
  rating:5.0,
  image:imageUrl,
  price:price,
  brand:brand
}

const postUrl=baseUrl;
const postProducts= async ()=> {
  try {
      const response = await fetch(postUrl,{method:"POST",
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(newProduct)
      });
      console.log(`The response ${response}`);
      displayData(newProduct);
      if(!response.ok){
        console.log(`HTTP error Status:${response.status}`);
      }
      const data= await response.json();
      console.log(`Product created`,data);
     } 
  catch (error) 
     {
    console.log(`Error creating product`,error);
    }
};

postProducts(newProduct);
fetchProducts();
//End of event listener
});

fetchProducts();
//fetch products from API
//display products in the container
