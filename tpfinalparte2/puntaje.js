class Puntaje {
  constructor(valoresPelo, valoresMaq, valoresVestido) {
    this.valoresPelo = valoresPelo;
    this.valoresMaq = valoresMaq;
    this.valoresVestido = valoresVestido;
    
  }

  calcular(peloSel, maqSel, vestidoSel) {
    let valores = [
      this.valoresPelo[peloSel],
      this.valoresMaq[maqSel],
      this.valoresVestido[vestidoSel]
    ];

    let total = 0;

    for (let i = 0; i < valores.length; i++) {
      total += valores[i];
    }

    return total;
  }
}
