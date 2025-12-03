<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>How Whitespace & Case Normalization Works Internally | Blog</title>
  <meta name="description" content="Deep dive into the exact algorithm that powers semantic code comparison by intelligently ignoring whitespace and case differences." />
  <meta property="og:title" content="How Whitespace & Case Normalization Works Internally | Blog" />
  <meta property="og:description" content="Understand the step-by-step process of line normalization and comparison that makes formatting changes disappear from diffs." />
  <meta property="og:url" content="{base}/blog/posts/post2" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>How Whitespace & Case Normalization Works Internally</p>
  </div>
  
  <article class="prose">
    <h1>How Whitespace & Case Normalization Works Internally</h1>
    <p class="post-meta">Published: December 4, 2025</p>

    <p>At first glance, ignoring whitespace and case differences seems simple. But achieving accurate, reliable semantic comparison requires careful processing at multiple levels. Here's exactly how it works inside the tool.</p>

    <p>The process begins the moment you paste code into either editor. Every change triggers an immediate recomputation using a highly optimized algorithm that runs entirely in your browser.</p>

    <h2>Step 1: Line-by-Line Processing</h2>
    <p>First, both code inputs are split into individual lines. This preserves line number alignment while allowing independent processing of each line's content.</p>

    <h2>Step 2: Normalization Pipeline</h2>
    <p>Each line goes through a two-stage normalization process. When "Ignore Case" is enabled, the entire line is converted to lowercase. This ensures that "UserID" and "userid" are treated as identical.</p>

    <p>When "Ignore Whitespace" is enabled, all sequences of whitespace characters — spaces, tabs, multiple spaces — are collapsed into single spaces. Leading and trailing whitespace is completely removed. This means four spaces of indentation become identical to one tab, which becomes identical to eight spaces.</p>

    <h2>Step 3: Smart Array Comparison</h2>
    <p>After normalization, we have two arrays: one containing the processed lines from the left input, another from the right. These arrays are compared using a custom comparator that checks for exact string equality after normalization.</p>

    <p>The comparison algorithm identifies which lines are common, which were added, and which were removed. Importantly, lines that differ only in their original formatting but match after normalization are marked as common with a subtle gray highlight to show they were processed.</p>

    <h2>Step 4: Visual Presentation</h2>
    <p>The final output preserves original line numbers and exact original content for display, while using the normalized comparison for determining changes. This means you see the actual code as written, but only meaningful differences are highlighted in red or green.</p>

    <p>Lines that required normalization to match appear with a gray background, providing transparency about what was ignored without distracting from real changes.</p>

    <h2>Why This Approach Works</h2>
    <p>Unlike regex-based solutions that can misfire on complex code, this method is predictable and reliable. It handles edge cases like empty lines, trailing whitespace, and mixed indentation perfectly.</p>

    <p>The entire process completes in milliseconds even with thousands of lines because it avoids expensive character-by-character diffing when normalization makes lines identical.</p>

    <p class="italic-note">This foundation enables all the advanced use cases we'll explore in future posts.</p>
  </article>
</div>

<style>
  /* Use the reusable styles below for all blog posts */
  .post-layout { 
    max-width: 800px; 
    padding: 2rem 1rem 4rem;
    margin: 0 auto;
    color: var(--color-text-main); /* Ensure main body content is themed */
  }

  .breadcrumbs { 
    display: flex; 
    align-items: center; 
    gap: 0.5rem; 
    margin-bottom: 1.5rem; 
    font-size: 0.9rem; 
    color: var(--color-text-muted); /* Muted for subtle text */
  }

  .breadcrumbs a { 
    color: var(--color-accent); /* Accent for links */
    text-decoration: none;
  }

  .breadcrumbs a:hover { 
    text-decoration: underline; 
  }

  .prose { 
    line-height: 1.8; 
  }

  .prose .post-meta { 
    color: var(--color-text-muted); 
    font-size: 0.9rem; 
    margin-bottom: 2rem; 
    border-bottom: 1px solid var(--input-border); /* Subtle separator */
    padding-bottom: 1rem; 
  }

  .prose h1 { 
    font-size: 2.5rem; 
    margin-bottom: 0.5rem;
    color: var(--color-text-main); /* Main text color */
  }

  .prose h2 { 
    margin-top: 2.5rem; 
    font-size: 1.8rem; 
    color: var(--color-accent); /* Accent color for subheadings */
    border-bottom: 1px solid var(--input-border); /* Subtle separator */
    padding-bottom: 0.5rem; 
  }

  .prose p { 
    color: var(--color-text-main); 
    margin-bottom: 1.2rem; 
  }

  .prose .italic-note { 
    font-style: italic; 
    color: var(--color-text-muted); 
    text-align: center; 
    margin-top: 3rem; 
    font-size: 1.1rem; 
  }
</style>