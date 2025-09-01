import { Link } from "react-router-dom";
import { useCartContext } from "../../hooks/useCartContext";
import type { Product } from "../../types/Product";
import type { CartItem } from "../../context/cartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCartContext();

  const imgSrc = product.thumbnail ?? product.images?.[0] ?? "/placeholder-image.jpg";
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/placeholder-image.jpg";
  };

  const handleAdd = () => {
    const item: CartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      images: product.images,
      category: product.category,
      sku: product.sku,
      stock: product.stock,
      quantity: 1,
    };
    addToCart(item);
  };

  return (
    <div className="rounded-lg border shadow-sm overflow-hidden bg-white border-slate-200 shadow-slate-950/5 w-96">
      <img
        src={imgSrc}
        alt={product.title || "card-image"}
        className="w-[calc(100%-16px)] rounded m-2 h-96 object-cover"
        onError={handleImgError}
      />

      <Link to={`/products/${encodeURIComponent(product.title)}`}>
        <div className="w-full flex flex-col gap-1 h-46 rounded p-4">
          <h6 className="font-roboto antialiased font-semibold text-base md:text-lg lg:text-xl text-current">
            {product.title}
          </h6>
          <h6 className="font-roboto antialiased text-base md:text-lg lg:text-xl text-current">
            ${product.price}
          </h6>
          <p className="h-max font-roboto-condensed antialiased text-base text-slate-600">
            {product.description}
          </p>
        </div>
      </Link>

      <div className="w-full p-4 rounded">
        <button
          type="button"
          className="cursor-pointer inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-200 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-slate-200 border-slate-200 text-slate-800 hover:bg-slate-100"
          data-shape="default"
          data-width="full"
          onClick={handleAdd}
          title="Agregar al carrito"
          aria-label="Agregar al carrito"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}