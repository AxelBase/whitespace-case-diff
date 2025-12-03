<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Terms of Service | Whitespace & Case
Sensitive Code Diff</title>
  <meta name="description" content="Terms of Use for the AxelBase semantic code comparison tool. Client-side, open-source, and free to use." />
  <meta property="og:title" content="Terms of Service | Whitespace & Case Sensitive Code Diff" />
  <meta property="og:description" content="Review the simple terms for using our client-side diff tool." />
  <meta property="og:url" content="{base}/terms" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in py-5" style="max-width: 900px;">
  <article class="prose">
    <h1 style="color: var(--color-accent);">Terms of Service</h1>
    <p class="post-meta" style="color: var(--color-text-muted);">Effective
Date: December 10, 2025</p>

    <h2 style="color: var(--color-accent);">1. Acceptance of Terms</h2>
    <p style="color: var(--color-text-main);">By accessing and using the AxelBase Whitespace & Case Sensitive Code Diff tool (the "Service"), you agree to comply with and be bound by these Terms of Service. If you do not agree, you should not use the Service.</p>

    <h2 style="color: var(--color-accent);">2. Nature of the Service</h2>
    <p style="color: var(--color-text-main);">The Service is a <strong>client-side, browser-based tool</strong> for comparing text and code. All data processing, including text input, comparison, and normalization, is performed locally on your device using JavaScript. No data, including the code you input, is ever sent to, stored by, or processed on our servers.</p>

    <h2 style="color: var(--color-accent);">3. User Conduct</h2>
    <p style="color: var(--color-text-main);">You agree to use the Service only for lawful purposes. Since the application runs entirely in your browser and we do not monitor or store your input, you are fully responsible for the content you choose to compare.</p>
    
    <h2 style="color: var(--color-accent);">4. Disclaimers and Limitations of Liability</h2>
    <p style="color: var(--color-text-main);">The Service is provided "as is," without warranty of any kind. We do not guarantee that the Service will be error-free or uninterrupted. We are not liable for any damages, direct or indirect, arising from the use or inability to use the Service, including but not limited to reliance on the accuracy of the diff results.</p>
    
    <h2 style="color: var(--color-accent);">5. Intellectual Property</h2>
    <p style="color: var(--color-text-main);">The underlying source code for the AxelBase Diff tool is open source (MIT License). You are free to inspect, modify, and redistribute the code according to the license terms. The content and code you input remain your sole property.</p>

    <h2 style="color: var(--color-accent);">6. Changes to Terms</h2>
    <p style="color: var(--color-text-main);">We reserve the right to modify these Terms at any time. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.</p>

    <h2 style="color: var(--color-accent);">7. Governing Law</h2>
    <p style="color: var(--color-text-main);">These Terms are governed by the laws of [Your Jurisdiction, e.g., the State of California], without regard to its conflict of law principles.</p>

  </article>
</div>

<style>
  .prose p, .prose strong {
    line-height: 1.8;
  }
</style>