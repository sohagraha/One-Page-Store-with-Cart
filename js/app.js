// load all produduct from api 
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

loadProducts();

// show all product in UI 
const showProducts = (products) => {
  // const allProducts = products.map((pd) => pd);
  for (const product of products) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    // single product with content 
    div.innerHTML = `<div class="single-product m-2">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h5 class = "card-title title mt-3 fw-bold">${product.title}</h5>
      <hr class = "w-75 mx-auto">
      <p><span class="fw-bold"> Category </span>: ${product.category}</p>
      <h3 class="text-rating fw-bold">$${product.price}</h3>
      <hr class = "w-25 mx-auto">
      <div class="d-flex justify-content-around border border-1 border-info rounded-pill mb-2">
        <span class = " m-1 fw-bold fs-6">Rating: <span class="text-rating">${product.rating.rate}</span></span>
        <span class = "fw-bold">||</span>
        <span class = "m-1 text-black fw-bold fs-6">Reviews :<span class="text-rating"> ${product.rating.count}</span></span>
      </div>
      <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now m-1"><i class="fas fa-cart-plus"></i> Add to Cart</button>
      <button id="details-btn" class="btn-details">Details <i class="fas fa-info-circle"></i></button>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// count iteam when click on add to cart 
let count = 0;
const addToCart = price => {
  count++;
  document.getElementById("total-Products").innerText = count;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
};

// convert string to float function and return float value 
const getInputValue = id => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  let float = converted;
  return float;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function for delivery charge
const setInnerTextDelivery = (id, value) => {
  document.getElementById(id).innerText = value;
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerTextDelivery("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerTextDelivery("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerTextDelivery("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};