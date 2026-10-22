
import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
  const { items, removeItem } = useCart();

  const cartCount = items.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0
  );

  const subtotal = items.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString("en-IN")}`;

  // Update quantity in the shared storefront cart
  const changeQuantity = (item, amount) => {
    try {
      const savedItems = JSON.parse(
        localStorage.getItem("sneakerCart") || "[]"
      );

      const updatedItems = savedItems
        .map((product) => {
          if (product.name !== item.name) return product;

          return {
            ...product,
            quantity: Math.max(
              0,
              Number(product.quantity || 1) + amount
            ),
          };
        })
        .filter((product) => product.quantity > 0);

      localStorage.setItem(
        "sneakerCart",
        JSON.stringify(updatedItems)
      );

      // Notify React and the original storefront
      window.dispatchEvent(new Event("sneakerCartUpdated"));
    } catch (error) {
      console.error("Unable to update cart quantity:", error);
    }
  };

  return (
    <section className="w-full rounded-2xl border border-orange-500/30 bg-black p-5 text-white md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-orange-400">
          Shopping Bag
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          {cartCount} item{cartCount !== 1 ? "s" : ""} in your bag
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-white/10 px-4 py-12 text-center">
          <h3 className="text-xl font-semibold">
            Your bag is empty
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            Add sneakers from the SneakerHub storefront.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Cart Products */}
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id ?? item.name}
                className="flex flex-col gap-4 rounded-xl border border-white/10 p-4 sm:flex-row sm:items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-32 w-full rounded-lg object-cover sm:w-32"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    {item.category}
                  </p>

                  <p className="mt-2 font-bold text-orange-400">
                    {formatPrice(item.price)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <div className="flex items-center overflow-hidden rounded-lg border border-white/20">
                      <button
                        type="button"
                        onClick={() => changeQuantity(item, -1)}
                        className="px-3 py-1 text-xl text-orange-400 hover:bg-white/10"
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        −
                      </button>

                      <span className="min-w-9 text-center">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => changeQuantity(item, 1)}
                        className="px-3 py-1 text-xl text-orange-400 hover:bg-white/10"
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Product */}
                    <button
                      type="button"
                      onClick={() =>
                        removeItem(item.id ?? item.name)
                      }
                      className="text-sm text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <p className="font-bold sm:text-right">
                  {formatPrice(
                    Number(item.price || 0) *
                      Number(item.quantity || 1)
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <aside className="h-fit rounded-xl border border-orange-500/30 p-5">
            <h3 className="mb-5 text-lg font-bold">
              Order Summary
            </h3>

            <div className="flex justify-between gap-3 text-sm text-gray-300">
              <span>Items</span>
              <span>{cartCount}</span>
            </div>

            <div className="mt-4 flex justify-between gap-3 text-sm text-gray-300">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="mt-3 flex justify-between gap-3 text-sm text-gray-300">
              <span>Delivery</span>
              <span className="text-orange-400">FREE</span>
            </div>

            <div className="my-5 border-t border-white/10" />

            <div className="flex justify-between gap-3 text-lg font-bold">
              <span>Total</span>
              <span className="text-orange-400">
                {formatPrice(subtotal)}
              </span>
            </div>

            {/* Checkout stays on the dedicated Cart page */}
          </aside>
        </div>
      )}
    </section>
  );
}
