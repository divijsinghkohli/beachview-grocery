(function () {
  var store = window.STORE;
  var menu = window.MENU || [];

  var DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function money(n) {
    return "$" + n.toFixed(2);
  }

  function hourLabel(h) {
    if (h === 0 || h === 24) return "midnight";
    if (h === 12) return "noon";
    var suffix = h < 12 ? "am" : "pm";
    var hr = h % 12 || 12;
    var whole = Math.floor(hr);
    var mins = Math.round((hr - whole) * 60);
    return whole + (mins ? ":" + String(mins).padStart(2, "0") : "") + " " + suffix;
  }

  // Current day and hour at the store, regardless of the visitor's time zone.
  function storeNow() {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: store.timeZone,
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23"
    }).formatToParts(new Date());
    var map = {};
    parts.forEach(function (p) { map[p.type] = p.value; });
    var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(map.weekday);
    return { day: day, hour: Number(map.hour) + Number(map.minute) / 60 };
  }

  function hoursFor(day) {
    return store.hours.filter(function (h) { return h.day === day; })[0];
  }

  /* ---------- Open / closed ---------- */

  function renderStatus() {
    var now = storeNow();
    var today = hoursFor(now.day);
    var els = document.querySelectorAll("[data-status]");
    if (!today || !els.length) return;

    var open = now.hour >= today.open && now.hour < today.close;
    var text;
    if (open) {
      text = today.close - now.hour <= 1
        ? "Open now, closing at " + hourLabel(today.close)
        : "Open now until " + hourLabel(today.close);
    } else if (now.hour < today.open) {
      text = "Closed now, opens at " + hourLabel(today.open);
    } else {
      var tomorrow = hoursFor((now.day + 1) % 7);
      text = "Closed now, opens tomorrow at " + hourLabel(tomorrow.open);
    }

    Array.prototype.forEach.call(els, function (statusEl) {
      statusEl.classList.toggle("is-open", open);
      statusEl.classList.toggle("is-closed", !open);
      statusEl.textContent = text;
    });
  }

  /* ---------- Hours table ---------- */

  function renderHoursTable() {
    var body = document.querySelector("[data-hours] tbody");
    if (!body) return;
    var todayIdx = storeNow().day;
    // Week starts Monday, the way the store's sign would list it.
    [1, 2, 3, 4, 5, 6, 0].forEach(function (d) {
      var h = hoursFor(d);
      var tr = el("tr");
      if (d === todayIdx) tr.className = "is-today";
      var th = el("th", null, DAY_NAMES[d]);
      th.scope = "row";
      tr.appendChild(th);
      tr.appendChild(el("td", null, h ? hourLabel(h.open) + " – " + hourLabel(h.close) : "Closed"));
      body.appendChild(tr);
    });
  }

  /* ---------- Menu ---------- */

  function renderPrice(item) {
    var wrap = el("span", "price");
    if (Array.isArray(item.price)) {
      var opts = el("span", "price-opts");
      item.price.forEach(function (opt) {
        var o = el("span");
        o.appendChild(el("span", "price-opt-label", opt[0]));
        o.appendChild(document.createTextNode(money(opt[1])));
        opts.appendChild(o);
      });
      wrap.appendChild(opts);
    } else if (typeof item.price === "number") {
      wrap.appendChild(document.createTextNode(money(item.price)));
      if (item.unit) wrap.appendChild(el("span", "unit", " /" + item.unit));
    } else if (item.price) {
      wrap.textContent = item.price;
    }
    return wrap;
  }

  function renderItems(section) {
    var ul = el("ul", "items");
    section.items.forEach(function (item) {
      var li = el("li", "item");
      var line = el("div", "item-line");
      var name = el("span", "item-name", item.name);
      if (item.tag) name.appendChild(el("span", "item-tag", item.tag));
      line.appendChild(name);
      line.appendChild(el("span", "leader"));
      line.appendChild(renderPrice(item));
      li.appendChild(line);
      if (item.desc) li.appendChild(el("p", "item-desc", item.desc));
      ul.appendChild(li);
    });
    return ul;
  }

  // One menu section visible at a time, chosen by tabs.
  function renderMenu() {
    var tabList = document.querySelector("[data-tabs]");
    var panelWrap = document.querySelector("[data-panels]");
    if (!tabList || !panelWrap) return;

    var tabs = [];
    var panels = [];
    var ready = false;

    menu.forEach(function (section, i) {
      var tab = el("button", "tab", section.tab || section.title);
      tab.type = "button";
      tab.id = "tab-" + section.id;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", "panel-" + section.id);
      tabList.appendChild(tab);
      tabs.push(tab);

      var panel = el("div", "panel");
      panel.id = "panel-" + section.id;
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", tab.id);
      panel.tabIndex = 0;

      var head = el("div", "panel-head");
      head.appendChild(el("h3", "panel-title", section.title));
      if (section.note) head.appendChild(el("p", "panel-note", section.note));
      panel.appendChild(head);
      if (section.groups) {
        section.groups.forEach(function (group) {
          var g = el("div", "group");
          g.appendChild(el("h4", "group-title", group.title));
          g.appendChild(renderItems(group));
          panel.appendChild(g);
        });
      } else {
        panel.appendChild(renderItems(section));
      }
      panelWrap.appendChild(panel);
      panels.push(panel);

      tab.addEventListener("click", function () { select(i, false); });
    });

    function select(index, focus) {
      tabs.forEach(function (t, i) {
        var on = i === index;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        panels[i].hidden = !on;
      });
      if (focus) tabs[index].focus();

      // If the tabs have scrolled off the top, bring the menu back into view.
      if (!ready) return;
      var top = tabList.getBoundingClientRect().top;
      var header = document.querySelector(".site-header");
      var offset = header ? header.offsetHeight : 0;
      if (top < offset) {
        window.scrollTo({ top: window.scrollY + top - offset - 16, behavior: "smooth" });
      }
    }

    tabList.addEventListener("keydown", function (e) {
      var current = tabs.indexOf(document.activeElement);
      if (current === -1) return;
      var next = null;
      if (e.key === "ArrowRight") next = (current + 1) % tabs.length;
      if (e.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = tabs.length - 1;
      if (next !== null) {
        e.preventDefault();
        select(next, true);
      }
    });

    select(0, false);
    ready = true;

    // Lets the drawer open a specific tab.
    window.showMenuTab = function (id) {
      for (var i = 0; i < menu.length; i++) {
        if (menu[i].id === id) { select(i, false); return; }
      }
    };
  }

  /* ---------- Hamburger drawer ---------- */

  function setupDrawer() {
    var burger = document.querySelector("[data-burger]");
    var drawer = document.getElementById("drawer");
    var tabList = document.querySelector("[data-drawer-tabs]");
    if (!burger || !drawer) return;

    if (tabList) {
      menu.forEach(function (section) {
        var li = el("li");
        var a = el("a", null, section.tab || section.title);
        a.href = "#menu";
        a.setAttribute("data-drawer-close", "");
        a.addEventListener("click", function () {
          if (window.showMenuTab) window.showMenuTab(section.id);
        });
        li.appendChild(a);
        tabList.appendChild(li);
      });
    }

    function setOpen(open) {
      document.body.classList.toggle("drawer-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (open) {
        drawer.removeAttribute("inert");
        // Move focus into the drawer so Tab continues from there.
        setTimeout(function () { drawer.focus({ preventScroll: true }); }, 50);
      } else {
        drawer.setAttribute("inert", "");
      }
    }

    burger.addEventListener("click", function () {
      setOpen(!document.body.classList.contains("drawer-open"));
    });

    document.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("[data-drawer-close]")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("drawer-open")) {
        setOpen(false);
        burger.focus();
      }
    });
  }

  renderStatus();
  setupDrawer();
  renderHoursTable();
  renderMenu();

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  setInterval(renderStatus, 60 * 1000);
})();
