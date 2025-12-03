<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Line Alignment in Real-World Refactoring Scenarios | Blog</title>
  <meta name="description" content="See how semantic code diff maintains perfect line alignment even when entire blocks move or indentation changes completely during refactoring." />
  <meta property="og:title" content="Line Alignment in Real-World Refactoring Scenarios | Blog" />
  <meta property="og:description" content="Discover how intelligent normalization keeps context intact when comparing heavily refactored code with different formatting." />
  <meta property="og:url" content="{base}/blog/posts/post3" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>Line Alignment in Real-World Refactoring Scenarios</p>
  </div>
  
  <article class="prose">
    <h1>Line Alignment in Real-World Refactoring Scenarios</h1>
    <p class="post-meta">Published: December 5, 2025</p>

    <p>One of the most impressive capabilities of semantic code comparison becomes apparent during major refactoring. When developers restructure code, move functions, extract methods, or completely change formatting, traditional diff tools lose all context. Our tool maintains perfect alignment.</p>

    <p>Consider a common scenario: a developer extracts a complex validation function from within another method. The original code has the validation logic inline with deep indentation. The refactored version moves it to a separate function at the module level with clean formatting.</p>

    <h2>How Traditional Tools Fail</h2>
    <p>Standard diff tools see the original indented block disappear and a new unindented block appear elsewhere. They treat this as a massive deletion followed by an addition, even though the logic is identical. Reviewers must mentally connect these changes, wasting time and increasing error risk.</p>

    <h2>How Semantic Comparison Succeeds</h2>
    <p>With whitespace and case normalization enabled, both versions of the validation logic become identical strings after processing. The tool recognizes them as the same content regardless of location or formatting. The moved block appears with gray highlighting indicating it was normalized to match, maintaining perfect visual alignment.</p>

    <p>Line numbers adjust appropriately: the original location shows the lines as removed only if the content actually changed, while the new location shows them as added only if they differ semantically. When the code is truly identical, no red or green highlighting appears at all.</p>

    <h2>Real-World Examples That Work Perfectly</h2>
    <p>This capability shines in several common scenarios. When converting class components to functional components in React, the visual structure changes dramatically but the core logic often remains identical. Semantic comparison shows only the actual changes like added hooks or removed lifecycle methods.</p>

    <p>During large-scale indentation standardization, teams can finally enforce consistent formatting without creating diff nightmares. The tool shows the formatting standardization as gray lines while highlighting only genuine logic modifications.</p>

    <p>Even extreme cases work: comparing minified production code against pretty-printed source code results in near-perfect matching when both toggles are enabled, proving functional equivalence instantly.</p>

    <h2>The Result: Faster, More Accurate Reviews</h2>
    <p>Reviewers see the forest instead of the trees. They focus immediately on architectural improvements, algorithm changes, and bug fixes rather than getting lost in formatting noise. Development velocity increases while code quality improves.</p>

    <p class="italic-note">This is just the beginning of what truly intelligent code comparison can achieve.</p>
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