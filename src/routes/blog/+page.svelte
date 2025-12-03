<script lang="ts">
  import { base } from '$app/paths';
  
  const posts = [
    {
      href: '/blog/posts/post1',
      title: 'Why Most Online Diff Tools Fail Code Reviews',
      description: 'Discover why standard diff tools create noise by highlighting whitespace and case differences — and how true semantic comparison solves this problem.'
    },
    {
      href: '/blog/posts/post2',
      title: 'How Whitespace & Case Normalization Works Internally',
      description: 'A deep dive into line-by-line normalization, regex-free whitespace collapsing, and case-insensitive array diffing using modern JavaScript algorithms.'
    },
    {
      href: '/blog/posts/post3',
      title: 'Line Alignment in Real-World Refactoring Scenarios',
      description: 'See how the tool correctly aligns moved blocks, handles blank lines, and preserves context even when indentation is completely different.'
    },
    {
      href: '/blog/posts/post4',
      title: 'Sharing Diffs Without Sending Code to Servers',
      description: 'Learn how URL state encoding with lz-string compression enables fully private, instant, shareable comparisons — 100% client-side.'
    },
    {
      href: '/blog/posts/post5',
      title: 'When to Use (and Not Use) Ignore Whitespace + Case',
      description: 'Best practices: code reviews, interview comparisons, config files, generated code, and edge cases where you actually want to see formatting changes.'
    },
    {
      href: '/blog/posts/post6',
      title: 'Performance with 10,000+ Line Files',
      description: 'How the tool stays under 300ms even with large inputs using efficient diff arrays, bounded computation, and zero reflow triggers.'
    },
    {
      href: '/blog/posts/post7',
      title: 'Comparing Minified vs Pretty-Printed JavaScript',
      description: 'The ultimate test: paste minified code on one side and formatted code on the other — watch the tool prove they are functionally identical.'
    }
  ];
</script>
 
<svelte:head>
  <title>Blog | Whitespace & Case Sensitive Code Diff</title>
  <meta name="description" content="Technical deep dives, best practices, and real-world use cases for the privacy-first online code diff tool that ignores whitespace and case." />
</svelte:head>
 
<div class="container fade-in blog-index py-5">
  <header class="blog-header text-center mb-5">
    <h1>Blog: Semantic Code Diff Insights</h1>
    <p class="subtitle">
      Technical articles, performance analysis, and practical guides for developers who need accurate, noise-free
      code comparisons.
      All content is generated from real-world usage of the <strong>Whitespace & Case Sensitive Code Diff</strong>
      tool.
    </p>
  </header>
  
  <div class="posts-grid">
    {#each posts as post}
      <a href="{base}{post.href}"
         class="card post-card h-100 text-decoration-none border-0 shadow-sm">
        <div class="card-body d-flex flex-column">
          <h2 class="post-title mb-3">{post.title}</h2>
          <p class="post-description flex-grow-1">{post.description}</p>
          <span class="read-more mt-3 fw-semibold">Read Article</span>
        </div>
      </a>
    {/each}
  </div>
</div>
 
<style>

  .blog-index {
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .blog-header h1 {
    font-size: 3rem;
    font-weight: 700;
    background: linear-gradient(90deg, #00d4ff, #7c3aed);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .subtitle {
    font-size: 1.15rem;
    max-width: 800px;
    margin: 1.5rem auto 0;
    line-height: 1.7;
    /* Use muted text variable for subtitle */
    color: var(--color-text-muted); 
  }
  
  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 2rem;
  }
  
  .post-card {
    /* **CONTRAST FIX:** Use theme variable for background */
    background: var(--card-background); 
    border-radius: 12px;
    transition: all 0.3s ease;
    /* Optional: Use a slightly less opaque shadow */
    box-shadow: 0 4px 12px var(--shadow-color-base); 
  }
  
  .post-card:hover {
    transform: translateY(-8px);
    /* Enhancing hover shadow for dark mode compatibility */
    box-shadow: 0 16px 30px var(--shadow-color-hover); 
  }
  
  .post-title {
    font-size: 1.35rem;
    font-weight: 600;
    line-height: 1.3;
    /* **CONTRAST FIX:** Use main text color */
    color: var(--color-text-main); 
  }
  
  .post-description {
    font-size: 0.95rem;
    line-height: 1.6;
    /* **CONTRAST FIX:** Use muted text color */
    color: var(--color-text-muted); 
  }
  
  .read-more {
    /* **CONTRAST FIX:** Use accent color for "Read Article" */
    color: var(--color-accent); 
    opacity: 0.9;
    transition: all 0.2s ease;
  }
  
  .post-card:hover .read-more {
    opacity: 1;
    transform: translateX(8px);
  }
</style>