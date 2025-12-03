<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>404 – Page Not Found | Whitespace & Case Sensitive Code Diff</title>
  <meta name="description" content="The page you're looking for doesn't exist. Return to the semantic code diff tool." />
  <meta property="og:title" content="404 – Page Not Found" />
  <meta property="og:description" content="Oops! This page doesn't exist. Get back to comparing code without noise." />
  <meta property="og:url" content="{base}/404" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="error-container">
  <div class="error-content">
    <h1 class="error-code">404</h1>
    <h2 class="error-title">Page Not Found</h2>
    <p class="error-message">
      Looks like this page got reformatted out of existence — even we couldn't ignore that change.
    </p>

    <p class="error-hint">
      The link might be broken, or the page has been moved. Don’t worry — the diff tool is still here.
    </p>

    <div class="error-actions">
      <a href="{base}/" class="btn-primary">Back to Code Diff</a>
      <a href="{base}/blog" class="btn-secondary">Read the Blog</a>
    </div>

    <div class="error-links">
      <h3>Useful Links</h3>
      <ul>
        <li><a href="{base}/">Home – Semantic Code Diff</a></li>
        <li><a href="{base}/blog">Blog – Technical Articles</a></li>
        <li><a href="{base}/privacy">Privacy Policy</a></li>
        <li><a href="{base}/terms">Terms & Conditions</a></li>
      </ul>
    </div>

    <p class="italic-note">
      <strong>Pro tip:</strong> Even 404s should be helpful. Keep comparing. Keep building.
    </p>
  </div>
</div>

<style>
  .error-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    background: radial-gradient(circle at center, #1a1a2e, #0f0f1a);
  }

  .error-content {
    text-align: center;
    max-width: 680px;
    padding: 3rem 2rem;
    background: rgba(20, 20, 40, 0.7);
    border-radius: 20px;
    border: 1px solid #7c3aed44;
    backdrop-filter: blur(12px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  }

  .error-code {
    font-size: 8rem;
    font-weight: 900;
    margin: 0;
    background: linear-gradient(90deg, #00d4ff, #7c3aed);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
  }

  .error-title {
    font-size: 2.8rem;
    color: #e0e7ff;
    margin: 1rem 0 1.5rem;
  }

  .error-message {
    font-size: 1.3rem;
    color: #ccc;
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .error-hint {
    color: #aaa;
    font-size: 1.05rem;
    margin-bottom: 2.5rem;
  }

  .error-actions {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
    margin: 2.5rem 0;
  }

  .btn-primary, .btn-secondary {
    padding: 0.9rem 2rem;
    border-radius: 50px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 1.1rem;
  }

  .btn-primary {
    background: linear-gradient(135deg, #00d4ff, #7c3aed);
    color: white;
  }

  .btn-primary:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(124, 58, 237, 0.4);
  }

  .btn-secondary {
    background: transparent;
    color: #00d4ff;
    border: 2px solid #00d4ff;
  }

  .btn-secondary:hover {
    background: #00d4ff22;
    color: white;
  }

  .error-links {
    margin: 3rem 0;
  }

  .error-links h3 {
    color: #7c3aed;
    margin-bottom: 1rem;
    font-size: 1.4rem;
  }

  .error-links ul {
    list-style: none;
    padding: 0;
  }

  .error-links li {
    margin: 0.8rem 0;
  }

  .error-links a {
    color: #00d4ff;
    text-decoration: none;
    font-size: 1.1rem;
    transition: color 0.2s;
  }

  .error-links a:hover {
    color: #fff;
    text-decoration: underline;
  }

  .italic-note {
    font-style: italic;
    color: #aaa;
    font-size: 1.15rem;
    margin-top: 3rem;
    padding: 1.5rem;
    background: rgba(124, 58, 237, 0.1);
    border-radius: 12px;
    border-left: 4px solid #7c3aed;
  }
</style>