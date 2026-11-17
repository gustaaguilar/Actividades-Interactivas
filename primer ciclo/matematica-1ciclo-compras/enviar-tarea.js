/* =====================================================================
   enviar-tarea.js — Botón "📤 Enviar mi tarea a mi docente"
   QueSepanTodos.com · © 2026 Gustavo Aguilar · CC BY-NC-ND 4.0

   Módulo ÚNICO compartido por todos los paquetes. Si hay que cambiar algo
   del envío (textos, tarjeta, Aulas EduTec…), se cambia acá y listo.

   Uso desde el cierre de cualquier paquete:
     if (window.QSTEnvio) contenedor.appendChild(QSTEnvio.boton({
       titulo: "El reloj", parte: "",            // parte: opcional
       grado: "3er grado · Matemática",           // grado / área: opcional
       aciertos: 8, errores: 2, puntos: 80
     }));

   Escrito en JavaScript "viejo" (ES5) a propósito, para que funcione en
   las tablets y netbooks más antiguas.
   ===================================================================== */
(function () {
  'use strict';
  if (window.QSTEnvio) return;

  var CLAVE = 'qst_envio';
  var FIRMA = 'QueSepanTodos.com · Profe Gustavo Aguilar';

  /* ---------- utilidades ---------- */
  function leerGuardado() {
    try { return JSON.parse(localStorage.getItem(CLAVE)) || {}; } catch (e) { return {}; }
  }
  function guardar(d) {
    try { localStorage.setItem(CLAVE, JSON.stringify(d)); } catch (e) {}
  }
  function contarIntento(titulo) {
    var k = 'qst_intento_' + titulo, n = 1;
    try { n = (parseInt(sessionStorage.getItem(k), 10) || 0) + 1; sessionStorage.setItem(k, n); }
    catch (e) { contarIntento._m = contarIntento._m || {}; n = contarIntento._m[k] = (contarIntento._m[k] || 0) + 1; }
    return n;
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function nodo(html) { var d = document.createElement('div'); d.innerHTML = html; return d.firstChild; }
  function fecha() {
    var d = new Date(), p = function (n) { return (n < 10 ? '0' : '') + n; };
    return p(d.getDate()) + '/' + p(d.getMonth() + 1) + '/' + d.getFullYear() + ' · ' + p(d.getHours()) + ':' + p(d.getMinutes()) + ' h';
  }

  /* ---------- estilos (una sola vez) ---------- */
  var CSS =
    '.qstEnvBtn{display:inline-block;margin:10px auto 4px;border:0;border-radius:30px;padding:11px 20px;font:800 clamp(15px,4.2vw,18px)/1.2 system-ui,sans-serif;background:#25d366;color:#fff;box-shadow:0 3px 0 #128c7e;cursor:pointer;-webkit-tap-highlight-color:transparent}' +
    '.qstEnvBtn:active{transform:translateY(2px);box-shadow:0 1px 0 #128c7e}' +
    '.qstEnvOv{position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.62);display:flex;align-items:center;justify-content:center;z-index:99999;padding:14px;box-sizing:border-box;font-family:system-ui,sans-serif}' +
    '.qstEnvCaja{background:#fff;color:#263238;border-radius:18px;padding:18px;display:flex;flex-direction:column;gap:9px;width:100%;max-width:400px;max-height:100%;overflow:auto;box-sizing:border-box;text-align:left;font-size:16px;box-shadow:0 10px 30px rgba(0,0,0,.35)}' +
    '.qstEnvCaja h3{margin:0 0 4px;font-size:20px;text-align:center;color:#1b5e20}' +
    '.qstEnvCaja label{font-weight:700;font-size:15px;margin-top:2px}' +
    '.qstEnvCaja label small{font-weight:400;color:#78909c}' +
    '.qstEnvCaja input{font-size:17px;padding:10px 12px;border:2px solid #c5cae9;border-radius:10px;width:100%;box-sizing:border-box;-webkit-user-select:text;user-select:text;background:#fff;color:#263238}' +
    '.qstEnvCaja input:focus{outline:none;border-color:#25d366}' +
    '.qstEnvCaja input.qstFalta{border-color:#e53935;background:#ffebee}' +
    '.qstEnvAviso{min-height:20px;color:#c62828;font-weight:700;font-size:15px;text-align:center}' +
    '.qstEnvBtns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:4px}' +
    '.qstEnvBtns button,.qstEnvBtns a{flex:1 1 130px;border:0;border-radius:24px;padding:11px 14px;font:800 16px system-ui,sans-serif;text-align:center;text-decoration:none;cursor:pointer}' +
    '.qstSi{background:#25d366;color:#fff}.qstNo{background:#eceff1;color:#37474f}' +
    '.qstEnvTarj img{width:100%;height:auto;border-radius:10px;border:1px solid #cfd8dc;max-height:52vh;object-fit:contain}' +
    '.qstEnvTarj small{display:block;text-align:center;color:#546e7a;font-size:14px}';
  function ponerEstilos() {
    if (document.getElementById('qstEnvCSS')) return;
    var s = document.createElement('style'); s.id = 'qstEnvCSS'; s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }

  /* ---------- formulario ---------- */
  function abrirFormulario(r) {
    ponerEstilos();
    var g = leerGuardado();
    var ov = nodo('<div class="qstEnvOv" role="dialog" aria-modal="true"><div class="qstEnvCaja">' +
      '<h3>📤 Enviar mi tarea a mi docente</h3>' +
      '<label for="qstNom">Nombre y apellido del estudiante</label>' +
      '<input id="qstNom" maxlength="45" autocomplete="name" value="' + esc(g.estudiante) + '">' +
      '<label for="qstCur">Curso</label>' +
      '<input id="qstCur" maxlength="20" placeholder="ej.: 3.° A" value="' + esc(g.curso) + '">' +
      '<label for="qstDoc">Nombre y apellido del docente <small>(opcional)</small></label>' +
      '<input id="qstDoc" maxlength="45" value="' + esc(g.docente) + '">' +
      '<div class="qstEnvAviso" aria-live="polite"></div>' +
      '<div class="qstEnvBtns"><button type="button" class="qstNo">Cancelar</button><button type="button" class="qstSi">📤 Enviar</button></div>' +
      '</div></div>');
    document.body.appendChild(ov);
    var nom = ov.querySelector('#qstNom'), cur = ov.querySelector('#qstCur'), doc = ov.querySelector('#qstDoc'),
        aviso = ov.querySelector('.qstEnvAviso');
    function falta(inp, msj) { inp.className = 'qstFalta'; aviso.textContent = msj; try { inp.focus(); } catch (e) {} }
    nom.oninput = cur.oninput = function () { this.className = ''; aviso.textContent = ''; };
    ov.querySelector('.qstNo').onclick = function () { cerrar(ov); };
    ov.querySelector('.qstSi').onclick = function () {
      var d = { estudiante: nom.value.replace(/\s+/g, ' ').trim(), curso: cur.value.replace(/\s+/g, ' ').trim(), docente: doc.value.replace(/\s+/g, ' ').trim() };
      if (!d.estudiante) return falta(nom, '✏️ Escribí tu nombre y apellido, así tu docente sabe que es tuyo.');
      if (!d.curso) return falta(cur, '✏️ Falta tu curso (por ejemplo: 3.° A).');
      guardar(d);
      cerrar(ov);
      enviar(r, d);
    };
    setTimeout(function () { try { if (!nom.value) nom.focus(); else if (!cur.value) cur.focus(); } catch (e) {} }, 60);
  }
  function cerrar(ov) { if (ov && ov.parentNode) ov.parentNode.removeChild(ov); }

  /* ---------- tarjeta PNG ---------- */
  function ajustar(g, txt, maxAncho, tam, peso) {
    var t = tam;
    do { g.font = (peso || '') + ' ' + t + 'px system-ui, sans-serif'; t -= 2; } while (t > 14 && g.measureText(txt).width > maxAncho);
  }
  function hacerTarjeta(r, d) {
    var c = document.createElement('canvas'); var W = 720, H = (d.docente ? 935 : 890) - (r.sinPuntaje ? 264 : 0);
    c.width = W; c.height = H;
    var g = c.getContext && c.getContext('2d'); if (!g) return null;
    var titulo = r.titulo + (r.parte ? ' · ' + r.parte : '');
    g.fillStyle = '#f1f8e9'; g.fillRect(0, 0, W, H);
    g.fillStyle = '#2e7d32'; g.fillRect(0, 0, W, 165);
    g.textAlign = 'center'; g.fillStyle = '#fff';
    ajustar(g, titulo, W - 60, 42, 'bold'); g.fillText(titulo, W / 2, 78);
    if (r.grado) { ajustar(g, r.grado, W - 80, 26, 'bold'); g.fillText(r.grado, W / 2, 128); }
    var y = 235;
    g.fillStyle = '#263238'; ajustar(g, '👤 ' + d.estudiante, W - 60, 38, 'bold'); g.fillText('👤 ' + d.estudiante, W / 2, y);
    y += 50; ajustar(g, '🏫 Curso: ' + d.curso, W - 80, 28); g.fillText('🏫 Curso: ' + d.curso, W / 2, y);
    if (d.docente) { y += 44; ajustar(g, '👩‍🏫 Docente: ' + d.docente, W - 80, 28); g.fillText('👩‍🏫 Docente: ' + d.docente, W / 2, y); }
    y += 50;
    var filas = r.sinPuntaje ? [['✅ Actividad', 'completada'], ['🔁 Intento n.°', r.intento]]
      : [['✅ Aciertos', r.aciertos], ['❌ Errores', r.errores], ['📊 Total', r.pct + '%'], ['⭐ Puntos', r.puntos], ['🔁 Intento n.°', r.intento]];
    for (var i = 0; i < filas.length; i++) {
      var fy = y + i * 88;
      g.fillStyle = '#fff'; g.fillRect(110, fy, 500, 72);
      g.strokeStyle = '#c8e6c9'; g.lineWidth = 2; g.strokeRect(110, fy, 500, 72);
      g.font = 'bold 30px system-ui, sans-serif';
      g.textAlign = 'left'; g.fillStyle = '#455a64'; g.fillText(filas[i][0], 140, fy + 47);
      g.textAlign = 'right'; g.fillStyle = '#2e7d32'; g.fillText(String(filas[i][1]), 580, fy + 47);
    }
    g.textAlign = 'center'; g.fillStyle = '#607d8b'; g.font = '24px system-ui, sans-serif';
    g.fillText('📅 ' + r.fecha, W / 2, H - 70);
    g.font = 'bold 22px system-ui, sans-serif'; g.fillText(FIRMA, W / 2, H - 32);
    try { return c.toDataURL('image/png'); } catch (e) { return null; }
  }
  function textoWhatsApp(r, d) {
    return '📚 ' + r.titulo + (r.parte ? ' · ' + r.parte : '') + (r.grado ? '\n🎓 ' + r.grado : '') +
      '\n👤 ' + d.estudiante + '\n🏫 Curso: ' + d.curso + (d.docente ? '\n👩‍🏫 Docente: ' + d.docente : '') +
      (r.sinPuntaje ? '\n✅ Actividad completada' : '\n✅ Aciertos: ' + r.aciertos + ' · ❌ Errores: ' + r.errores + ' · 📊 ' + r.pct + '% · ⭐ ' + r.puntos) +
      '\n🔁 Intento n.° ' + r.intento + ' · 📅 ' + r.fecha + '\n' + FIRMA;
  }

  /* ---------- envío: compartir directo o mostrar la tarjeta ---------- */
  function enviar(r, d) {
    r.fecha = fecha();
    var url = hacerTarjeta(r, d), txt = textoWhatsApp(r, d), f = null;
    if (url) {
      try {
        var bin = atob(url.split(',')[1]), u = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
        f = new File([u], 'tarea-' + r.titulo.replace(/[^\wáéíóúñ]+/gi, '_') + '.png', { type: 'image/png' });
      } catch (e) { f = null; }
    }
    // 1) Compartir directo (paquete publicado en https y navegador que lo permite)
    try {
      if (f && window.isSecureContext && navigator.canShare && navigator.canShare({ files: [f] })) {
        navigator.share({ files: [f], text: txt }).then(null, function (e) {
          if (!e || e.name !== 'AbortError') verTarjeta(url, txt, f);
        });
        return;
      }
    } catch (e) {}
    // 2) Siempre responde: se muestra la tarjeta en pantalla
    verTarjeta(url, txt, f);
  }
  function verTarjeta(url, txt, f) {
    ponerEstilos();
    var ov = nodo('<div class="qstEnvOv" role="dialog" aria-modal="true"><div class="qstEnvCaja qstEnvTarj">' +
      '<h3>📸 Tu tarea está lista</h3>' +
      (url ? '<img alt="Tarjeta con tus resultados" src="' + url + '">' : '') +
      '<small>' + (url ? 'Mantené apretada la imagen para guardarla o compartirla, o sacale una captura de pantalla y mandásela a tu docente.'
                       : 'Sacale una captura de pantalla a tus resultados y mandásela a tu docente.') + '</small>' +
      '<div class="qstEnvBtns"><a class="qstSi" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(txt) + '">💬 WhatsApp</a>' +
      (url ? '<a class="qstNo qstGuardar" download="' + esc(f ? f.name : 'tarea.png') + '" href="' + url + '">⬇️ Guardar</a>' : '') + '</div>' +
      '<div class="qstEnvBtns"><button type="button" class="qstNo qstCerrar">Cerrar</button></div>' +
      '</div></div>');
    document.body.appendChild(ov);
    ov.querySelector('.qstCerrar').onclick = function () { cerrar(ov); };
  }

  /* ---------- API pública ---------- */
  window.QSTEnvio = {
    version: '1.0',
    boton: function (cfg) {
      ponerEstilos();
      var r = {
        titulo: cfg.titulo || document.title || 'Actividad interactiva',
        parte: cfg.parte || '', grado: cfg.grado || '',
        aciertos: +cfg.aciertos || 0, errores: +cfg.errores || 0, puntos: +cfg.puntos || 0,
        sinPuntaje: !!cfg.sinPuntaje
      };
      var tot = r.aciertos + r.errores;
      r.pct = tot ? Math.round(r.aciertos * 100 / tot) : 0;
      r.intento = cfg.intento || contarIntento(r.titulo);
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'qstEnvBtn'; b.textContent = '📤 Enviar mi tarea a mi docente';
      b.onclick = function (e) { if (e && e.stopPropagation) e.stopPropagation(); abrirFormulario(r); };
      return b;
    },
    /* Para pantallas de cierre fijas en el HTML (que no se vuelven a dibujar):
       saca el botón anterior, si lo hay, y pone uno nuevo con los datos actuales. */
    poner: function (contenedor, cfg) {
      if (!contenedor) return null;
      var viejo = contenedor.querySelector('.qstEnvBtn');
      if (viejo && viejo.parentNode) viejo.parentNode.removeChild(viejo);
      var b = this.boton(cfg); contenedor.appendChild(b); return b;
    }
  };
})();
