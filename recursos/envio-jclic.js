/* =====================================================================
   envio-jclic.js — «📤 Enviar mi tarea a mi docente» para los paquetes JClic
   QueSepanTodos.com · © 2026 Gustavo Aguilar · CC BY-NC-ND 4.0

   Usa el mismo módulo compartido (recursos/enviar-tarea.js): mismo formulario,
   misma tarjeta y mismo envío que el resto de los paquetes.
   Agrega un botón flotante y, al tocarlo, toma los resultados del registro
   del reproductor JClic (actividades resueltas y no resueltas, % de precisión).

   Uso en el index.html del paquete JClic (después del div .JClic):
     <script src="../../recursos/enviar-tarea.js"></script>
     <script src="../../recursos/envio-jclic.js" data-titulo="Verbos" data-grado="Lengua · Segundo ciclo"></script>

   ES5 a propósito (tablets y netbooks viejas).
   ===================================================================== */
(function () {
  'use strict';
  var s = document.currentScript || (function () { var a = document.getElementsByTagName('script'); return a[a.length - 1]; })();
  var TITULO = (s && s.getAttribute('data-titulo')) || document.title || 'Actividad interactiva';
  var GRADO = (s && s.getAttribute('data-grado')) || '';
  /* un intento por cada vez que se abre el paquete */
  var INTENTO = 1;
  try { var k = 'qst_intento_jclic_' + TITULO; INTENTO = (parseInt(sessionStorage.getItem(k), 10) || 0) + 1; sessionStorage.setItem(k, INTENTO); } catch (e) {}

  function resultados() {
    var r = { aciertos: 0, errores: 0, puntos: 0 };
    try {
      var p = window.JClicObject && JClicObject.currentPlayers && JClicObject.currentPlayers[0];
      var inf = p && p.reporter && p.reporter.getInfo();
      if (inf) {
        var hechas = inf.nActivities || 0, bien = inf.nActSolved || 0;
        r.aciertos = bien;                         /* actividades resueltas */
        r.errores = Math.max(hechas - bien, 0);    /* actividades terminadas sin resolver */
        r.puntos = inf.nActScore > 0 ? Math.round(inf.tScore) : 0;   /* precisión promedio (%) */
      }
    } catch (e) {}
    return r;
  }

  function poner() {
    if (!window.QSTEnvio || document.getElementById('qstJclicBtn')) return;
    var st = document.createElement('style');
    st.textContent = '#qstJclicBtn{position:fixed;right:8px;top:8px;z-index:2147483000;margin:0;padding:9px 14px;font-size:15px;opacity:.95}';
    document.head.appendChild(st);
    var b = QSTEnvio.boton({ titulo: TITULO, grado: GRADO, intento: INTENTO });
    b.id = 'qstJclicBtn';
    b.textContent = '📤 Enviar mi tarea';
    b.onclick = function (e) {
      if (e && e.stopPropagation) e.stopPropagation();
      var r = resultados();
      /* botón nuevo con los resultados de este momento, y se abre el formulario */
      var tmp = QSTEnvio.boton({ titulo: TITULO, grado: GRADO, intento: INTENTO, aciertos: r.aciertos, errores: r.errores, puntos: r.puntos });
      tmp.click();
    };
    document.body.appendChild(b);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', poner); else poner();
})();
