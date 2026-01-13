<script lang="ts">
  import "../app.css";
  import { base } from '$app/paths';
  import { slide } from 'svelte/transition';

  // --- Theme Toggle Logic ---
  function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute('data-bs-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-bs-theme', newTheme);
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: newTheme }));
  }

  // --- Buy Me A Coffee + Bitcoin Logic ---
  const bmacUsername = 'axelbase';
  let isDropdownOpen = false;

  function toggleDropdown() { isDropdownOpen = !isDropdownOpen; }
  function closeDropdown() { isDropdownOpen = false; }

  function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
      if (node && !node.contains(event.target as Node)) {
        node.dispatchEvent(new CustomEvent('click_outside'));
      }
    };
    document.addEventListener('click', handleClick, true);
    return {
      destroy() { document.removeEventListener('click', handleClick, true); }
    };
  }

  const currentYear = new Date().getFullYear();
</script>

<header class="fixed-top p-3 w-100" style="pointer-events: none; z-index: 1040;">
  <nav class="container glass-card rounded-pill px-4 py-2 d-flex justify-content-between align-items-center"
       style="pointer-events: auto; max-width: 1400px; min-height: 70px;">

    <div class="d-flex align-items-center gap-3">
      <a href="{base}/" class="d-flex align-items-center gap-2 text-decoration-none logo-group">
        <img src="{base}/AxelLab-Logo.ico" alt="AxelBase Logo" class="navbar-brand-logo" />
        <span class="fw-bold fs-4 tracking-tight" style="color: var(--color-text-main);">AxelBase</span>
      </a>

      <div class="position-relative ms-2 ms-md-3" use:clickOutside on:click_outside={closeDropdown}>
        <button
          class="bmac-button d-flex align-items-center gap-2 text-white border-0 px-4 py-2 rounded-pill shadow-sm"
          on:click={toggleDropdown}
          aria-label="Support options"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2,21V19H20V21H2M20,8V5H4V8H20M20,10H4V13C4,14.38 4.5,15.63 5.31,16.58L11.64,19H12.36L18.69,16.58C19.5,15.63 20,14.38 20,13V10M16,2H8V4H16V2Z" />
          </svg>
          <span class="d-none d-sm-inline fw-semibold">Buy me a Coffee</span>
        </button>

        {#if isDropdownOpen}
          <div
            class="bmac-dropdown glass-card mt-2"
            transition:slide={{ duration: 200 }}
          >
            <a href="https://buymeacoffee.com/{bmacUsername}" target="_blank" rel="noopener" on:click={closeDropdown}>
              <span class="amount">$3</span> One Coffee
            </a>
            <a href="https://buymeacoffee.com/{bmacUsername}" target="_blank" rel="noopener" on:click={closeDropdown}>
              <span class="amount">$5</span> Two Coffees
            </a>
            <a href="https://buymeacoffee.com/{bmacUsername}" target="_blank" rel="noopener" on:click={closeDropdown}>
              <span class="amount">$10</span> Three Coffees
            </a>

            <a
              href="https://buymeacoffee.com/{bmacUsername}"
              target="_blank"
              rel="noopener"
              on:click={closeDropdown}
              class="custom-amount"
            >
              Custom Amount
            </a>

            <a
              href="bitcoin:bc1q3p0e6vt492m4w4fpz5m2cl4zcfuqqkgaj6myc9?label=AxelBase&message=Buy%20me%20a%20coffee"
              on:click={closeDropdown}
              class="custom-amount bitcoin-option"
            >
              Buy via Crypto (Bitcoin)
            </a>
          </div>
        {/if}
      </div>
    </div>

    <div class="d-flex align-items-center gap-3">
      <ul class="d-none d-lg-flex align-items-center gap-1 m-0 list-unstyled">
        <li><a class="nav-link-custom" href="{base}/">Home</a></li>
        <li><a class="nav-link-custom" href="{base}/#about">About</a></li>
        <li><a class="nav-link-custom" href="{base}/#how-to">How to use</a></li>
        <li><a class="nav-link-custom" href="{base}/#faq">FAQ</a></li>
        <li><a class="nav-link-custom" href="{base}/blog">Blog</a></li>
      </ul>

      <button class="btn btn-theme-toggle rounded-circle" on:click={toggleTheme} aria-label="Toggle Dark Mode">
        <i class="bi bi-moon-stars-fill theme-icon"></i>
      </button>
    </div>

  </nav>
</header>

<div class="content-wrapper" style="padding-top: 100px; padding-bottom: 80px;">
  <slot />
</div>

<footer class="custom-footer glass-card border-top-0 rounded-0">
  <div class="container footer-content">
    <span>© AxelBase – {currentYear}</span>
    <div class="footer-links">
      <a href="{base}/privacy">Privacy</a>
      <span class="separator">•</span>
      <a href="{base}/terms">Terms</a>
    </div>
  </div>
</footer>

<style>
  /* ── Buy Me a Coffee styles (adapted from File 1 + glass effect) ── */
  .bmac-button {
    background: var(--color-accent);
    background: linear-gradient(135deg, var(--color-accent) 0%, #122929 100%);
    font-size: 0.95rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(25, 55, 55, 0.25);
  }

  .bmac-button:hover {
    background: linear-gradient(135deg, var(--color-accent-hover) 0%, #0e1f1f 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(25, 55, 55, 0.35);
  }

  .bmac-dropdown {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 240px;
    padding: 0.5rem 0;
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    box-shadow: var(--glass-shadow);
    overflow: hidden;
    z-index: 1050;
  }

  .bmac-dropdown a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    color: var(--color-text-main);
    text-decoration: none;
    font-size: 0.98rem;
    transition: all 0.2s ease;
  }

  .bmac-dropdown a:hover {
    background: rgba(var(--primary-h), var(--primary-s), var(--primary-l), 0.15);
    color: var(--color-accent);
    padding-left: 28px;
  }

  .bmac-dropdown .amount {
    font-weight: 700;
    color: var(--color-accent);
    font-size: 1.1rem;
  }

  .bmac-dropdown .custom-amount {
    font-weight: 600;
    color: var(--color-accent);
    border-top: 1px solid rgba(var(--primary-h), var(--primary-s), var(--primary-l), 0.15);
    justify-content: center !important;
    padding: 14px 20px;
  }

  .bitcoin-option {
    color: #f7931a !important;          /* bitcoin orange */
    font-weight: 600;
  }

  .bitcoin-option:hover {
    color: #f5b56e !important;
    background: rgba(247, 147, 26, 0.08) !important;
  }

  /* Rest of your existing styles remain unchanged */
  /* Logo Animation */
  .navbar-brand-logo { height: 32px; width: auto; transition: transform 0.3s ease; }
  .logo-group:hover .navbar-brand-logo { transform: rotate(10deg) scale(1.1); }

  /* Nav Links */
  .nav-link-custom {
    position: relative; padding: 0.5rem 1rem;
    color: var(--color-text-muted); font-weight: 600;
    text-decoration: none; transition: color 0.3s;
  }
  .nav-link-custom:hover { color: var(--color-accent); }
  .nav-link-custom::after {
    content: ''; position: absolute; width: 0; height: 2px;
    bottom: 5px; left: 50%; background-color: var(--color-accent);
    transition: all 0.3s ease-in-out; transform: translateX(-50%);
    border-radius: 2px;
  }
  .nav-link-custom:hover::after { width: 60%; }

  /* Theme Toggle */
  .btn-theme-toggle {
    width: 40px; height: 40px;
    border: 1px solid var(--glass-border);
    color: var(--color-text-main);
    display: flex; align-items: center; justify-content: center;
    transition: background 0.3s, transform 0.3s;
  }
  .btn-theme-toggle:hover { background: rgba(255,255,255,0.5); transform: rotate(15deg); }

  :global([data-bs-theme="dark"]) .theme-icon { transform: rotate(360deg); }
  .theme-icon { transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }

  /* Footer */
  .custom-footer {
    position: relative;
    bottom: 0; left: 0; width: 100%;
    padding: 1rem 0; z-index: 1000;
  }
  .footer-content { display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; color: var(--color-text-muted); }
  .footer-links a { text-decoration: none; color: var(--color-accent); font-weight: 600; }
  .separator { margin: 0 0.5rem; color: var(--color-text-muted); }
</style>