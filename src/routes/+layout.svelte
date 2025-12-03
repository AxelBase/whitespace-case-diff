<script lang="ts">
  import "../app.css";
  import { base } from '$app/paths';
  import { slide } from 'svelte/transition';

  // --- Theme Toggle Logic ---
  function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute('data-bs-theme');
    const newTheme = current === 'dark' ? 'light' :
'dark';
    body.setAttribute('data-bs-theme', newTheme);
    window.dispatchEvent(new CustomEvent('theme-changed',
{ detail: newTheme }));
  }

  // --- Buy Me A Coffee Logic ---
  const paypalUsername = 'AxelLab427'; 
  const donationAmounts = [1, 3, 5, 10];
  let isDropdownOpen = false;

  function toggleDropdown() { isDropdownOpen = !isDropdownOpen;
}
  function closeDropdown() { isDropdownOpen = false; }

  function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) =>
{
      if (node && !node.contains(event.target as Node)) {
        node.dispatchEvent(new CustomEvent('click_outside'));
      }
    };
    document.addEventListener('click', handleClick,
true);
    return {
      destroy() { document.removeEventListener('click',
handleClick, true); }
    };
  }

  const currentYear = new Date().getFullYear();
</script>

<header class="fixed-top p-3 w-100" style="pointer-events:
none; z-index: 1040;">
  <nav class="container glass-card rounded-pill
px-4 py-2 d-flex justify-content-between align-items-center" 
       style="pointer-events: auto;
max-width: 1400px; min-height: 70px;">
    
    <div class="d-flex align-items-center
gap-3">
      <a href="{base}/" class="d-flex
align-items-center gap-2 text-decoration-none logo-group">
        <img src="{base}/AxelLab-Logo.ico"
alt="AxelBase Logo" class="navbar-brand-logo" />
        <span class="fw-bold
fs-4 tracking-tight" style="color: var(--color-text-main);">AxelBase</span>
      </a>

      <div class="position-relative
ms-2 ms-md-3" use:clickOutside on:click_outside={closeDropdown}>
        <button class="bmac-button
d-flex align-items-center gap-2" on:click={toggleDropdown}>
          <svg class="coffee-icon"
xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.35,22.2L12,22A10,10,0,0,1,2,12V10A2,2,0,0,1,4,8H7.2A5.13,5.13,0,0,1,12,3A5.13,5.13,0,0,1,16.8,8H20A2,2,0,0,1,22,10V12A10,10,0,0,1,12.35,22.2M4,10V12A8,8,0,0,0,12,20A8,8,0,0,0,20,12V10H16.8A5.11,5.11,0,0,1,12.5,5.12A5.15,5.15,0,0,1,7.2,10H4Z"/>
          </svg>
          <span class="d-none
d-sm-inline">Buy me a coffee</span>
        </button>

        {#if isDropdownOpen}
          <div class="bmac-dropdown
glass-card" transition:slide={{ duration: 200 }}>
            <div class="d-flex
flex-column gap-1">
              {#each donationAmounts
as amount}
                <a
href="https://paypal.me/{paypalUsername}/{amount}" target="_blank"
rel="noopener noreferrer" 
                  on:click={closeDropdown} class="donation-option">
                  ${amount}
                </a>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>

    <div class="d-flex align-items-center
gap-3">
      <ul class="d-none d-lg-flex
align-items-center gap-1 m-0 list-unstyled">
        <li><a class="nav-link-custom"
href="{base}/">Home</a></li>
        <li><a class="nav-link-custom"
href="{base}/#about">About</a></li>
        <li><a class="nav-link-custom"
href="{base}/#how-to">How to use</a></li>
        <li><a class="nav-link-custom"
href="{base}/#faq">FAQ</a></li>
        <li><a class="nav-link-custom"
href="{base}/blog">Blog</a></li>
      </ul>

      <button class="btn
btn-theme-toggle rounded-circle" on:click={toggleTheme} aria-label="Toggle
Dark Mode">
        <i class="bi
bi-moon-stars-fill theme-icon"></i>
      </button>
    </div>

  </nav>
</header>

<div class="content-wrapper" style="padding-top:
100px; padding-bottom: 80px;">
    <slot />
</div>

<footer class="custom-footer glass-card border-top-0
rounded-0">
    <div class="container
footer-content">
        <span>© AxelBase Markdown
to HTML Converter – {currentYear}</span>
        <div class="footer-links">
            <a href="{base}/privacy">Privacy</a>
            <span class="separator">•</span>
            <a href="{base}/terms">Terms</a>
        </div>
    </div>
</footer>

<style>
  /* Logo Animation */
  .navbar-brand-logo { height: 32px; width: auto; transition:
transform 0.3s ease; }
  .logo-group:hover .navbar-brand-logo { transform: rotate(10deg)
scale(1.1); }

  /* Nav Links */
  .nav-link-custom { 
    position: relative; padding: 0.5rem 1rem; 
    color: var(--color-text-muted); font-weight: 600;
    text-decoration: none; transition: color 0.3s;
  }
  .nav-link-custom:hover { color: var(--color-accent);
}
  .nav-link-custom::after { 
    content: ''; position: absolute; width: 0; height:
2px; 
    bottom: 5px; left: 50%; background-color: var(--color-accent);
    transition: all 0.3s ease-in-out; transform: translateX(-50%);
    border-radius: 2px; 
  }
  .nav-link-custom:hover::after { width: 60%; }

  /* BMAC Button - UPDATED GRADIENT FOR GREEN THEME */
  .bmac-button {
    background: linear-gradient(135deg, var(--color-accent)
0%, #2d5e5e 100%);
    color: white; border: none; padding: 0.4rem 1.2rem;
    border-radius: 50px; font-weight: 600; cursor:
pointer;
    box-shadow: 0 4px 15px rgba(25, 55, 55, 0.2);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .bmac-button:hover { transform: translateY(-2px); box-shadow:
0 6px 20px rgba(25, 55, 55, 0.3); }
  .coffee-icon { width: 18px; height: 18px; }
  
  .bmac-dropdown {
    position: absolute; top: 120%; left: 0; min-width:
120px;
    padding: 0.5rem; z-index: 1050; overflow: hidden;
  }
  .donation-option {
    display: block; padding: 8px; text-align: center;
border-radius: 8px;
    font-weight: bold; color: var(--color-text-main);
text-decoration: none;
    transition: background 0.2s, color 0.2s;
  }
  .donation-option:hover { background: rgba(25, 55, 55,
0.1); color: var(--color-accent); }

  /* Theme Toggle */
  .btn-theme-toggle {
    width: 40px; height: 40px;
    border: 1px solid var(--glass-border);
    color: var(--color-text-main);
    display: flex; align-items: center; justify-content:
center;
    transition: background 0.3s, transform 0.3s;
  }
  .btn-theme-toggle:hover { background: rgba(255,255,255,0.5);
transform: rotate(15deg); }
  
  :global([data-bs-theme="dark"]) .theme-icon
{ transform: rotate(360deg); }
  .theme-icon { transition: transform 0.5s cubic-bezier(0.175,
0.885, 0.32, 1.275); }

  /* Footer: Removed fixed positioning */
  .custom-footer {
    position: relative; /* Changed from fixed */
    bottom: 0; left: 0; width: 100%;
    padding: 1rem 0; z-index: 1000;
  }
  .footer-content { display: flex; justify-content: space-between;
align-items: center; font-size: 0.9rem; color: var(--color-text-muted); }
  .footer-links a { text-decoration: none; color: var(--color-accent);
font-weight: 600; }
  .separator { margin: 0 0.5rem; color: var(--color-text-muted); } /* Updated color */
</style>