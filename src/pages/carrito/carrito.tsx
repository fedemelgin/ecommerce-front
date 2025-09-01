
import { useCartContext } from "../../hooks/useCartContext";
import { useMP } from "../../hooks/useMP";
import CardShop from "../../components/cardShop/cardShop";
import { useState } from "react";

const Carrito = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string| null>(null);
  const { cartItems,removeFromCart, addToCart, updateQuantityCart } = useCartContext();
  let sum = 0;
  cartItems.forEach(item => {
    sum += item.price * item.quantity;
  });
  const TOTAL = sum.toFixed(2);

  return (
    <section className=" min-h-screen py-8 antialiased  md:py-16 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Productos Seleccionados</h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6 ">

              {/* // CARD */}
              {cartItems.map((item) => (
                <CardShop key={item.id} product={item} removeFromCart={removeFromCart} updateQuantityCart={updateQuantityCart} />
              ))}

            </div>
          </div>

          {/* ORDEN */}
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 ">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">ORDEN</p>

              <div className="space-y-4">
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <dl key={item.id} className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">{item.title}</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">${item.price}</dd>
                  </dl>
                  ))}

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Ahorro</dt>
                    <dd className="text-base font-medium text-green-600">-</dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">${TOTAL}</dd>
                </dl>
              </div>

              <button
                className="cursor-pointer border bg-white text-black self-center rounded-lg bg-primary-700 p-3 w-max text-sm font-medium "
                disabled={loading}
                onClick={async (e) => {
                  e.preventDefault();
                  setError(null);
                  setLoading(true);
                  try {
                    const data = await useMP(cartItems);
                    if (data?.init_point) {

                      window.location.href = data.init_point;

                    } else {
                      setError('No se recibió URL de pago.');
                    }
                  } catch (err) {
                    console.error(err);
                    setError('Error al crear el pago. Intenta de nuevo.');
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                Proceder al pago
              </button>
              {error && <div className="text-red-500">{error}</div>}

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> o </span>
                <a href="#" title="" className="inline-flex items-center gap-2 text-sm font-medium text-white no-underline hover:underline">
                  Continuar comprando
                  <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <form className="space-y-4">
                <div className="flex  p-1 items-center justify-content gap-2 flex-col "> 
                  <label htmlFor="voucher" className="text-sm font-medium dark:text-white">
                    ¿Tienes un código de descuento?
                  </label>
                  <input type="text" id="voucher" className="block w-max rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
                  <div>
                    <button type="submit" className=" relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 cursor-pointer dark:focus:ring-cyan-800">
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                        Aplicar
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carrito;