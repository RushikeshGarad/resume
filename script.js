    // Initialize jsPDF
    const { jsPDF } = window.jspdf;
    
    // App State
    let cart = [];
    let wishlist = [];
    let isLoggedIn = false;
    let user = {
        name: "Jane Smith",
        email: "user@example.com",
        orders: [
          {
            id: "ORD-2023-001",
            date: "2023-10-15",
            items: [
              { id: 2, name: "Kanjivaram", price: 18500, quantity: 1, img: "Sareesphoto/s1.png" }
            ],
            total: 18500,
            status: "delivered"
          },
          {
            id: "ORD-2023-002",
            date: "2023-11-05",
            items: [
              { id: 4, name: "Bandhani Art", price: 9500, quantity: 2, img: "Sareesphoto/s2.png" },
              { id: 7, name: "Paithani", price: 22000, quantity: 1, img: "Sareesphoto/s3.png" }
            ],
            total: 41000,
            status: "processing"
          }
        ]
    };
    
    // DOM Elements
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const searchIcon = document.getElementById('searchIcon');
    const searchBarContainer = document.getElementById('searchBarContainer');
    const searchInput = document.getElementById('searchInput');
    const searchCloseBtn = document.getElementById('searchCloseBtn');
    const searchResults = document.getElementById('searchResults');
    const userIcon = document.getElementById('userIcon');
    const userDropdown = document.getElementById('userDropdown');
    const cartIconContainer = document.getElementById('cartIconContainer');
    const cartCountNumber = document.getElementById('cartCountNumber');
    const profileLink = document.getElementById('profileLink');
    const ordersLink = document.getElementById('ordersLink');
    const wishlistLink = document.getElementById('wishlistLink');
    const logoutLink = document.getElementById('logoutLink');
    const wishlistCount = document.getElementById('wishlistCount');
    const collectionsContainer = document.querySelector('.collections');
    const billForm = document.querySelector('.bill-form');
    const billPreview = document.getElementById('billPreview');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const colorFilter = document.getElementById('colorFilter');
    const occasionFilter = document.getElementById('occasionFilter');
    const sortBy = document.getElementById('sortBy');
    const notificationElement = document.getElementById('notification');
    const loader = document.getElementById('loader');
    const orderHistoryContainer = document.getElementById('orderHistoryContainer');
    const generateBillBtn = document.getElementById('generateBillBtn');
    const mobileCartIconContainer = document.getElementById('mobileCartIconContainer');
    
    // Modal Elements
    const productDetailModal = document.getElementById('productDetailModal');
    const closeProductDetailModal = document.getElementById('closeProductDetailModal');
    const productDetailContent = document.getElementById('productDetailContent');
    const cartModal = document.getElementById('cartModal');
    const closeCartModal = document.getElementById('closeCartModal');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalElement = document.getElementById('cartTotal');
    const continueShoppingBtn = document.getElementById('continueShoppingBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const loginModal = document.getElementById('loginModal');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const profileModal = document.getElementById('profileModal');
    const closeProfileModal = document.getElementById('closeProfileModal');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    const wishlistModal = document.getElementById('wishlistModal');
    const closeWishlistModal = document.getElementById('closeWishlistModal');
    
    // Bill Generator Elements
    const whatsappBtn = document.getElementById('whatsappBtn');
    const emailBtn = document.getElementById('emailBtn');
    const pdfBtn = document.getElementById('pdfBtn');
    
    // Product Data
    const products = [
      {
        id: 1,
        name: "Banarasi Silk",
        price: 12999,
        img: "Sareesphoto/s1.png",
        type: "Pure Silk • Handwoven",
        description: "Traditional Banarasi silk saree with intricate zari work and golden embroidery. Perfect for weddings and grand occasions.",
        category: "silk",
        color: "red",
        occasion: "wedding",
        tags: ["New Arrival"]
      },
      {
        id: 2,
        name: "Kanjivaram",
        price: 18500,
        img: " Sareesphoto/s2.png",
        type: "Pure Silk • Temple Border",
        description: "Authentic Kanjivaram silk with contrasting borders and rich pallu design. A symbol of South Indian heritage.",
        category: "silk",
        color: "gold",
        occasion: "wedding",
        tags: ["Best Seller"]
      },
      {
        id: 3,
        name: "Chanderi Cotton",
        price: 6800,
        img: "Sareesphoto/s3.png",
        type: "Pure Cotton • Lightweight",
        description: "Elegant Chanderi cotton saree with delicate motifs and golden accents. Ideal for summer wear and casual outings.",
        category: "cotton",
        color: "blue",
        occasion: "casual",
        tags: []
      },
      {
        id: 4,
        name: "Bandhani Art",
        price: 9500,
        img: "Sareesphoto/s4.jpeg",
        type: "Silk-Cotton • Tie-Dye",
        description: "Traditional Gujarati Bandhani with mirror work and vibrant colors. A festive favorite.",
        category: "art",
        color: "green",
        occasion: "festival",
        tags: ["Limited Edition"]
      },
      {
        id: 5,
        name: "Tussar Silk",
        price: 8200,
        img: "Sareesphoto/s18.jpeg",
        type: "Pure Silk • Natural Texture",
        description: "Rich texture with natural golden sheen. Perfect for formal events and ceremonies.",
        category: "silk",
        color: "gold",
        occasion: "formal",
        tags: ["Eco-Friendly"]
      },
      {
        id: 6,
        name: "Kota Doria",
        price: 5500,
        img: "Sareesphoto/s6.jpeg",
        type: "Cotton • Square Weave",
        description: "Lightweight and airy with unique square patterns. Ideal for daily wear and hot climates.",
        category: "cotton",
        color: "blue",
        occasion: "casual",
        tags: []
      },
      {
        id: 7,
        name: "Paithani",
        price: 22000,
        img: "Sareesphoto/s7.jpeg",
        type: "Pure Silk • Traditional",
        description: "Maharashtrian specialty with peacock motifs and vibrant borders. A collector's item.",
        category: "silk",
        color: "purple",
        occasion: "wedding",
        tags: ["Premium"]
      },
      {
        id: 8,
        name: "Kalamkari",
        price: 7500,
        img: "Sareesphoto/s8.jpeg",
        type: "Cotton • Hand-Painted",
        description: "Hand-painted with natural dyes and mythological themes. A work of art for special occasions.",
        category: "art",
        color: "green",
        occasion: "festival",
        tags: ["Artistic"]
      },
      {
        id: 9,
        name: "Bridal Silk",
        price: 35000,
        img: "Sareesphoto/s9.jpeg",
        type: "Pure Silk • Bridal",
        description: "Exquisite bridal saree with intricate embroidery and zari work. Designed for the special day.",
        category: "wedding",
        color: "red",
        occasion: "wedding",
        tags: ["Premium"]
      },
      {
        id: 10,
        name: "Designer Georgette",
        price: 12000,
        img: "Sareesphoto/s10.jpeg",
        type: "Georgette • Designer",
        description: "Contemporary designer saree with modern patterns and elegant drape. Perfect for parties.",
        category: "designer",
        color: "purple",
        occasion: "party",
        tags: ["New Arrival"]
      },
      {
        id: 11,
        name: "Organza Silk",
        price: 18000,
        img: "Sareesphoto/s11.jpeg",
        type: "Pure Silk • Sheer",
        description: "Sheer organza silk with floral motifs and delicate embroidery. A sophisticated choice.",
        category: "silk",
        color: "gold",
        occasion: "party",
        tags: ["Limited Edition"]
      },
      {
        id: 12,
        name: "Cotton Ikkat",
        price: 8500,
        img: "Sareesphoto/s12.jpeg",
        type: "Cotton • Ikkat Weave",
        description: "Traditional Ikkat weave with geometric patterns and vibrant colors. Comfortable and stylish.",
        category: "cotton",
        color: "blue",
        occasion: "casual",
        tags: ["Handcrafted"]
      },
      {
        id: 13,
        name: "Chikankari Lucknowi",
        price: 11500,
        img: "Sareesphoto/s13.jpeg",
        type: "Cotton-Silk • Hand Embroidery",
        description: "Elegant Lucknowi Chikankari with intricate white thread work on pastel fabric.",
        category: "designer",
        color: "pink",
        occasion: "party",
        tags: ["Artistic"]
      },
      {
        id: 14,
        name: "Patola Silk",
        price: 28500,
        img: "Sareesphoto/s14.jpeg",
        type: "Pure Silk • Double Ikat",
        description: "Rare Patola silk with geometric patterns created using the double ikat technique.",
        category: "art",
        color: "orange",
        occasion: "festival",
        tags: ["Rare"]
      },
      {
        id: 15,
        name: "Mysore Silk",
        price: 14500,
        img: "Sareesphoto/s15.jpeg",
        type: "Pure Silk • Zari Borders",
        description: "Classic Mysore silk with rich zari borders and traditional motifs. Ideal for festivals.",
        category: "silk",
        color: "red",
        occasion: "festival",
        tags: ["Best Seller"]
      }
    ];

    // Initialize the app
    function initApp() {
      renderProducts();
      renderBillForm();
      updateCartCount();
      updateWishlistCount();
      renderOrderHistory();
      
      // Set current year in footer
      document.getElementById('currentYear').textContent = new Date().getFullYear();
      
      // Check if user is logged in
      const storedUser = localStorage.getItem('silkSutraUser');
      if (storedUser) {
        isLoggedIn = true;
        user = JSON.parse(storedUser);
        document.getElementById('profileName').textContent = user.name;
        document.getElementById('profileEmail').textContent = user.email;
      }
    }

    // Utility Functions
    function showNotification(message, type = 'success', duration = 3000) {
      notificationElement.textContent = message;
      notificationElement.className = `notification ${type} show`;
      setTimeout(() => {
        notificationElement.classList.remove('show');
      }, duration);
    }

    function formatPrice(price) {
      return new Intl.NumberFormat('en-IN', { 
        style: 'currency', 
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(price);
    }
    
    function showLoader() {
      loader.classList.add('active');
    }
    
    function hideLoader() {
      loader.classList.remove('active');
    }
    
    function formatDate(date) {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return new Date(date).toLocaleDateString('en-IN', options);
    }
    
    function formatTime(date) {
      const options = { hour: '2-digit', minute: '2-digit' };
      return new Date(date).toLocaleTimeString('en-IN', options);
    }

    // Render Products
    function renderProducts(filteredProducts = products) {
      collectionsContainer.innerHTML = '';
      
      if (filteredProducts.length === 0) {
        collectionsContainer.innerHTML = `
          <div style="text-align: center; grid-column: 1 / -1; padding: 50px 20px;">
            <h3>No products found</h3>
            <p>Try adjusting your filters</p>
          </div>
        `;
        return;
      }
      
      filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'collection-card';
        card.dataset.id = product.id;
        card.dataset.name = product.name;
        card.dataset.price = product.price;
        card.dataset.img = product.img;
        card.dataset.type = product.type;
        card.dataset.description = product.description;
        card.dataset.category = product.category;
        
        card.innerHTML = `
          <div class="collection-img">
            <img src="${product.img}" alt="${product.name}">
            ${product.tags.length ? `<div class="collection-badge">${product.tags[0]}</div>` : ''}
          </div>
          <div class="collection-content">
            <h3>${product.name}</h3>
            <div class="collection-type">${product.type}</div>
            <p class="description">${product.description.substring(0, 80)}...</p>
            <div class="collection-price">
              <div class="price">${formatPrice(product.price)}</div>
            </div>
            <div class="collection-actions">
              <button class="view-btn"><i class="fas fa-eye"></i> View</button>
              <button class="add-to-cart-btn"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
            </div>
          </div>
        `;
        
        collectionsContainer.appendChild(card);
      });
      
      // Add event listeners to product cards
      document.querySelectorAll('.collection-card').forEach(card => {
        const viewBtn = card.querySelector('.view-btn');
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        
        viewBtn.addEventListener('click', () => {
          showProductDetail(card.dataset.id);
        });
        
        addToCartBtn.addEventListener('click', () => {
          const product = products.find(p => p.id == card.dataset.id);
          addToCart(product);
          addToCartBtn.innerHTML = '<i class="fas fa-check"></i> Added';
          addToCartBtn.classList.add('added-to-cart');
          addToCartBtn.disabled = true;
          setTimeout(() => {
            if (addToCartBtn) {
              addToCartBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
              addToCartBtn.classList.remove('added-to-cart');
              addToCartBtn.disabled = false;
            }
          }, 2000);
        });
      });
    }

    // Show Product Detail
    function showProductDetail(productId) {
      const product = products.find(p => p.id == productId);
      if (!product) return;
      
      productDetailContent.innerHTML = `
        <div class="product-detail-layout">
          <div class="product-detail-img" id="productDetailImg">
            <img src="${product.img}" alt="${product.name}">
          </div>
          <div class="product-detail-info">
            <h3>${product.name}</h3>
            <p class="type">${product.type}</p>
            <p class="price">${formatPrice(product.price)}</p>
            <p class="description">${product.description}</p>
            <div class="actions">
              <button class="btn add-to-wishlist" data-id="${product.id}">
                <i class="fas fa-heart"></i> Add to Wishlist
              </button>
              <button class="btn add-to-cart-from-modal" data-id="${product.id}">
                <i class="fas fa-shopping-cart"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
      `;
      
      // Add zoom functionality to product image
      const productImg = document.getElementById('productDetailImg');
      productImg.addEventListener('click', () => {
        productImg.classList.toggle('zoomed');
      });
      
      // Add event listeners to modal buttons
      const addToWishlistBtn = productDetailContent.querySelector('.add-to-wishlist');
      addToWishlistBtn.addEventListener('click', function() {
        addToWishlist(product.id);
        addToWishlistBtn.innerHTML = '<i class="fas fa-heart"></i> Added to Wishlist';
        setTimeout(() => {
          if (addToWishlistBtn) {
            addToWishlistBtn.innerHTML = '<i class="fas fa-heart"></i> Add to Wishlist';
          }
        }, 2000);
      });
      
      const addToCartBtn = productDetailContent.querySelector('.add-to-cart-from-modal');
      addToCartBtn.addEventListener('click', function() {
        addToCart(product);
        addToCartBtn.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
        setTimeout(() => {
          if (addToCartBtn) {
            addToCartBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
          }
        }, 2000);
      });
      
      productDetailModal.classList.add('active');
    }

    // Cart Functionality
    function addToCart(product) {
      const existingItem = cart.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      updateCartCount();
      updateCartModal();
      showNotification(`${product.name} added to cart!`, 'success');
    }

    function removeFromCart(productId) {
      const itemIndex = cart.findIndex(item => item.id == productId);
      if (itemIndex > -1) {
        const item = cart[itemIndex];
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          cart.splice(itemIndex, 1);
        }
        updateCartCount();
        updateCartModal();
        showNotification(`${item.name} updated in cart.`, 'info');
      }
    }

    function updateCartCount() {
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCountNumber.textContent = count;
      document.querySelectorAll('.cart-count-number').forEach(el => {
        el.textContent = count;
      });
    }

    function updateCartModal() {
      cartItemsContainer.innerHTML = '';
      
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is currently empty.</p>';
        cartTotalElement.textContent = 'Total: ₹0.00';
        checkoutBtn.disabled = true;
        generateBillBtn.disabled = true;
        return;
      }
      
      checkoutBtn.disabled = false;
      generateBillBtn.disabled = false;
      let total = 0;
      
      cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
          <div class="cart-item-img"><img src="${item.img}" alt="${item.name}"></div>
          <div class="cart-item-details">
            <h4>${item.name}</h4>
            <p>Quantity: ${item.quantity}</p>
          </div>
          <div class="cart-item-price">${formatPrice(itemTotal)}</div>
          <i class="fas fa-times-circle cart-item-remove" data-id="${item.id}"></i>
        `;
        cartItemsContainer.appendChild(itemElement);
      });
      
      cartTotalElement.textContent = `Total: ${formatPrice(total)}`;
      
      // Add event listeners to remove buttons
      document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', (e) => {
          const itemId = e.target.dataset.id;
          removeFromCart(itemId);
        });
      });
    }

    // Wishlist Functionality
    function addToWishlist(productId) {
      const product = products.find(p => p.id == productId);
      if (product && !wishlist.some(item => item.id === productId)) {
        wishlist.push(product);
        updateWishlistCount();
        updateWishlistModal();
        showNotification(`${product.name} added to wishlist!`, 'success');
      }
    }

    function removeFromWishlist(productId) {
      const itemIndex = wishlist.findIndex(item => item.id == productId);
      if (itemIndex > -1) {
        const item = wishlist[itemIndex];
        wishlist.splice(itemIndex, 1);
        updateWishlistCount();
        updateWishlistModal();
        showNotification(`${item.name} removed from wishlist.`, 'info');
      }
    }

    function updateWishlistCount() {
      wishlistCount.textContent = `(${wishlist.length})`;
    }

    function updateWishlistModal() {
      const wishlistItems = document.getElementById('wishlistItems');
      
      if (wishlist.length === 0) {
        wishlistItems.innerHTML = `
          <div class="empty-wishlist" style="text-align:center; padding:40px 20px">
            <i class="fas fa-heart" style="font-size:3rem; color:#eee; margin-bottom:15px"></i>
            <h3>Your wishlist is empty</h3>
            <p>Start adding items you love</p>
            <a href="#collections" class="btn" style="margin-top:15px">Browse Collections</a>
          </div>
        `;
        return;
      }
      
      wishlistItems.innerHTML = '';
      wishlist.forEach(product => {
        const wishlistItem = document.createElement('div');
        wishlistItem.className = 'wishlist-item';
        wishlistItem.style.display = 'flex';
        wishlistItem.style.padding = '15px';
        wishlistItem.style.borderBottom = '1px solid #eee';
        wishlistItem.style.alignItems = 'center';
        wishlistItem.innerHTML = `
          <img src="${product.img}" alt="${product.name}" style="width:70px; height:70px; object-fit:cover; border-radius:5px; margin-right:15px">
          <div style="flex:1">
            <h4 style="margin-bottom:5px">${product.name}</h4>
            <p style="color:var(--primary); font-weight:600">${formatPrice(product.price)}</p>
          </div>
          <div style="display:flex; gap:10px">
            <button class="btn add-to-cart-from-wishlist" data-id="${product.id}" style="padding:8px 15px; font-size:0.9rem">Add to Cart</button>
            <button class="remove-wishlist" data-id="${product.id}" style="background:none; border:none; color:#999; cursor:pointer">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        `;
        wishlistItems.appendChild(wishlistItem);
      });
      
      // Add event listeners to wishlist buttons
      document.querySelectorAll('.add-to-cart-from-wishlist').forEach(button => {
        button.addEventListener('click', function() {
          const productId = this.dataset.id;
          const product = products.find(p => p.id == productId);
          if (product) {
            addToCart(product);
            showNotification(`${product.name} added to cart!`, 'success');
          }
        });
      });
      
      document.querySelectorAll('.remove-wishlist').forEach(button => {
        button.addEventListener('click', function() {
          const productId = this.dataset.id;
          removeFromWishlist(productId);
        });
      });
    }

    // Bill Generator
    function renderBillForm() {
      billForm.innerHTML = `
        <div class="form-group">
          <label for="customerName">Customer Name</label>
          <input type="text" id="customerName" placeholder="Enter full name" required>
        </div>
        
        <div class="form-group">
          <label for="customerEmail">Email Address</label>
          <input type="email" id="customerEmail" placeholder="Enter email address" required>
        </div>
        
        <div class="form-group">
          <label for="customerPhone">Phone Number</label>
          <input type="tel" id="customerPhone" placeholder="Enter phone number" required>
        </div>
        
        <div class="form-group">
          <label for="customerAddress">Delivery Address</label>
          <textarea id="customerAddress" rows="3" placeholder="Enter full address" required></textarea>
        </div>
        
        <!-- Cart Items Section -->
        <div class="bill-cart-items" id="billCartItems">
          <h3>Items in Cart</h3>
          <div id="billCartItemsList">
            ${cart.length ? cart.map(item => `
              <div class="cart-item-row">
                <div>${item.name} (${item.quantity})</div>
                <div>${formatPrice(item.price * item.quantity)}</div>
              </div>
            `).join('') : '<p>No items in cart. Add products to see them here.</p>'}
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="discount">Discount (%)</label>
            <input type="number" id="discount" min="0" max="100" value="0">
          </div>
          
          <div class="form-group">
            <label for="gst">GST (%)</label>
            <input type="number" id="gst" min="0" max="30" value="18">
          </div>
        </div>
        
        <div class="form-group">
          <label for="personalMessage">Personal Message</label>
          <textarea id="personalMessage" rows="2" placeholder="Add a personal message for the customer">Thank you for your purchase! We hope you love your new saree and visit us again for more exquisite collections.</textarea>
        </div>
        
        <div class="form-group">
          <label for="notes">Additional Notes</label>
          <textarea id="notes" rows="2" placeholder="Any special instructions?"></textarea>
        </div>
      `;
      
      billForm.addEventListener('input', updateBillPreview);
      updateBillPreview();
    }

    function updateBillPreview() {
      const customerName = document.getElementById('customerName').value || '-';
      const customerEmail = document.getElementById('customerEmail').value || '-';
      const customerPhone = document.getElementById('customerPhone').value || '-';
      const customerAddress = document.getElementById('customerAddress').value || '-';
      const personalMessage = document.getElementById('personalMessage').value || '';
      const discount = parseFloat(document.getElementById('discount').value) || 0;
      const gst = parseFloat(document.getElementById('gst').value) || 18;
      const notes = document.getElementById('notes').value || '-';
      
      const billIdSuffix = Math.floor(1000 + Math.random() * 9000);
      const billId = `#INV-${new Date().getFullYear()}-${billIdSuffix}`;
      const now = new Date();
      
      // Calculate totals from cart
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const discountAmount = subtotal * (discount / 100);
      const taxable = subtotal - discountAmount;
      const gstAmount = taxable * (gst / 100);
      const total = taxable + gstAmount;
      
      billPreview.innerHTML = `
        <div class="bill-preview-header">
          <div>
            <h3>Bill Preview</h3>
            <p>Review your bill details before finalizing</p>
          </div>
          <div class="bill-id">${billId}</div>
        </div>
        
        <div class="bill-details">
          <div class="bill-row">
            <strong>Date:</strong> <span id="previewDate">${formatDate(now)}</span>
          </div>
          <div class="bill-row">
            <strong>Time:</strong> <span id="previewTime">${formatTime(now)}</span>
          </div>
          <div class="bill-row">
            <strong>Customer:</strong> <span id="previewName">${customerName}</span>
          </div>
          <div class="bill-row">
            <strong>Email:</strong> <span id="previewEmail">${customerEmail}</span>
          </div>
          <div class="bill-row">
            <strong>Phone:</strong> <span id="previewPhone">${customerPhone}</span>
          </div>
          <div class="bill-row">
            <strong>Address:</strong> <span id="previewAddress">${customerAddress}</span>
          </div>
          
          <div class="bill-row">
            <strong>Items:</strong>
          </div>
          ${cart.map(item => `
            <div class="bill-row">
              <span>${item.name} (Qty: ${item.quantity})</span>
              <span>${formatPrice(item.price * item.quantity)}</span>
            </div>
          `).join('')}
          
          <div class="bill-row">
            <strong>Subtotal:</strong> <span id="previewSubtotal">${formatPrice(subtotal)}</span>
          </div>
          <div class="bill-row">
            <strong>Discount:</strong> <span id="previewDiscountVal">${discount}</span>% (${formatPrice(discountAmount)})
          </div>
          <div class="bill-row">
            <strong>GST (${gst}%):</strong> <span id="previewGST">${formatPrice(gstAmount)}</span>
          </div>
          <div class="bill-row" id="previewTotalRow">
            <strong>Total Amount:</strong> <span id="previewTotal">${formatPrice(total)}</span>
          </div>
          
          ${personalMessage ? `
          <div class="personalized-message">
            <strong>Personal Message:</strong>
            <p>${personalMessage}</p>
          </div>
          ` : ''}
          
          <div class="bill-row" style="margin-top: 10px;">
            <strong>Notes:</strong> <span id="previewNotes">${notes}</span>
          </div>
          
          <div class="motivational-quote">
            "Every woman is a goddess. Drape yourself in elegance and let your inner beauty shine."
          </div>
        </div>
      `;
    }

    function generatePDF() {
      if (!document.getElementById('customerName').value || !document.getElementById('customerPhone').value) {
        showNotification('Please fill customer name and phone number.', 'error');
        return;
      }
      
      showLoader();
      
      setTimeout(() => {
        const doc = new jsPDF();
        const pageHeight = doc.internal.pageSize.height;
        const pageWidth = doc.internal.pageSize.width;
        let currentY = 20;

        // Header
        doc.setFontSize(26);
        doc.setFont('Playfair Display', 'bold');
        doc.setTextColor(139, 0, 0);
        doc.text('SilkSutra', pageWidth / 2, currentY, { align: 'center' });
        currentY += 8;

        doc.setFontSize(10);
        doc.setFont('Poppins', 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text('Premium Saree Boutique', pageWidth / 2, currentY, { align: 'center' });
        currentY += 15;

        // Invoice Title
        doc.setFontSize(18);
        doc.setFont('Playfair Display', 'bold');
        doc.setTextColor(0,0,0);
        doc.text(' INVOICE ', pageWidth / 2, currentY, { align: 'center' });
        currentY += 10;
        doc.setLineWidth(0.5);
        doc.setDrawColor(212, 175, 55);
        doc.line(20, currentY, pageWidth - 20, currentY);
        currentY += 10;

        // Bill Details
        doc.setFontSize(10);
        doc.setFont('Poppins', 'normal');
        doc.setTextColor(50,50,50);

        const invoiceID = document.querySelector('.bill-id').textContent;
        const dateStr = document.getElementById('previewDate').textContent;
        const timeStr = document.getElementById('previewTime').textContent;
        const customerName = document.getElementById('customerName').value;
        const personalMessage = document.getElementById('personalMessage').value;
        
        doc.text(`Invoice ID: ${invoiceID}`, 20, currentY);
        doc.text('SilkSutra Boutique', pageWidth - 20, currentY, { align: 'right'});
        currentY += 5;
        doc.text(`Date: ${dateStr}`, 20, currentY);
        doc.text(`Time: ${timeStr}`, pageWidth - 20, currentY, { align: 'right'});
        currentY += 5;
        doc.text('', 20, currentY);
        doc.text('413702 Near flyover Solapur', pageWidth - 20, currentY, { align: 'right'});
        currentY += 5;
        doc.text('Ahmadnagar City, IN', pageWidth - 20, currentY, { align: 'right'});
        currentY += 15;

        // Customer Info
        doc.setFontSize(12);
        doc.setFont('Playfair Display', 'bold');
        doc.setTextColor(139, 0, 0);
        doc.text('Bill To:', 20, currentY);
        currentY += 8;

        doc.setFontSize(10);
        doc.setFont('Poppins', 'normal');
        doc.setTextColor(50,50,50);
        doc.text(`Customer: ${customerName || 'N/A'}`, 20, currentY);
        currentY += 6;
        doc.text(`Email: ${document.getElementById('customerEmail').value || 'N/A'}`, 20, currentY);
        currentY += 6;
        doc.text(`Phone: ${document.getElementById('customerPhone').value || 'N/A'}`, 20, currentY);
        currentY += 6;
        const addressLines = doc.splitTextToSize(`Address: ${document.getElementById('customerAddress').value || 'N/A'}`, pageWidth - 40);
        doc.text(addressLines, 20, currentY);
        currentY += (addressLines.length * 5) + 5;

        // Item Details
        currentY += 5;
        doc.setFillColor(240, 240, 240);
        doc.rect(20, currentY, pageWidth - 40, 10, 'F');
        doc.setFontSize(11);
        doc.setFont('Poppins', 'bold');
        doc.setTextColor(0,0,0);
        doc.text('Item Description', 25, currentY + 7);
        doc.text('Qty', pageWidth / 2 + 10, currentY + 7, {align: 'center'});
        doc.text('Unit Price', pageWidth / 2 + 45, currentY + 7, {align: 'right'});
        doc.text('Total', pageWidth - 25, currentY + 7, {align: 'right'});
        currentY += 15;

        // Cart Items
        cart.forEach(item => {
          doc.setFontSize(10);
          doc.setFont('Poppins', 'normal');
          doc.setTextColor(50,50,50);
          const itemTotal = item.price * item.quantity;
          
          doc.text(item.name, 25, currentY);
          doc.text(item.quantity.toString(), pageWidth / 2 + 10, currentY, {align: 'center'});
          doc.text(`${formatPrice(item.price)}`, pageWidth / 2 + 45, currentY, {align: 'right'});
          doc.text(`${formatPrice(itemTotal)}`, pageWidth - 25, currentY, {align: 'right'});
          currentY += 10;
        });
        
        doc.setLineDashPattern([1, 1], 0);
        doc.line(20, currentY - 5, pageWidth - 20, currentY - 5);
        doc.setLineDashPattern([], 0);

        // Totals Section
        currentY += 5;
        const col1X = pageWidth - 80;
        const col2X = pageWidth - 25;

        // Calculate totals
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discount = parseFloat(document.getElementById('discount').value) || 0;
        const discountAmount = subtotal * (discount / 100);
        const taxable = subtotal - discountAmount;
        const gst = parseFloat(document.getElementById('gst').value) || 18;
        const gstAmount = taxable * (gst / 100);
        const total = taxable + gstAmount;
        
        doc.text('Subtotal:', col1X, currentY, {align: 'right'});
        doc.text(`${formatPrice(subtotal)}`, col2X, currentY, {align: 'right'});
        currentY += 7;

        doc.text(`Discount (${discount}%):`, col1X, currentY, {align: 'right'});
        doc.text(`- ${formatPrice(discountAmount)}`, col2X, currentY, {align: 'right'});
        currentY += 7;

        doc.text(`GST (${gst}%):`, col1X, currentY, {align: 'right'});
        doc.text(`+ ${formatPrice(gstAmount)}`, col2X, currentY, {align: 'right'});
        currentY += 7;

        doc.setLineWidth(0.3);
        doc.line(col1X - 10, currentY, col2X + 5, currentY);
        currentY += 5;

        doc.setFontSize(12);
        doc.setFont('Poppins', 'bold');
        doc.text('Total Amount:', col1X, currentY, {align: 'right'});
        doc.text(`${formatPrice(total)}`, col2X, currentY, {align: 'right'});
        currentY += 15;
        
        // Personal Message
        if (personalMessage) {
          doc.setFontSize(10);
          doc.setFont('Poppins', 'italic');
          doc.setTextColor(80,80,80);
          doc.text('Personal Message:', 20, currentY);
          currentY += 5;
          const messageLines = doc.splitTextToSize(personalMessage, pageWidth - 40);
          doc.setFont('Poppins', 'normal');
          doc.text(messageLines, 20, currentY);
          currentY += (messageLines.length * 5) + 5;
        }
        
        // Notes
        if (document.getElementById('notes').value) {
          doc.setFontSize(10);
          doc.setFont('Poppins', 'italic');
          doc.setTextColor(80,80,80);
          doc.text('Notes:', 20, currentY);
          currentY += 5;
          const notesLines = doc.splitTextToSize(document.getElementById('notes').value, pageWidth - 40);
          doc.setFont('Poppins', 'normal');
          doc.text(notesLines, 20, currentY);
          currentY += (notesLines.length * 5) + 5;
        }
        
        // Motivational Quote
        doc.setFontSize(10);
        doc.setFont('Playfair Display', 'italic');
        doc.setTextColor(93, 64, 55);
        doc.text('"Every woman is a goddess. Drape yourself in elegance and let your inner beauty shine."', pageWidth / 2, currentY, { align: 'center' });
        currentY += 10;

        // Footer
        const footerY = pageHeight - 30;
        doc.setLineWidth(0.5);
        doc.setDrawColor(212, 175, 55);
        doc.line(20, footerY, pageWidth - 20, footerY);
        
        doc.setFontSize(9);
        doc.setFont('Poppins', 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text('Thank you for your purchase at SilkSutra!', pageWidth / 2, footerY + 10, { align: 'center' });
        doc.text('All sarees are subject to our standard return policy. Please visit www.silksutra.com/returns for details.', pageWidth / 2, footerY + 15, { align: 'center' });
        
        // Save PDF
        doc.save(`SilkSutra-Invoice-${customerName.replace(/\s+/g, '_') || 'Customer'}-${invoiceID}.pdf`);
        hideLoader();
        showNotification('PDF downloaded successfully!', 'success');
      }, 1000);
    }

    // Search Functionality
    function performSearch(query) {
      searchResults.innerHTML = '';
      
      if (!query.trim()) {
        searchResults.innerHTML = '<div class="no-results">Start typing to search our collection</div>';
        return;
      }
      
      const searchTerm = query.toLowerCase();
      const results = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.type.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
      
      if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No products found. Try another search term.</div>';
        return;
      }
      
      results.forEach(product => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
          <img src="${product.img}" alt="${product.name}">
          <div class="item-info">
            <h4>${product.name}</h4>
            <p>${formatPrice(product.price)}</p>
          </div>
        `;
        resultItem.addEventListener('click', function() {
          showProductDetail(product.id);
          closeSearch();
        });
        searchResults.appendChild(resultItem);
      });
    }

    function toggleSearch() {
      searchBarContainer.classList.toggle('active');
      if (searchBarContainer.classList.contains('active')) {
        searchInput.focus();
      }
    }

    function closeSearch() {
      searchBarContainer.classList.remove('active');
      searchInput.value = '';
      searchResults.innerHTML = '';
    }

    // User Authentication
    function toggleUserDropdown() {
      if (isLoggedIn) {
        userDropdown.classList.toggle('active');
      } else {
        loginModal.classList.add('active');
      }
    }

    function closeUserDropdown() {
      userDropdown.classList.remove('active');
    }

    function login() {
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      
      if (email && password) {
        showLoader();
        setTimeout(() => {
          isLoggedIn = true;
          user = {
            name: "Jane Smith",
            email: email,
            orders: user.orders
          };
          
          localStorage.setItem('silkSutraUser', JSON.stringify(user));
          loginModal.classList.remove('active');
          hideLoader();
          showNotification(`Welcome back, ${user.name}!`, 'success');
        }, 1500);
      } else {
        showNotification('Please enter both email and password', 'error');
      }
    }
    
    function register() {
      const name = document.getElementById('registerName').value;
      const email = document.getElementById('registerEmail').value;
      const phone = document.getElementById('registerPhone').value;
      const password = document.getElementById('registerPassword').value;
      const confirmPassword = document.getElementById('registerConfirmPassword').value;
      
      if (!name || !email || !phone || !password || !confirmPassword) {
        showNotification('Please fill all fields', 'error');
        return;
      }
      
      if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
      }
      
      // Simulate registration
      showLoader();
      setTimeout(() => {
        isLoggedIn = true;
        user = {
          name: name,
          email: email,
          phone: phone,
          orders: []
        };
        
        localStorage.setItem('silkSutraUser', JSON.stringify(user));
        loginModal.classList.remove('active');
        hideLoader();
        showNotification(`Welcome to SilkSutra, ${name}!`, 'success');
      }, 1500);
    }

    function logout() {
      isLoggedIn = false;
      user = null;
      localStorage.removeItem('silkSutraUser');
      closeUserDropdown();
      showNotification('You have been logged out', 'info');
    }

    function openProfile() {
      if (isLoggedIn) {
        document.getElementById('profileName').textContent = user.name;
        document.getElementById('profileEmail').textContent = user.email;
        document.getElementById('profileFullName').value = user.name;
        document.getElementById('profileEmailInput').value = user.email;
        document.getElementById('profilePhone').value = user.phone || '';
        document.getElementById('profileAddress').value = user.address || '';
        profileModal.classList.add('active');
      } else {
        loginModal.classList.add('active');
      }
    }
    
    function renderOrderHistory() {
      if (!isLoggedIn || !user.orders || user.orders.length === 0) {
        orderHistoryContainer.innerHTML = `
          <div style="text-align: center; padding: 20px;">
            <i class="fas fa-shopping-bag" style="font-size: 3rem; color: #eee; margin-bottom: 15px;"></i>
            <p>No orders yet</p>
          </div>
        `;
        return;
      }
      
      orderHistoryContainer.innerHTML = '';
      user.orders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.className = 'order-item';
        orderElement.innerHTML = `
          <div class="order-header">
            <span class="order-id">${order.id}</span>
            <span class="order-date">${formatDate(order.date)}</span>
          </div>
          <div class="order-details">
            <div class="order-img">
              <img src="${order.items[0].img}" alt="${order.items[0].name}">
            </div>
            <div class="order-info">
              <h5>${order.items[0].name}</h5>
              <p>${order.items.length} item${order.items.length > 1 ? 's' : ''}</p>
              <div class="order-price">${formatPrice(order.total)}</div>
              <span class="order-status ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
            </div>
          </div>
        `;
        orderHistoryContainer.appendChild(orderElement);
      });
    }
    
    function openWishlist() {
      if (isLoggedIn) {
        wishlistModal.classList.add('active');
        updateWishlistModal();
      } else {
        loginModal.classList.add('active');
      }
    }
    
    function saveProfile() {
      const name = document.getElementById('profileFullName').value;
      const email = document.getElementById('profileEmailInput').value;
      const phone = document.getElementById('profilePhone').value;
      const address = document.getElementById('profileAddress').value;
      
      if (!name || !email) {
        showNotification('Name and email are required', 'error');
        return;
      }
      
      user = {
        ...user,
        name: name,
        email: email,
        phone: phone,
        address: address
      };
      
      localStorage.setItem('silkSutraUser', JSON.stringify(user));
      showNotification('Profile updated successfully!', 'success');
      profileModal.classList.remove('active');
    }

    // Filter Products
    function filterProducts() {
      showLoader();
      
      setTimeout(() => {
        const category = categoryFilter.value;
        const priceRange = priceFilter.value;
        const color = colorFilter.value;
        const occasion = occasionFilter.value;
        const sort = sortBy.value;
        
        let filteredProducts = [...products];
        
        // Category filter
        if (category !== 'all') {
          filteredProducts = filteredProducts.filter(product => product.category === category);
        }
        
        // Color filter
        if (color !== 'all') {
          filteredProducts = filteredProducts.filter(product => product.color === color);
        }
        
        // Occasion filter
        if (occasion !== 'all') {
          filteredProducts = filteredProducts.filter(product => product.occasion === occasion);
        }
        
        // Price filter
        if (priceRange !== 'all') {
          const [min, max] = priceRange.split('-').map(Number);
          if (max) {
            filteredProducts = filteredProducts.filter(product => product.price >= min && product.price <= max);
          } else {
            filteredProducts = filteredProducts.filter(product => product.price > min);
          }
        }
        
        // Sort products
        switch(sort) {
          case 'newest':
            filteredProducts.reverse();
            break;
          case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
          case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        }
        
        renderProducts(filteredProducts);
        hideLoader();
        showNotification(`Showing ${filteredProducts.length} products`, 'info');
      }, 800);
    }

    // Event Listeners
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    
    searchIcon.addEventListener('click', toggleSearch);
    searchCloseBtn.addEventListener('click', closeSearch);
    userIcon.addEventListener('click', toggleUserDropdown);
    profileLink.addEventListener('click', openProfile);
    ordersLink.addEventListener('click', openProfile);
    wishlistLink.addEventListener('click', openWishlist);
    logoutLink.addEventListener('click', logout);
    cartIconContainer.addEventListener('click', () => {
      updateCartModal();
      cartModal.classList.add('active');
    });
    mobileCartIconContainer.addEventListener('click', () => {
      updateCartModal();
      cartModal.classList.add('active');
    });
    
    closeProductDetailModal.addEventListener('click', () => productDetailModal.classList.remove('active'));
    closeCartModal.addEventListener('click', () => cartModal.classList.remove('active'));
    closeLoginModal.addEventListener('click', () => loginModal.classList.remove('active'));
    closeProfileModal.addEventListener('click', () => profileModal.classList.remove('active'));
    closeWishlistModal.addEventListener('click', () => wishlistModal.classList.remove('active'));
    
    continueShoppingBtn.addEventListener('click', () => cartModal.classList.remove('active'));
    checkoutBtn.addEventListener('click', () => {
      if (cart.length > 0) {
        if (!isLoggedIn) {
          loginModal.classList.add('active');
          showNotification('Please login to proceed to checkout', 'info');
        } else {
          showNotification('Redirecting to checkout...', 'info');
          cartModal.classList.remove('active');
          
          // Create new order
          const orderId = `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
          const newOrder = {
            id: orderId,
            date: new Date().toISOString(),
            items: [...cart],
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            status: "processing"
          };
          
          user.orders.unshift(newOrder);
          localStorage.setItem('silkSutraUser', JSON.stringify(user));
          
          // Clear cart
          cart = [];
          updateCartCount();
          
          // Update order history
          renderOrderHistory();
        }
      } else {
        showNotification('Your cart is empty.', 'error');
      }
    });
    
    generateBillBtn.addEventListener('click', function() {
      cartModal.classList.remove('active');
      document.getElementById('bill').scrollIntoView({ behavior: 'smooth' });
      renderBillForm();
    });
    
    loginBtn.addEventListener('click', login);
    registerBtn.addEventListener('click', register);
    saveProfileBtn.addEventListener('click', saveProfile);
    
    loginTab.addEventListener('click', () => {
      loginTab.classList.add('active');
      registerTab.classList.remove('active');
      loginForm.classList.add('active');
      registerForm.classList.remove('active');
    });
    
    registerTab.addEventListener('click', () => {
      registerTab.classList.add('active');
      loginTab.classList.remove('active');
      registerForm.classList.add('active');
      loginForm.classList.remove('active');
    });
    
    whatsappBtn.addEventListener('click', function() {
      if (!document.getElementById('customerName').value || 
          !document.getElementById('customerPhone').value) {
        showNotification('Please fill customer name and phone number.', 'error');
        return;
      }
      
      const customerName = document.getElementById('customerName').value;
      const personalMessage = document.getElementById('personalMessage').value;
      const motivationalQuote = "Every woman is a goddess. Drape yourself in elegance and let your inner beauty shine.";
      
      const message = `Hello ${customerName},\n\nThank you for your purchase at SilkSutra!\n\n${personalMessage}\n\n${motivationalQuote}\n\nWe'll deliver your order soon!`;
      const whatsappUrl = `https://wa.me/${document.getElementById('customerPhone').value}?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, '_blank');
    });
    
    emailBtn.addEventListener('click', function() {
      if (!document.getElementById('customerName').value || 
          !document.getElementById('customerEmail').value) {
        showNotification('Please fill customer name and email address.', 'error');
        return;
      }
      
      const customerName = document.getElementById('customerName').value;
      const personalMessage = document.getElementById('personalMessage').value;
      const motivationalQuote = "Every woman is a goddess. Drape yourself in elegance and let your inner beauty shine.";
      
      const subject = `SilkSutra Purchase Invoice for ${customerName}`;
      const body = `Dear ${customerName},\n\nThank you for your purchase at SilkSutra!\n\n${personalMessage}\n\n${motivationalQuote}\n\nWe'll deliver your order soon!\n\nBest regards,\nSilkSutra Team`;
      
      const mailtoLink = `mailto:${document.getElementById('customerEmail').value}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      window.location.href = mailtoLink;
    });
    
    pdfBtn.addEventListener('click', generatePDF);
    
    searchInput.addEventListener('input', function() {
      performSearch(this.value);
    });
    
    applyFiltersBtn.addEventListener('click', filterProducts);
    
    document.addEventListener('click', function(e) {
      if (!userIcon.contains(e.target) && !userDropdown.contains(e.target)) {
        closeUserDropdown();
      }
      
      if (!searchIcon.contains(e.target) && !searchBarContainer.contains(e.target)) {
        closeSearch();
      }
    });
    
    window.addEventListener('DOMContentLoaded', initApp);

    <!-- validation for contact form -->

    // DOMContentLoaded ensures the DOM is fully loaded before executing
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formGroups = document.querySelectorAll('.form-group');
  
  // Add CSS for validation styles
  const style = document.createElement('style');
  style.innerHTML = `
    .error { border: 1px solid #e74c3c !important; }
    .success { border: 1px solid #2ecc71 !important; }
    .error-message { 
      color: #e74c3c; 
      font-size: 0.85rem;
      margin-top: 5px;
      display: block;
    }
    .success-message {
      color: #2ecc71;
      font-size: 1.1rem;
      text-align: center;
      margin-top: 20px;
      padding: 15px;
      background: #f8fff9;
      border-radius: 4px;
    }
  `;
  document.head.appendChild(style);

  // Validation rules
  const validationRules = {
    name: value => value.trim().length >= 2,
    email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    phone: value => !value || /^(\+91[\-\s]?)?[6789]\d{9}$/.test(value),
    subject: value => !value || value.trim().length >= 3,
    message: value => value.trim().length >= 10
  };

  // Error messages
  const errorMessages = {
    name: 'Name must be at least 2 characters',
    email: 'Please enter a valid email address',
    phone: 'Please enter a valid Indian phone number',
    subject: 'Subject must be at least 3 characters',
    message: 'Message must be at least 10 characters'
  };

  // Create error message element
  function createErrorMessageElement(input) {
    const error = document.createElement('span');
    error.className = 'error-message';
    input.parentNode.appendChild(error);
    return error;
  }

  // Validate individual field
  function validateField(input) {
    const fieldId = input.id;
    const value = input.value;
    const isValid = validationRules[fieldId](value);
    const errorElement = input.parentNode.querySelector('.error-message') || createErrorMessageElement(input);

    if (!isValid) {
      input.classList.remove('success');
      input.classList.add('error');
      errorElement.textContent = errorMessages[fieldId];
      return false;
    } else {
      input.classList.remove('error');
      input.classList.add('success');
      errorElement.textContent = '';
      return true;
    }
  }

  // Real-time validation
  formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    
    input.addEventListener('blur', () => validateField(input));
    
    input.addEventListener('input', () => {
      if (input.classList.contains('error') || input.classList.contains('success')) {
        validateField(input);
      }
    });
  });

  // Form submission handler
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isFormValid = true;
    
    // Validate all fields
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      if (!validateField(input)) isFormValid = false;
    });

    // Submit if valid
    if (isFormValid) {
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      
      // Simulate API request
      setTimeout(() => {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" stroke-width="2" style="display:inline-block;vertical-align:-5px;margin-right:10px;">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          Message sent successfully! We'll contact you shortly.
        `;
        
        contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
          successMessage.remove();
          
          // Reset field styles
          inputs.forEach(input => input.classList.remove('success'));
        }, 3000);
      }, 1500);
    }
  });

  // Phone number formatting
  const phoneInput = document.getElementById('phone');
  phoneInput.addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    
    if (value.length > 10) {
      value = value.substring(0, 10);
    }
    
    // Format as Indian phone number
    if (value.length > 0) {
      value = value.match(/.{1,4}/g).join('');
    }
    
    this.value = value;
  });
});

        document.addEventListener('DOMContentLoaded', function() {
            const emailInput = document.getElementById('newsletterEmail');
            const subscribeBtn = document.getElementById('subscribeBtn');
            const messageDiv = document.getElementById('message');
            
            // Handle form submission
            function handleSubscription() {
                const email = emailInput.value.trim();
                
                // Reset message
                messageDiv.style.display = 'none';
                
                // Validate email
                if (!email) {
                    showMessage('Please enter your email address', 'error');
                    return;
                }
                
                if (!validateEmail(email)) {
                    showMessage('Please enter a valid email address', 'error');
                    return;
                }
                
                // Simulate sending email
                simulateEmailSending(email);
            }
            
            // Validate email format
            function validateEmail(email) {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }
            
            // Show message to user
            function showMessage(text, type) {
                messageDiv.textContent = text;
                messageDiv.className = type;
                messageDiv.style.display = 'block';
                
                // Add bounce animation to button for error
                if (type === 'error') {
                    subscribeBtn.classList.add('bounce');
                    setTimeout(() => {
                        subscribeBtn.classList.remove('bounce');
                    }, 1000);
                }
            }
            
            // Simulate email sending
            function simulateEmailSending(email) {
                // Show loading state
                subscribeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                subscribeBtn.disabled = true;
                
                // Simulate network delay
                setTimeout(() => {
                    // Success message
                    showMessage('Thank you for subscribing! You will receive a confirmation email shortly.', 'success');
                    
                    // Reset form
                    emailInput.value = '';
                    subscribeBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
                    subscribeBtn.disabled = false;
                    
                    // Update subscriber count
                    updateSubscriberCount();
                }, 1500);
            }
            
            // Update subscriber count animation
            function updateSubscriberCount() {
                const countElement = document.querySelector('.stat-item .number');
                let count = parseInt(countElement.textContent);
                
                // Animate count increase
                const increment = () => {
                    count++;
                    countElement.textContent = count + 'K+';
                    
                    if (count < 16) {
                        setTimeout(increment, 100);
                    }
                };
                
                increment();
            }
            
            // Event listeners
            subscribeBtn.addEventListener('click', handleSubscription);
            
            emailInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleSubscription();
                }
            });
        });