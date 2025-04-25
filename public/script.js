const form = document.getElementById('formulario');
    const resultado = document.getElementById('resultado');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const from = document.getElementById('from').value;
      const to = document.getElementById('to').value;
      const amount = document.getElementById('amount').value;

      try {
        const res = await fetch(`/convert?from=${from}&to=${to}&amount=${amount}`);
        const data = await res.json();

        if (data.result) {
          resultado.innerText = `${data.amount} ${data.from} = ${data.result.toFixed(2)} ${data.to}\n(Tasa: ${data.rate.toFixed(4)})`;
        } else if (data.error) {
          resultado.innerText = `Error: ${data.error}`;
        }
      } catch (err) {
        resultado.innerText = `Error: ${err.message}`;
      }
    });