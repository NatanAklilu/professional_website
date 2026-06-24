(function () {

  class SiteNav extends HTMLElement {
    connectedCallback() {
      const page = this.getAttribute('data-page') || 'index';
      const isHome = page === 'index';
      const p = isHome ? '' : 'index.html';

      const expLinks = [
        { key: 'coinbase',    href: 'Coinbase.html',              label: 'Coinbase' },
        { key: 'amazon',      href: 'Amazon.html',                label: 'Amazon' },
        { key: 'cu-geodata',  href: 'CU_GeoData.html',            label: 'CU GeoData' },
        { key: 'cornell-ta',  href: 'Cornell_TA.html',            label: 'Cornell TA' },
      ];

      const projLinks = [
        { key: 'tax-lot-split',    href: 'Tax_Lot_Split.html',            label: 'Tax Lot Split' },
        { key: 'bridge-quote',     href: 'Bridge_Quote_Simulation.html',  label: 'Bridge Quote Simulation' },
        { key: 'anomaly',          href: 'Anomaly_Detection.html',        label: 'Anomaly Detection' },
        { key: 'camlchess',        href: 'CamlChess.html',                label: 'CamlChess' },
        { key: 'space-invaders',   href: 'https://github.com/NatanAklilu/SpaceInvaders', label: 'Space Invaders' },
      ];

      const li = ({ key, href, label }) =>
        `<li><a href="${key === page ? '#' : href}" class="scrolly">${label}</a></li>`;

      this.innerHTML = `
        <header id="header">
          <h1 id="logo"><a href="index.html" class="scrolly"><img src="Media/Website_Logo_No_BG.png" height="100%"></a></h1>
          <nav id="nav">
            <ul>
              <li><a href="${p}#one" class="scrolly">About Me</a></li>
              <li><a href="${p}#two" class="scrolly">Education</a></li>
              <li>
                <a href="${p}#three" class="scrolly">Experience &#8964;</a>
                <ul>
                  ${expLinks.map(li).join('\n                  ')}
                </ul>
              </li>
              <li>
                <a href="${p}#four" class="scrolly">Projects &#8964;</a>
                <ul>
                  ${projLinks.map(li).join('\n                  ')}
                </ul>
              </li>
              <li><a href="Media/Natan_Aklilu_Resume_2026.pdf" download class="button primary">Resume</a></li>
            </ul>
          </nav>
        </header>`;
    }
  }

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      const page = this.getAttribute('data-page') || 'index';
      const isHome = page === 'index';
      const p = isHome ? '' : 'index.html';

      this.innerHTML = `
        <footer id="footer">
          <ul class="footer-links">
            <li><a href="${p}#header" class="scrolly">Home</a></li>
            <li><a href="${p}#one" class="scrolly">About</a></li>
            <li><a href="${p}#three" class="scrolly">Experience</a></li>
            <li><a href="${p}#four" class="scrolly">Projects</a></li>
            <li><a href="https://www.linkedin.com/in/natantaklilu/" class="contact">Contact</a></li>
          </ul>
          <div class="footer-logo">
            <a href="${isHome ? '#banner' : 'index.html#banner'}" class="scrolly">
              <img src="Media/Website_Logo_No_BG.png" height="70em">
            </a>
          </div>
          <div class="footer-copyright">
            &copy; 2026 Natan Aklilu. All rights reserved.
          </div>
        </footer>`;
    }
  }

  customElements.define('site-nav', SiteNav);
  customElements.define('site-footer', SiteFooter);

})();
