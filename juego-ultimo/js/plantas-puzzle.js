$(document).ready(function () {
  var box = $(".box");
  var mainCanvas = $(".main-canvas");

  box.draggable({
    containment: mainCanvas,
    helper: "clone",

    start: function () {
      $(this).css({
        opacity: 0,
      });

      $(".box").css("z-index", "0");
    },

    stop: function () {
      $(this).css({
        opacity: 1,
      });
    },
  });

  box.droppable({
    accept: box,

    drop: function (event, ui) {
      var draggable = ui.draggable;
      var droppable = $(this);
      var dragPos = draggable.position();
      var dropPos = droppable.position();

      draggable.css({
        left: dropPos.left + "px",
        top: dropPos.top + "px",
        "z-index": 20,
      });

      droppable.css("z-index", 10).animate({
        left: dragPos.left,
        top: dragPos.top,
      });

      let plantasArray = [];

      setTimeout(function () {
        $(".box").each(function () {
          let id = $(this).attr("id");
          if (id) {
            let obj = {
              nombre: id,
              left: $(this).css("left"),
              top: $(this).css("top"),
            };
            plantasArray.push(obj);
          }
        });

        const [solPosicion1, solPosicion2, solPosicion3, solPosicion4] = [
          "maceta2-puzzle",
          "maceta1-puzzle",
          "maceta3-puzzle",
          "maceta4-puzzle",
        ];

        let ordenado = plantasArray.sort((a, b) => {
          if (a.top < b.top) return -1;
          if (a.top > b.top) return 1;
          else {
            if (a.left < b.left) return -1;
            if (a.left > b.left) return 1;
          }
          return 0;
        });
        const [planta1, planta2, planta3, planta4] = ordenado.map(
          (e) => e.nombre
        );

        verificarPuzzlePlantas = () => {
          if (solPosicion1 !== planta1) return;
          if (solPosicion2 !== planta2) return;
          if (solPosicion3 !== planta3) return;
          if (solPosicion4 !== planta4) return;
          puzzle.style.display = "none";
          fondo.style.filter = "none";
          cartera.agregar(LLAVE);
        };

        verificarPuzzlePlantas();
      }, 500);
    },
  });
});
