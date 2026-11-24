/*! Contractor Schema Generator v1.0.0 | MIT | Build Boosters, https://buildboosters.com */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var list = function (v, sep) { return v.split(sep || ',').map(function (x) { return x.trim(); }).filter(Boolean); };
  function build() {
    var d = {
      '@context': 'https://schema.org',
      '@type': $('type').value,
      name: $('name').value.trim(),
    };
    if ($('desc').value.trim()) d.description = $('desc').value.trim();
    if ($('url').value.trim()) { d.url = $('url').value.trim(); d['@id'] = d.url.replace(/\/$/, '') + '/#business'; }
    if ($('phone').value.trim()) d.telephone = $('phone').value.trim();
    if ($('logo').value.trim()) { d.image = $('logo').value.trim(); d.logo = d.image; }
    if ($('price').value.trim()) d.priceRange = $('price').value.trim();
    var addr = { '@type': 'PostalAddress' };
    if (!$('sab').checked && $('street').value.trim()) addr.streetAddress = $('street').value.trim();
    if ($('city').value.trim()) addr.addressLocality = $('city').value.trim();
    if ($('state').value.trim()) addr.addressRegion = $('state').value.trim();
    if ($('zip').value.trim()) addr.postalCode = $('zip').value.trim();
    addr.addressCountry = 'US';
    d.address = addr;
    var areas = list($('areas').value);
    if (areas.length) d.areaServed = areas.map(function (a) { return { '@type': 'City', name: a }; });
    var services = list($('services').value);
    if (services.length) d.hasOfferCatalog = { '@type': 'OfferCatalog', name: 'Services', itemListElement: services.map(function (s) { return { '@type': 'Offer', itemOffered: { '@type': 'Service', name: s } }; }) };
    var days = list($('days').value);
    var map = { Mo: 'Monday', Tu: 'Tuesday', We: 'Wednesday', Th: 'Thursday', Fr: 'Friday', Sa: 'Saturday', Su: 'Sunday' };
    var dayNames = days.map(function (x) { return map[x.slice(0, 2)]; }).filter(Boolean);
    if (dayNames.length && $('open').value && $('close').value) d.openingHoursSpecification = [{ '@type': 'OpeningHoursSpecification', dayOfWeek: dayNames, opens: $('open').value, closes: $('close').value }];
    var same = list($('same').value, /\n/);
    if (same.length) d.sameAs = same;
    return '<script type="application/ld+json">\n' + JSON.stringify(d, null, 2) + '\n</' + 'script>';
  }
  function render() { $('addr').hidden = $('sab').checked; $('out').textContent = build(); }
  document.getElementById('f').addEventListener('input', render);
  $('copy').addEventListener('click', function () {
    var t = $('out').textContent;
    var done = function () { $('msg').textContent = 'Copied.'; };
    if (navigator.clipboard) navigator.clipboard.writeText(t).then(done, function () { sel(); });
    else sel();
    function sel() { var r = document.createRange(); r.selectNodeContents($('out')); var s = getSelection(); s.removeAllRanges(); s.addRange(r); $('msg').textContent = 'Press Ctrl+C or Cmd+C to copy.'; }
  });
  render();
})();
