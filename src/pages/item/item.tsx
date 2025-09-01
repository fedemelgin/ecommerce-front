import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import type { Product } from "../../types/Product";
import { useQuantityControl } from "../../hooks/useQuantityControl";
import type { CartItem } from "../../context/cartContext";
import { useCartContext } from "../../hooks/useCartContext";


function generarTituloProducto(title: string): string {
  return title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").trim();
}

function getItem(prod: Product, slug: string): boolean {
  const tituloProducto = generarTituloProducto(prod.title);
  const tituloURLSLUG = decodeURIComponent(slug).toLowerCase();
  return (
    tituloProducto ===
    tituloURLSLUG.replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").trim()
  );
}

function formatCurrency(value: number, locale = "es-AR", currency = "USD") {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
}

export default function Item() {

  const { slug } = useParams<{ slug: string }>();
  
  const mainImage =
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080";

  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const { addToCart } = useCartContext();

   const handleAdd = () => {
    const item: CartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      images: product.images ?? [mainImage],
      category: product.category ?? "general",
      sku: product.sku ?? "",
      stock: product.stock ?? 0,
      quantity: currentQuantity, // ← usa la cantidad local
    };
    addToCart(item);
  };

  const { products, loading, error } = useProducts() as {
    products: Product[];
    loading: boolean;
    error: string | null;
  };

  const product = useMemo<Product | undefined>(() => {
    if (!slug) return undefined;
    return products.find((p) => getItem(p, slug));
  }, [products, slug]);

  const cartItem = useMemo<CartItem>(() => {
    const base = {
      id: (product?.id ?? "temp") as any,
      title: product?.title ?? "",
      price: product?.price ?? 0,
      quantity: 1,
      image: product?.images?.[0] ?? mainImage,
      images: product?.images ?? [mainImage],
      stock: (product as any)?.stock ?? 0,
      sku: product?.sku ?? "",
      category: (product as any)?.category ?? "general",
    };
    return base as unknown as CartItem;
  }, [product]);

  const {
    currentQuantity,
    handleDecrease,
    handleIncrease,
    isAtMaxStock,
    isAtMinQuantity,
  } = useQuantityControl(cartItem);

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-64">
            <div className="text-lg">🛍️ Cargando producto...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <p>Error al cargar productos: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">No hay productos disponibles</h1>
            <p>Intenta recargar la página</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
            <p>El producto "{slug}" no existe</p>
            <p className="text-sm text-gray-600 mt-2">
              Hay {products.length} productos disponibles
            </p>
            <button 
              onClick={() => window.history.back()}
              className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
            >
              Volver atrás
            </button>
          </div>
        </div>
      </div>
    );
  }
  const images = (product.images && product.images.length > 0) ? product.images : [mainImage];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
          <ol className="list-reset flex items-center gap-2">
            <li>
              <a href="/" className="hover:text-gray-700">Inicio</a>
            </li>
            <li className="select-none">/</li>
            <li>
              <a href="/products" className="hover:text-gray-700">Productos</a>
            </li>
            <li className="select-none">/</li>
            <li className="text-gray-700 font-medium truncate max-w-[60vw]" title={product.title}>
              {product.title}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Galería */}
          <section>
            <div className="aspect-square bg-white rounded-lg shadow-sm p-2 flex items-center justify-center">
              <img
                src={images[selectedIdx]}
                alt={product.title}
                className="max-h-[520px] w-auto object-contain rounded-md"
              />
            </div>

            {images.length > 1 && (
              <div className="mt-3 grid grid-cols-5 sm:grid-cols-6 md:grid-cols-5 gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedIdx(i)}
                    className={`aspect-square bg-white rounded-md border p-1 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${i === selectedIdx ? "border-indigo-500 ring-2 ring-indigo-200" : "border-gray-200"}`}
                    aria-label={`Imagen ${i + 1}`}
                  >
                    <img src={img} alt={`${product.title} ${i + 1}`} className="w-full h-full object-contain rounded" />
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Detalles */}
          <section className="space-y-5">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
              <p className="text-sm text-gray-500 mt-1">SKU: {product.sku}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-50 text-green-700 px-2 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Envío gratis
                </span>
                <span className="inline-flex items-center text-xs text-gray-500">
                  Entrega 24-48h
                </span>
              </div>
            </div>

            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-gray-900">
                {formatCurrency(product.price)}
              </span>
              {/* Si manejas descuentos, puedes mostrar antes/después aquí */}
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>


            {/* Acciones */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAdd}
                className="cursor-pointer bg-indigo-600 flex gap-2 items-center text-white px-6 py-2.5 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                Agregar al carrito
              </button>

              <button
                className="cursor-pointer bg-white text-indigo-600 border border-indigo-200 px-6 py-2.5 rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Comprar ahora
              </button>
            </div>

            {/* Info adicional */}
            <div className="space-y-3 pt-2">
              <details className="group bg-white rounded-md border border-gray-200">
                <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">Detalles del producto</span>
                  <svg className="size-5 text-gray-500 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 text-gray-600">
                  {product.description}
                </div>
              </details>

              <details className="group bg-white rounded-md border border-gray-200">
                <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">Envío y devoluciones</span>
                  <svg className="size-5 text-gray-500 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 text-gray-600 space-y-1">
                  <p>• Envío gratis en pedidos seleccionados.</p>
                  <p>• Devoluciones sin costo dentro de 30 días.</p>
                </div>
              </details>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}