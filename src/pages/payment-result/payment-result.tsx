
const PaymentResult: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const status = params.get('status') || 'unknown';

  const message =
    status === 'success'
      ? 'Pago aprobado. ¡Gracias! Serás redirigido o puedes volver al inicio.'
      : status === 'failure'
      ? 'El pago fue rechazado. Intenta con otro medio.'
      : status === 'pending'
      ? 'Pago pendiente. Verifica más tarde.'
      : `Estado: ${status}`;

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Resultado del pago</h1>
      <p className="mb-4">{message}</p>
      <a href="/" className="text-blue-600 underline">Volver al inicio</a>
    </main>
  );
};

export default PaymentResult;
