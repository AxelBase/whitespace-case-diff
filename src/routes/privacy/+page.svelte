<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Privacy Policy | Whitespace & Case
Sensitive Code Diff</title>
  <meta name="description" content="We
collect zero data. Your code never leaves your browser. Full privacy policy for
the client-side semantic code comparison tool." />
  <meta property="og:title" content="Privacy
Policy | Whitespace & Case Sensitive Code Diff" />
  <meta property="og:description" content="100%
client-side. No tracking. No storage. Your code stays yours — always." />
  <meta property="og:url" content="{base}/privacy"
/>
  <meta property="og:type" content="website"
/>
  <meta name="twitter:card" content="summary_large_image"
/>
</svelte:head>

<div class="container fade-in py-5" style="max-width: 900px;">
  <article class="prose">
    <h1 style="color: var(--color-accent);">Privacy Policy</h1>
    <p class="post-meta" style="color: var(--color-text-muted);">Effective
Date: December 10, 2025</p>

    <p style="color: var(--color-text-main);"><strong>We collect nothing.
Your code never leaves your device.</strong></p>

    <p style="color: var(--color-text-main);">This is a <strong>fully
client-side</strong> web application. Every comparison, normalization,
and URL encoding happens exclusively in your browser using JavaScript. No
server receives, processes, stores, or logs any part of your input — ever.</p>

    <h2 style="color: var(--color-accent);">What We Do Not Collect</h2>
    <p style="color: var(--color-text-main);">We intentionally designed this tool
to operate with <em>zero data collection</em></p>
    
    <h2 style="color: var(--color-accent);">Why No Data Collection?</h2>
    <p style="color: var(--color-text-main);">The primary function of this tool is sensitive: comparing code. We believe absolute privacy is non-negotiable for developers. By performing all computations locally in your browser, we eliminate any risk of server-side data breaches, logs, or third-party access.</p>

    <h2 style="color: var(--color-accent);">Cookies and Tracking</h2>
    <p style="color: var(--color-text-main);">We use no advertising cookies, analytics cookies, or tracking pixels. The only exception is technical cookies used by the hosting platform (if any) to deliver the site, which are outside of our direct control but do not relate to your code input.</p>

    <h2 style="color: var(--color-accent);">Sharing via URL</h2>
    <p style="color: var(--color-text-main);">When you share a comparison link, the URL contains a highly compressed string of your code and settings. This compression happens locally. While the data is private and only readable by the tool, be aware that anyone with the link can access the code you shared.</p>

    <h2 style="color: var(--color-accent);">Changes to this Policy</h2>
    <p style="color: var(--color-text-main);">We may update this policy. Since the core functionality is client-side, the policy is unlikely to change drastically. The latest effective date will always be displayed at the top of this page.</p>

    <h2 style="color: var(--color-accent);">Contact</h2>
    <p style="color: var(--color-text-main);">If you have any questions about this Privacy Policy, please reach out to us at [Contact Email Address].</p>
  </article>
</div>

<style>
  .prose p, .prose strong {
    line-height: 1.8;
  }
</style>