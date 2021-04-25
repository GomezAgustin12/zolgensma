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
        console.log(e);
        $(`.objeto${i + 1}`).css({
          "background-image": `url(${e})`,
          "background-repeat": "no-repeat",
          "background-position": "center",
          "background-size": "contain",
        });
      });

      var displayNoneList = localStorage.getItem("displayNoneList").split(", ");

      displayNoneList.forEach((e) => {
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
    existe: ({ imagen }) => carteraArray.includes(imagen),
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
