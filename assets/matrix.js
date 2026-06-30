/* matrix.js — renders the home comparison table from AXES + MODELS.
   Models are columns, axes are rows; every value cell carries its footnote markers. */
(function () {
  const mount = document.getElementById("matrix");
  if (!mount || !window.MODELS) return;

  const table = document.createElement("table");
  table.className = "matrix";

  const thead = document.createElement("thead");
  const hr = document.createElement("tr");
  const corner = document.createElement("th");
  corner.className = "corner";
  corner.textContent = "model";
  hr.appendChild(corner);
  MODELS.forEach((m) => {
    const th = document.createElement("th");
    th.className = "mhead" + (m.watch ? " is-watch" : "");
    const link = m.page && m.page !== "#";
    th.innerHTML =
      (link ? `<a class="mname mname--link" href="${m.page}">${m.name}</a>`
            : `<span class="mname">${m.name}</span>`) +
      `<span class="mtag">${m.tag}</span>` +
      (link ? "" : `<span class="mgo mgo--dim">${m.watch ? "watchlist · no code" : "dossier soon"}</span>`);
    hr.appendChild(th);
  });
  thead.appendChild(hr);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  AXES.forEach((ax) => {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.className = "axis";
    th.textContent = ax.label;
    tr.appendChild(th);
    MODELS.forEach((m) => {
      const td = document.createElement("td");
      td.className = "cell" + (m.watch ? " is-watch" : "");
      const f = m.facts[ax.key];
      if (f) {
        td.appendChild(document.createTextNode(f.value));
        td.appendChild(Cite.markers(f.cites));
      } else {
        td.innerHTML = `<span class="na">—</span>`;
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  mount.appendChild(table);

  Cite.hydrate();
})();
