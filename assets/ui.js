/* ui.js — the citations on/off toggle (persisted). No animation. */
(function () {
  const KEY = "vlnkb-cites";
  function apply(on) {
    document.body.classList.toggle("cites-off", !on);
    document.querySelectorAll("[data-cite-toggle]").forEach((t) => {
      t.setAttribute("aria-pressed", String(on));
      t.classList.toggle("is-off", !on);
    });
  }
  document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem(KEY);
    let on = saved === null ? true : saved === "1";
    apply(on);
    document.querySelectorAll("[data-cite-toggle]").forEach((t) =>
      t.addEventListener("click", () => { on = !on; localStorage.setItem(KEY, on ? "1" : "0"); apply(on); }));
  });
})();
