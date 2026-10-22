
import './style.css';

const app = document.querySelector('#app');

const products = [
  {
    name: 'Air Phantom',
    price: 5499,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700'
  },
  {
    name: 'Street Classic',
    price: 4299,
    category: 'Streetwear',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=700'
  },
  {
    name: 'Court Vision',
    price: 3799,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=700'
  },
  {
    name: 'Cloud Runner',
    price: 4999,
    category: 'Running',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=700'
  }
];

const formatPrice = price =>
  '₹' + Number(price).toLocaleString('en-IN');

// Load saved cart
let cart = [];

try {
  const savedCart = JSON.parse(
    localStorage.getItem('sneakerCart') || '[]'
  );

  cart = Array.isArray(savedCart)
    ? savedCart.map(item => ({
        ...item,
        quantity: Math.max(1, Number(item.quantity) || 1)
      }))
    : [];
} catch {
  cart = [];
}

function saveCart() {
  localStorage.setItem('sneakerCart', JSON.stringify(cart));
}

function cartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function cartTotal() {
  return cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}

// Notify the React Experiment 3 cart when storefront cart changes
function notifyCartUpdated() {
  window.dispatchEvent(new Event('sneakerCartUpdated'));
}

// Add a product to cart
function addToCart(name) {
  const product = products.find(item => item.name === name);

  if (!product) return;

  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  notifyCartUpdated();
  showHome();

  const message = app.querySelector('#cart-message');

  if (message) {
    message.textContent = `${product.name} added to cart successfully!`;
    message.classList.remove('hidden');
  }
}

// Change quantity
function changeQuantity(name, amount) {
  const item = cart.find(entry => entry.name === name);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(entry => entry.name !== name);
  }

  saveCart();
  notifyCartUpdated();
  showCart();
}

// Remove product
function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);

  saveCart();
  notifyCartUpdated();
  showCart();
}

// HOME PAGE
function showHome() {
  app.innerHTML = `
    <div class="min-h-screen bg-[#101010] text-white">

      <div class="bg-orange-500 px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.2em] text-black">
        Step out. Stand apart.
      </div>

      <header class="sticky top-0 z-20 border-b border-white/10 bg-[#101010]/95">
        <nav class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5">

          <button data-page="home" class="text-2xl font-black tracking-tighter">
            SNEAKER<span class="text-orange-500">HUB.</span>
          </button>

          <div class="hidden items-center gap-7 text-sm text-gray-300 md:flex">
            <a href="#home" class="hover:text-orange-400">Home</a>
            <a href="#collection" class="hover:text-orange-400">Collection</a>
            <a href="#about" class="hover:text-orange-400">About</a>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button data-page="cart"
              class="rounded-full border border-orange-500 px-4 py-2.5 text-sm font-bold text-orange-500 hover:bg-orange-500 hover:text-black">
              🛒 Cart (${cartCount()})
            </button>

            <button data-page="login"
              class="rounded-full border border-white/20 px-4 py-2.5 text-sm font-bold hover:border-orange-500">
              Login
            </button>

            <button data-page="register"
              class="rounded-full bg-orange-500 px-4 py-2.5 text-sm font-bold text-black hover:bg-orange-400">
              Sign Up
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section id="home"
          class="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-24">

          <div>
            <p class="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
              The new sneaker culture
            </p>

            <h1 class="mt-6 text-6xl font-black leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl">
              OWN YOUR<br />
              <span class="text-orange-500">GROUND.</span>
            </h1>

            <p class="mt-6 max-w-lg text-base leading-7 text-gray-400">
              Discover statement sneakers, everyday icons and fresh styles
              made to take your look to another level.
            </p>

            <a href="#collection"
              class="mt-8 inline-flex items-center gap-5 rounded-full bg-orange-500 px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition hover:bg-orange-400">
              Explore Collection <span class="text-xl">↗</span>
            </a>

            <div class="mt-12 grid max-w-md grid-cols-3 border-t border-white/10 pt-6">
              <div>
                <p class="text-2xl font-black">01<span class="text-orange-500">.</span></p>
                <p class="mt-1 text-xs text-gray-500">Find your fit</p>
              </div>
              <div>
                <p class="text-2xl font-black">02<span class="text-orange-500">.</span></p>
                <p class="mt-1 text-xs text-gray-500">Own your style</p>
              </div>
              <div>
                <p class="text-2xl font-black">03<span class="text-orange-500">.</span></p>
                <p class="mt-1 text-xs text-gray-500">Move different</p>
              </div>
            </div>
          </div>

          <div class="relative">
            <div class="absolute inset-0 rounded-full bg-orange-500/10 blur-3xl"></div>
            <div class="relative rotate-2 overflow-hidden rounded-3xl border border-white/10 bg-[#202020] p-3 transition duration-500 hover:rotate-0">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1100"
                alt="Featured red sneaker"
                class="h-[350px] w-full rounded-2xl object-cover sm:h-[470px]"
              />
              <div class="absolute bottom-6 left-6 right-6 flex items-end justify-between rounded-2xl border border-white/10 bg-black/75 p-5">
                <div>
                  <p class="text-xs uppercase tracking-widest text-orange-400">Featured drop</p>
                  <h2 class="mt-2 text-xl font-black">AIR PHANTOM</h2>
                </div>
                <p class="font-bold">${formatPrice(products[0].price)}</p>
              </div>
            </div>
          </div>
        </section>

        <section class="border-y border-white/10 bg-[#181818]">
          <div class="mx-auto grid max-w-7xl gap-5 px-5 py-7 sm:grid-cols-3">
            <div class="flex items-center gap-4">
              <span class="text-2xl text-orange-500">✳</span>
              <div>
                <p class="font-bold">Curated Styles</p>
                <p class="mt-1 text-xs text-gray-500">Fresh picks for your rotation</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-2xl text-orange-500">◇</span>
              <div>
                <p class="font-bold">Everyday Comfort</p>
                <p class="mt-1 text-xs text-gray-500">Styles for everyday moves</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-2xl text-orange-500">↗</span>
              <div>
                <p class="font-bold">Your Own Identity</p>
                <p class="mt-1 text-xs text-gray-500">Make the look your own</p>
              </div>
            </div>
          </div>
        </section>

        <section id="collection" class="mx-auto max-w-7xl px-5 py-20">
          <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
                Selected for you
              </p>
              <h2 class="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                THE COLLECTION.
              </h2>
              <p class="mt-3 text-sm text-gray-400">Find your next favourite pair.</p>
            </div>

            <input id="search" type="search"
              placeholder="Search sneakers..."
              class="w-full rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-sm outline-none focus:border-orange-500 md:w-64" />
          </div>

          <p id="cart-message"
            class="hidden mt-5 rounded-xl border border-orange-500/30 bg-orange-500/10 p-3 text-sm text-orange-300"
            role="status"></p>

          <div id="products" class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            ${products.map(product => `
              <article class="group overflow-hidden rounded-2xl border border-white/10 bg-[#191919] transition duration-300 hover:-translate-y-2 hover:border-orange-500/50">
                <div class="overflow-hidden bg-[#252525]">
                  <img src="${product.image}" alt="${product.name}"
                    class="h-64 w-full object-cover transition duration-500 group-hover:scale-110" />
                </div>

                <div class="p-5">
                  <p class="text-xs font-bold uppercase tracking-widest text-orange-500">
                    ${product.category}
                  </p>
                  <h3 class="mt-3 text-xl font-black">${product.name}</h3>

                  <div class="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <span class="font-bold">${formatPrice(product.price)}</span>
                    <button data-product="${product.name}"
                      class="rounded-full bg-white px-4 py-2 text-xs font-bold text-black transition hover:bg-orange-500">
                      View ↗
                    </button>
                  </div>

                  <button data-add="${product.name}"
                    class="mt-3 w-full rounded-full bg-orange-500 px-4 py-3 text-sm font-bold text-black hover:bg-orange-400">
                    Add to Cart 🛒
                  </button>
                </div>
              </article>
            `).join('')}
          </div>

          <p id="no-results" class="hidden py-12 text-center text-gray-400">
            No sneakers found. Try another search.
          </p>
        </section>

        <section id="about" class="border-y border-white/10 bg-[#191919]">
          <div class="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 py-16 md:flex-row md:items-center">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">More than footwear</p>
              <h2 class="mt-4 text-4xl font-black sm:text-5xl">WALK YOUR OWN WAY.</h2>
            </div>
            <button data-page="register"
              class="w-fit rounded-full bg-orange-500 px-7 py-4 text-sm font-black uppercase tracking-wider text-black hover:bg-orange-400">
              Join the community ↗
            </button>
          </div>
        </section>
      </main>

      <footer class="flex flex-col justify-between gap-4 bg-black px-5 py-8 sm:flex-row sm:items-center">
        <p class="text-xl font-black">SNEAKER<span class="text-orange-500">HUB.</span></p>
        <p class="text-xs text-gray-500">© 2026 SneakerHub. All rights reserved.</p>
        <button data-page="login" class="text-sm text-gray-400 hover:text-orange-500">Member Login</button>
      </footer>
    </div>
  `;

  app.querySelectorAll('[data-page]').forEach(button => {
    button.addEventListener('click', () => navigate(button.dataset.page));
  });

  app.querySelector('#search').addEventListener('input', event => {
    const query = event.target.value.toLowerCase().trim();
    let visibleCount = 0;

    app.querySelectorAll('#products article').forEach(card => {
      const name = card.querySelector('h3').textContent.toLowerCase();
      const category = card.querySelector('p').textContent.toLowerCase();
      const visible = name.includes(query) || category.includes(query);

      card.classList.toggle('hidden', !visible);
      if (visible) visibleCount++;
    });

    app.querySelector('#no-results').classList.toggle('hidden', visibleCount !== 0);
  });

  app.querySelectorAll('[data-product]').forEach(button => {
    button.addEventListener('click', () => {
      const product = products.find(item => item.name === button.dataset.product);
      if (product) {
        alert(`${product.name}\nCategory: ${product.category}\nPrice: ${formatPrice(product.price)}`);
      }
    });
  });

  app.querySelectorAll('[data-add]').forEach(button => {
    button.addEventListener('click', () => addToCart(button.dataset.add));
  });
}

// SHOPPING CART PAGE
function showCart() {
  app.innerHTML = `
    <div class="min-h-screen bg-[#101010] px-5 py-10 text-white">
      <div class="mx-auto max-w-5xl">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <button data-page="home"
            class="rounded-full border border-white/20 px-5 py-3 text-sm font-bold hover:border-orange-500">
            ← Continue Shopping
          </button>
          <p class="text-xl font-black">SNEAKER<span class="text-orange-500">HUB.</span></p>
        </div>

        <h1 class="mt-10 text-4xl font-black sm:text-5xl">YOUR CART<span class="text-orange-500">.</span></h1>
        <p class="mt-3 text-gray-400">${cartCount()} item${cartCount() === 1 ? '' : 's'} in your cart</p>

        ${cart.length === 0 ? `
          <div class="mt-10 rounded-2xl border border-white/10 bg-[#191919] p-10 text-center">
            <p class="text-5xl">🛒</p>
            <h2 class="mt-5 text-2xl font-bold">Your cart is empty</h2>
            <p class="mt-2 text-gray-400">Find your next favourite pair in our collection.</p>
            <button data-page="home" class="mt-6 rounded-full bg-orange-500 px-6 py-3 font-bold text-black">
              Shop Sneakers
            </button>
          </div>
        ` : `
          <div class="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div class="space-y-4">
              ${cart.map(item => `
                <article class="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#191919] p-4 sm:flex-row sm:items-center">
                  <img src="${item.image}" alt="${item.name}" class="h-32 w-full rounded-xl object-cover sm:w-36" />
                  <div class="flex-1">
                    <p class="text-xs uppercase tracking-widest text-orange-500">${item.category}</p>
                    <h2 class="mt-2 text-xl font-black">${item.name}</h2>
                    <p class="mt-2 font-bold">${formatPrice(item.price)}</p>
                    <div class="mt-3 flex items-center gap-3">
                      <button data-quantity="-1" data-name="${item.name}" aria-label="Decrease quantity"
                        class="h-8 w-8 rounded-full border border-white/20 hover:border-orange-500">−</button>
                      <span>${item.quantity}</span>
                      <button data-quantity="1" data-name="${item.name}" aria-label="Increase quantity"
                        class="h-8 w-8 rounded-full border border-white/20 hover:border-orange-500">+</button>
                      <button data-remove="${item.name}" class="ml-3 text-sm text-red-400 hover:text-red-300">Remove</button>
                    </div>
                  </div>
                  <p class="text-lg font-black">${formatPrice(item.price * item.quantity)}</p>
                </article>
              `).join('')}
            </div>

            <aside class="h-fit rounded-2xl border border-white/10 bg-[#191919] p-6">
              <h2 class="text-xl font-black">ORDER SUMMARY</h2>
              <div class="mt-6 flex justify-between text-sm text-gray-300">
                <span>Subtotal</span><span>${formatPrice(cartTotal())}</span>
              </div>
              <div class="mt-3 flex justify-between text-sm text-gray-300">
                <span>Delivery</span><span class="text-green-400">Free</span>
              </div>
              <div class="my-5 border-t border-white/10"></div>
              <div class="flex justify-between text-lg font-black">
                <span>Total</span><span class="text-orange-500">${formatPrice(cartTotal())}</span>
              </div>
              <button id="checkout-button"
                class="mt-6 w-full rounded-full bg-orange-500 px-5 py-4 font-black uppercase tracking-wider text-black hover:bg-orange-400">
                Proceed to Checkout
              </button>
              <p class="mt-3 text-xs leading-5 text-gray-500">Demo checkout only. No payment will be collected.</p>
            </aside>
          </div>
        `}
      </div>
    </div>
  `;

  app.querySelectorAll('[data-page="home"]').forEach(button => {
    button.addEventListener('click', showHome);
  });

  app.querySelectorAll('[data-quantity]').forEach(button => {
    button.addEventListener('click', () => {
      changeQuantity(button.dataset.name, Number(button.dataset.quantity));
    });
  });

  app.querySelectorAll('[data-remove]').forEach(button => {
    button.addEventListener('click', () => removeFromCart(button.dataset.remove));
  });

  const checkoutButton = app.querySelector('#checkout-button');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
      alert('Checkout is a demo only. Online payment has not been connected.');
    });
  }
}

// LOGIN AND SIGNUP PAGE
function showAuth(mode) {
  const isRegister = mode === 'register';

  app.innerHTML = `
    <main class="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#101010] px-4 py-10 text-white">
      <div class="absolute -left-20 top-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl"></div>
      <div class="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl"></div>

      <div class="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#181818] shadow-2xl md:grid-cols-2">
        <section class="relative hidden min-h-[650px] flex-col justify-between overflow-hidden bg-[#242424] p-10 md:flex">
          <img src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=900" alt="Sneaker style"
            class="absolute inset-0 h-full w-full object-cover opacity-35" />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20"></div>

          <button data-page="home" class="relative w-fit text-2xl font-black">SNEAKER<span class="text-orange-500">HUB.</span></button>

          <div class="relative">
            <p class="text-xs font-bold uppercase tracking-[0.3em] text-orange-400">Your style. Your rules.</p>
            <h2 class="mt-5 text-5xl font-black leading-tight">MOVE<br />YOUR<br /><span class="text-orange-500">WAY.</span></h2>
            <p class="mt-5 max-w-xs text-sm leading-7 text-gray-300">Discover the pair that matches your energy. Make every step count.</p>
          </div>

          <p class="relative text-xs text-gray-400">SNEAKER CULTURE, REDEFINED.</p>
        </section>

        <section class="flex min-h-[650px] items-center justify-center px-6 py-10 sm:px-10">
          <div class="w-full max-w-md">
            <button data-page="home" class="mb-9 text-xl font-black md:hidden">SNEAKER<span class="text-orange-500">HUB.</span></button>
            <p class="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">${isRegister ? 'Become a member' : 'Member access'}</p>
            <h1 class="mt-4 text-4xl font-black tracking-tight">${isRegister ? 'CREATE ACCOUNT.' : 'WELCOME BACK.'}</h1>
            <p class="mt-4 text-sm leading-6 text-gray-400">
              ${isRegister ? 'Join SneakerHub and discover your next favourite pair.' : 'Sign in to continue your SneakerHub experience.'}
            </p>

            <form id="auth-form" class="mt-8 space-y-5">
              ${isRegister ? `
                <div>
                  <label for="name" class="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-300">Full name</label>
                  <input id="name" name="name" type="text" required autocomplete="name" placeholder="Your full name"
                    class="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-sm outline-none placeholder:text-gray-600 focus:border-orange-500" />
                </div>
              ` : ''}

              <div>
                <label for="email" class="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-300">Email address</label>
                <input id="email" name="email" type="email" required autocomplete="email" placeholder="you@example.com"
                  class="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-sm outline-none placeholder:text-gray-600 focus:border-orange-500" />
              </div>

              <div>
                <label for="password" class="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-300">Password</label>
                <input id="password" name="password" type="password" required minlength="6"
                  autocomplete="${isRegister ? 'new-password' : 'current-password'}" placeholder="At least 6 characters"
                  class="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-sm outline-none placeholder:text-gray-600 focus:border-orange-500" />
              </div>

              <button type="submit" class="flex w-full items-center justify-between rounded-xl bg-orange-500 px-5 py-4 text-sm font-black uppercase tracking-widest text-black transition hover:bg-orange-400">
                ${isRegister ? 'Create Account' : 'Sign In'} <span class="text-xl">→</span>
              </button>

              <p id="form-message" role="status" class="hidden rounded-xl border border-orange-500/20 bg-orange-500/10 p-4 text-sm leading-6 text-orange-200"></p>
            </form>

            <p class="mt-7 text-center text-sm text-gray-400">
              ${isRegister ? 'Already have an account?' : 'New to SneakerHub?'}
              <button id="switch-page" class="ml-1 font-bold text-orange-400 hover:text-orange-300">
                ${isRegister ? 'Login' : 'Register'}
              </button>
            </p>

            <button data-page="home" class="mt-7 w-full text-center text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white">← Back to Home</button>
          </div>
        </section>
      </div>
    </main>
  `;

  app.querySelectorAll('[data-page="home"]').forEach(button => {
    button.addEventListener('click', showHome);
  });

  app.querySelector('#switch-page').addEventListener('click', () => {
    navigate(isRegister ? 'login' : 'register');
  });

  app.querySelector('#auth-form').addEventListener('submit', event => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = String(data.get('email'));
    const message = app.querySelector('#form-message');

    message.textContent = isRegister
      ? `Registration form completed for ${email}. This demo does not create a real account.`
      : `Login form submitted for ${email}. Real account verification requires a backend.`;

    message.classList.remove('hidden');
  });
}

// PAGE NAVIGATION
function navigate(page) {
  if (page === 'login' || page === 'register') {
    showAuth(page);
  } else if (page === 'cart') {
    showCart();
  } else {
    showHome();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// START WEBSITE
showHome();
