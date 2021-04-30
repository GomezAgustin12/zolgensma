const onScreenChange = (newScreen) => {
  window.location = newScreen;
  localStorage.setItem("min", min);
  localStorage.setItem("contador", contador);
};

$(document).ready(function () {
  //ESTE SCRIPT MANEJA EL CAMBIO DE PANTALLAS Y EL CONTADOR PARA EL RANKING
  let segs = 0;
  let contador = localStorage.getItem("contador") ?? 0;
  let min = localStorage.getItem("min") ?? 0;
  setInterval(() => {
    contador++;
    segs = contador % 60;
    if (+contador % 60 === 0) {
      min++;
    }
    $(".timer").html(`TIME ${min}:${segs}`);
  }, 1000);

  //-------------------------------------------------------------------------

  if (localStorage.getItem("cartera") === null) {
    var carteraArray = [];
  } else {
    if (localStorage.getItem("cartera")) {
      if (!localStorage.getItem("cartera").includes(",")) {
        var carteraArray = [localStorage.getItem("cartera")];

        console.log(carteraArray);
      } else {
        var carteraArray = localStorage.getItem("cartera").split(", ");
      }
    }
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
      var displayNoneList = [];
      if (localStorage.getItem("displayNoneList")) {
        if (!localStorage.getItem("displayNoneList").includes(",")) {
          var displayNoneList = [localStorage.getItem("displayNoneList")];
        } else {
          var displayNoneList = localStorage
            .getItem("displayNoneList")
            .split(", ");
        }
      }

      displayNoneList.forEach((e) => {
        console.log(e);
        $(`#${e}`).css({ display: "none" });
      });
    },
    get: () => {
      if (localStorage.getItem("cartera") === null) {
        return [];
      } else {
        return localStorage.getItem("cartera").split(", ");
      }
    },
    getOne: ({ imagen }) => {
      carteraArray.find((e) => {
        console.log(e, imagen);
        return e === imagen;
      });
    },
    existe: (imagen) => {
      return carteraArray.includes(imagen);
    },
    agregar: ({ imagen, id = null }) => {
      if (cartera.existe(imagen)) return;
      if (localStorage.getItem("cartera") === null) {
        localStorage.setItem("cartera", imagen);
        if (id !== null) {
          localStorage.setItem("displayNoneList", id);
        }
      } else {
        localStorage.setItem(
          "cartera",
          localStorage.getItem("cartera") + ", " + imagen
        );
        if (id !== null) {
          localStorage.setItem(
            "displayNoneList",
            localStorage.getItem("displayNoneList") + ", " + id
          );
        }
      }
      carteraArray = localStorage.getItem("cartera").split(", ") || [];
      cartera.actualizar();
    },
    quitar: ({ imagen }) => {
      if (localStorage.getItem("cartera") === null) {
        console.log("LOCAL STORAGE EMPTY");
        return;
      } else {
        carteraArray = carteraArray.filter((e) => e !== imagen);
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
