/* licencia.js — Aviso de autoría y licencia · QueSepanTodos.com
   © 2026 Gustavo Aguilar · Licencia Creative Commons Atribución-NoComercial-SinDerivadas 4.0 Internacional (CC BY-NC-ND 4.0)
   Sirve para cualquier página del sitio: en los paquetes se ubica al pie de la portada y del cierre;
   en otras páginas aparece como una línea fija al pie. Uso: <script src="licencia.js"></script> al final del <body>. */
(function () {
  "use strict";
  var ANIO = "2026", AUTOR = "Gustavo Aguilar", MAIL = "profegustaaguilar@gmail.com",
      URL_CC = "https://creativecommons.org/licenses/by-nc-nd/4.0/deed.es";

  var css =
    ".qst-lic{font:600 12px/1.35 Nunito,system-ui,sans-serif;color:#5b6776;text-align:center;margin:6px 0 0}" +
    ".qst-lic a{color:#0d5fa3;text-decoration:underline;cursor:pointer}" +
    ".qst-lic.fija{position:fixed;left:0;right:0;bottom:0;margin:0;padding:4px 8px;background:rgba(255,255,255,.92);z-index:60}" +
    "#qst-lic-modal{position:fixed;inset:0;background:rgba(10,30,50,.6);display:none;align-items:center;justify-content:center;z-index:100;padding:16px}" +
    "#qst-lic-modal .caja{background:#fff;border-radius:18px;max-width:560px;width:100%;max-height:90vh;overflow:auto;padding:18px 20px;font:15px/1.45 Nunito,system-ui,sans-serif;color:#1d2733}" +
    "#qst-lic-modal h3{margin:0 0 6px;color:#0d5fa3;font-size:19px}" +
    "#qst-lic-modal h4{margin:12px 0 4px;font-size:15px}" +
    "#qst-lic-modal ul{margin:0;padding-left:20px}" +
    "#qst-lic-modal .nota{font-size:13px;color:#5b6776;margin-top:10px}" +
    "#qst-lic-modal button{margin-top:12px;background:#1e88d6;color:#fff;border:0;border-radius:12px;padding:8px 18px;font:800 15px Nunito,sans-serif;cursor:pointer}";

  function linea(extra) {
    var p = document.createElement("p");
    p.className = "qst-lic" + (extra || "");
    p.innerHTML = "© " + ANIO + " " + AUTOR + " · QueSepanTodos.com · " +
      '<a data-qst-lic>Licencia CC BY-NC-ND 4.0</a> · Uso libre en escuelas, sin fines comerciales';
    return p;
  }
  function modal() {
    var m = document.createElement("div");
    m.id = "qst-lic-modal";
    m.innerHTML =
      '<div class="caja" role="dialog" aria-label="Licencia">' +
      "<h3>© " + ANIO + " " + AUTOR + " · QueSepanTodos.com</h3>" +
      "Este material está bajo una licencia <b>Creative Commons Atribución-NoComercial-SinDerivadas 4.0 Internacional</b> (CC BY-NC-ND 4.0)." +
      "<h4>✅ Podés</h4><ul>" +
      "<li>Usarlo libremente en escuelas, en el aula y en casa.</li>" +
      "<li>Compartir el enlace o los archivos <b>sin cambios</b>, mencionando al autor.</li></ul>" +
      "<h4>🚫 No podés</h4><ul>" +
      "<li>Venderlo ni usarlo con fines comerciales.</li>" +
      "<li>Modificarlo y distribuir versiones cambiadas.</li>" +
      "<li>Quitar o cambiar la autoría.</li></ul>" +
      '<p class="nota">Los textos, fichas, audios de lectura y la lista de control provienen del Programa Provincial de Fluidez Lectora y del ' +
      "Plan de Lectura y Escritura Mendoza (PLEM) de la Dirección General de Escuelas de Mendoza, y de los autores citados en cada texto; " +
      "pertenecen a sus titulares y se usan con fines educativos. Esta licencia no los cubre.<br>" +
      "Para otros usos o permisos: " + MAIL + '<br><a href="' + URL_CC + '" target="_blank" rel="license noopener">Texto completo de la licencia</a></p>' +
      "<button type=\"button\">Cerrar</button></div>";
    m.addEventListener("click", function (e) { if (e.target === m || e.target.tagName === "BUTTON") m.style.display = "none"; });
    return m;
  }
  function iniciar() {
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    if (!document.querySelector('link[rel="license"]')) {
      var l = document.createElement("link"); l.rel = "license"; l.href = URL_CC; document.head.appendChild(l);
    }
    document.body.appendChild(modal());
    // paquetes: al pie de la portada, del cierre y del resultado; otras páginas: línea fija al pie
    var destinos = ["#portada .hoja", "#cierre .hoja", "#logro .hoja"].map(function (s) { return document.querySelector(s); }).filter(Boolean);
    if (destinos.length) destinos.forEach(function (d) { d.appendChild(linea()); });
    else { document.body.appendChild(linea(" fija")); document.body.style.paddingBottom = "28px"; }
    document.addEventListener("click", function (e) {
      if (e.target && e.target.hasAttribute && e.target.hasAttribute("data-qst-lic")) document.getElementById("qst-lic-modal").style.display = "flex";
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
})();
