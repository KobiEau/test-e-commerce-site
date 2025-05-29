//target html container or div
console.log("DOOOM");

const container = document.getElementById("products-container");

const baseUrl = "https://fakestoreapi.com/products";

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
        `;
        container.appendChild(productCard);
    });

}

fetchProducts();
//fetch products from API
//display products in the container
