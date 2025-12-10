class Juego {
  constructor() {
    this.estado = 0;
    this.princesa = new Princesa(200, 80);
    this.rostro = new Rostro(this.princesa);
    this.ropa = new Ropa(200, 80);

    // ⭐ PUNTAJE LISTO, YA CORRECTO
    this.puntaje = new Puntaje(
      [0, 2, 4, 5],   // valores del pelo
      [0, 1, 2, 3],   // valores del maquillaje
      [0, 3, 2, 4, 5] // valores del vestido
    );
  }

  mostrar() {
    if (this.estado == 0) {
      this.pantallaInicio();

    } else if (this.estado == 1) {
      this.rostro.mostrarMaquillaje();

    } else if (this.estado == 2) {
      this.rostro.mostrarPeinado();
      this.botonVolver();

    } else if (this.estado == 3) {
      this.mostrarRopa();
      this.botonVolver();
      this.botonFinalizar();

    } else if (this.estado == 4) {
      image(ganaste, 0, 0, width, height);
      this.botonReiniciar();
      this.botonCreditos();

    } else if (this.estado == 5) {
      image(perdiste, 0, 0, width, height);
      this.botonReiniciar();
      this.botonCreditos();

    } else if (this.estado == 6) {
      image(creditos, 0, 0, width, height);
      this.botonVolverFinal();
    }
  }

  reiniciarJuego() {
    this.estado = 0;
    this.rostro.maqSeleccionado = 0;
    this.rostro.peloSeleccionado = 0;
    this.ropa.vestidoSeleccionado = 0;
  }

  botonCreditos() {
    fill(255, 200);
    rect(width/2 - 100, height - 200, 200, 50, 20);
    fill(0);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Créditos", width/2, height - 175);
  }

  botonVolverFinal() {
    fill(255, 200);
    rect(width/2 - 120, height - 120, 240, 60, 20);
    fill(0);
    textSize(26);
    textAlign(CENTER, CENTER);
    text("Volver", width/2, height - 90);
  }

  botonReiniciar() {
    fill(255, 200);
    rect(width/2 - 120, height - 120, 240, 60, 20);
    fill(0);
    textSize(26);
    textAlign(CENTER, CENTER);
    text("Volver a jugar", width/2, height - 90);
  }

  botonVolver() {
    fill(255, 180);
    rect(20, 20, 120, 40, 10);
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Volver", 80, 40);
  }

  botonFinalizar() {
    fill(255, 200);
    rect(160, 20, 140, 40, 10);
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Finalizar", 230, 40);
  }

  pantallaInicio() {
    textAlign(CENTER);
    textSize(28);
    fill(255);

    text(
      "Elige cuidadosamente la ropa que se pondrá\n la princesa para enamorar al sastresillo valiente.",
      width / 2, height / 2 - 100
    );

    text("\n Si a este no le gusta, pierdes.", width / 2, height / 2 - 60);

    fill(255, 150, 200);
    rect(width / 2 - 100, height / 2, 200, 60, 20);
    fill(255);
    textSize(28);
    text("Comenzar", width / 2, height / 2 + 40);
  }

  mostrarRopa() {
    this.princesa.mostrar();
    this.rostro.mostrarSeleccion();
    this.ropa.mostrar();
    this.ropa.mostrarOpciones();
  }

  mousePresionado() {

    if (mouseX > 20 && mouseX < 140 && mouseY > 20 && mouseY < 60) {
      if (this.estado == 2) {
        this.estado = 1;
        return;
      }
      if (this.estado == 3) {
        this.estado = 2;
        return;
      }
    }

    // inicio
    if (this.estado == 0) {
      if (
        mouseX > width / 2 - 100 &&
        mouseX < width / 2 + 100 &&
        mouseY > height / 2 &&
        mouseY < height / 2 + 60
      ) {
        this.estado = 1;
      }
      return;
    }

    // maquillaje
    if (this.estado == 1) {
      let opcion = this.rostro.detectarClickMaquillaje();
      if (opcion > 0) {
        this.rostro.maqSeleccionado = opcion;
        sonidoClick.play();
        this.estado = 2;
      }
      return;
    }

    // pelo
    if (this.estado == 2) {
      let opcion = this.rostro.detectarClickPeinado();
      if (opcion > 0) {
        this.rostro.peloSeleccionado = opcion;
        sonidoClick.play();
        this.estado = 3;
      }
      return;
    }

    // ropa
    if (this.estado == 3) {

      if (
        mouseX > 160 &&
        mouseX < 300 &&
        mouseY > 20 &&
        mouseY < 60
      ) {
        let puntaje = this.calcularPuntaje();

        if (puntaje >= 7) {
          sonidoGanaste.play();
          this.estado = 4;
        } else {
          sonidoPerdiste.play();
          this.estado = 5;
        }
        return;
      }

      let antes = this.ropa.vestidoSeleccionado;
      this.ropa.seleccionar();
      if (this.ropa.vestidoSeleccionado != antes) {
        sonidoClick.play();
      }
      return;
    }

    // final
    if (this.estado == 4 || this.estado == 5) {

      if (
        mouseX > width/2 - 120 &&
        mouseX < width/2 + 120 &&
        mouseY > height - 120 &&
        mouseY < height - 60
      ) {
        sonidoVolver.play();
        this.reiniciarJuego();
      }

      if (
        mouseX > width/2 - 100 &&
        mouseX < width/2 + 100 &&
        mouseY > height - 200 &&
        mouseY < height - 150
      ) {
        sonidoClick.play();
        this.estado = 6;
      }

      return;
    }

    // créditos
    if (this.estado == 6) {
      if (
        mouseX > width/2 - 120 &&
        mouseX < width/2 + 120 &&
        mouseY > height - 120 &&
        mouseY < height - 60
      ) {
        sonidoVolver.play();
        this.reiniciarJuego();
      }
      return;
    }
  }

  calcularPuntaje() {
    return this.puntaje.calcular(
      this.rostro.peloSeleccionado,
      this.rostro.maqSeleccionado,
      this.ropa.vestidoSeleccionado
    );
  }
}
