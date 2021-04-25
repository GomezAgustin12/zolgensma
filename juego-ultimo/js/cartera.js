$(document).ready(function () {
  if (localStorage.getItem("cartera") === null) {
    var carteraArray = [];
  } else {
    var carteraArray = localStorage.getItem("cartera").split(", ");
  }

  cartera = {
    actualizar: () => {
      ["", "", "", "", "", "", "", "", "", "", "", "", "", ""].forEach(
        (e, i) => {
          $(`.objeto${i + 1}`).css({
            "background-image": `url(${e})`,
          });
        }
      );

      carteraArray.forEach((e, i) => {
        $(`.objeto${i + 1}`).css({
          "background-image": `url(${e})`,
          "background-repeat": "no-repeat",
          "background-position": "center",
          "background-size": "contain",
        });
      });
    },
    get: () => {
      if (localStorage.getItem("cartera") === null) {
        return [];
      } else {
        return localStorage.getItem("cartera").split(", ");
      }
    },
    getOne: (elemento) => {
      carteraArray.find((e) => e === elemento);
    },
    existe: (elemento) => carteraArray.includes(elemento),
    agregar: (elemento) => {
      if (cartera.existe(elemento)) return;
      if (localStorage.getItem("cartera") === null) {
        localStorage.setItem("cartera", elemento);
      } else {
        localStorage.setItem(
          "cartera",
          localStorage.getItem("cartera") + ", " + elemento
        );
      }
      //AGREGAR DISPLAY: NONE AL ELEMENTO ELIMINADO
      carteraArray = localStorage.getItem("cartera").split(", ") || [];
      cartera.actualizar();
    },
    quitar: (elemento) => {
      if (localStorage.getItem("cartera") === null) {
        console.log("LOCAL STORAGE EMPTY");
        return;
      } else {
        carteraArray = carteraArray.filter((e) => e !== elemento);
        if (carteraArray.length === 0) {
          localStorage.removeItem("cartera");
        } else {
          localStorage.setItem("cartera", carteraArray.join(", "));
        }

        cartera.actualizar();
      }
    },
  };
  cartera.actualizar();
});
