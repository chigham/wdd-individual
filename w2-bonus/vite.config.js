import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        checkedout: resolve(__dirname, "src/checkout/success.html"),
        product_pages: resolve(__dirname, "src/product_pages/index.html"),
        product_listing: resolve(__dirname, "src/product_listing/index.html")
        /*main: resolve(__dirname, "src/js/main.js"),
        cart: resolve(__dirname, "src/js/cart.js"),
        checkout: resolve(__dirname, "src/js/checkout.js"),
        product_pages: resolve(__dirname, "src/js/product.js"),
        product_listing: resolve(__dirname, "src/js/product-listing.js")*/
      },
    },
  },
});
