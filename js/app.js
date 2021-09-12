const loadProducts = () => {
  const url = `http://127.0.0.1:5500/db.json`;
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
    div.innerHTML = `<div class="single-product m-2">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h4 class = "card-title">${product.title}</h4>
      <p><span class="fw-bold"> Category </span>: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="details(${product.id})" id="details-btn" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button></div>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};


let count = 0;

const addToCart = (id, price) => {
  count = count + 1;
  document.getElementById("total-Products").innerText = count;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
};

const details = (id) => {
  let productUrl = `https://fakestoreapi.com/products/${id}`
  fetch(productUrl)
    .then((response) => response.json())
    .then((data) => detailsProduct(data));
}

const detailsProduct = data => {
  var myModal = document.getElementById('myModal')
  var myInput = document.getElementById('myInput')

  myModal.addEventListener('shown.bs.modal', function () {
    myInput.focus()
  })
}

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

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

updateTotal();