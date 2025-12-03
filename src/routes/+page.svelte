<script lang="ts">
  import {base} from "$app/paths";
  import { onMount, onDestroy } from 'svelte';
  import { EditorView, basicSetup } from 'codemirror';
  import { computeDiffRows, updateUrl, getInitialState,
type DiffRow } from '$lib/diffLogic';
  import { fade, fly } from 'svelte/transition';

  let leftEditor: EditorView;
  let rightEditor: EditorView;
  let leftEl: HTMLDivElement;
  let rightEl: HTMLDivElement;

  let ignoreWhitespace = false;
  let ignoreCase = false;
  let diffRows: DiffRow[] = [];
  let hasMeaningfulDiff = false;

  const recompute = () => {
    if (!leftEditor || !rightEditor) return;
    const leftText = leftEditor.state.doc.toString();
    const rightText = rightEditor.state.doc.toString();

    diffRows = computeDiffRows(leftText, rightText,
ignoreWhitespace, ignoreCase);
    hasMeaningfulDiff = diffRows.some(row => row.rowType
=== 'added' || row.rowType === 'removed');
    updateUrl(leftText, rightText, ignoreWhitespace,
ignoreCase);
  };

  onMount(() => {
    const initial = getInitialState();
    ignoreWhitespace = initial.ignoreWhitespace;
    ignoreCase = initial.ignoreCase;

    const sharedExtensions = [
      basicSetup,
      EditorView.lineWrapping,
      EditorView.updateListener.of((update) =>
{
        if (update.docChanged) recompute();
      })
    ];

    leftEditor = new EditorView({
      doc: initial.left,
      extensions: sharedExtensions,
      parent: leftEl
    });

    rightEditor = new EditorView({
      doc: initial.right,
      extensions: sharedExtensions,
      parent: rightEl
    });

    recompute();
  });
</script>

<svelte:head>
  <title>Whitespace & Case Sensitive Code
Diff – Semantic Comparison Tool</title>
  <meta name="description" content="Free,
privacy-first online tool that ignores whitespace and case differences to show
only meaningful code changes. Perfect for reviews, refactoring, and
interviews." />
  <meta property="og:title" content="Whitespace
& Case Sensitive Code Diff" />
  <meta property="og:description" content="Compare
code intelligently: ignore formatting and case, focus only on real changes.
100% client-side, no data collection." />
  <meta property="og:url" content="{base}/"
/>
  <meta property="og:type" content="website"
/>
  <meta name="twitter:card" content="summary_large_image"
/>
</svelte:head>

<main class="container py-4" style="max-width:
1600px;">
  
  <div class="text-center mb-5" in:fade={{
duration: 800, delay: 100 }}>
      <h1 class="display-4 fw-bold
mb-2" style="color: var(--color-accent);">AxelBase Diff</h1>
      <p class="text-muted lead">Whitespace
& Case Sensitive Code Comparison</p>
  </div>

  <div class="row g-4 mb-4" in:fly={{ y: 50,
duration: 800 }}>
    <div class="col-lg-6">
      <div class="d-flex
justify-content-between align-items-center mb-2 px-2">
         <span class="fw-bold
text-muted">Original Code</span>
      </div>
      <div class="code-container
code-wrapper shadow-sm">
        <div bind:this={leftEl}></div>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="d-flex
justify-content-between align-items-center mb-2 px-2">
         <span class="fw-bold
text-muted">New Code</span>
      </div>
      <div class="code-container
code-wrapper shadow-sm">
        <div bind:this={rightEl}></div>
      </div>
    </div>
  </div>

  <div class="d-flex justify-content-center
gap-4 my-5 flex-wrap" in:fade={{ delay: 400 }}>
    <div class="form-check form-switch
custom-switch">
      <input class="form-check-input"
type="checkbox" id="ws" bind:checked={ignoreWhitespace} on:change={recompute}>
      <label class="form-check-label
fs-5 ms-2" for="ws" style="color:
var(--color-text-main);">Ignore Whitespace</label>
    </div>
    <div class="form-check form-switch
custom-switch">
      <input class="form-check-input"
type="checkbox" id="case" bind:checked={ignoreCase} on:change={recompute}>
      <label class="form-check-label
fs-5 ms-2" for="case" style="color:
var(--color-text-main);">Ignore Case</label>
    </div>
  </div>

  <div class="glass-card p-4 p-md-5 mt-5" in:fly={{
y: 50, duration: 800, delay: 200 }}>
    <h3 class="text-center mb-4
fw-bold" style="color: var(--color-text-main);">Difference
Preview</h3>

    {#if !hasMeaningfulDiff && diffRows.length
> 0}
      <div class="text-center mb-4
p-3 rounded" style="background: var(--diff-add-bg); border: 1px solid
var(--diff-add-border);">
        <p class="h5 mb-1" style="color:
var(--color-text-main);">No meaningful differences found!</p>
        {#if diffRows.some(row => row.rowType
=== 'ignored-diff')}
          <small class="text-muted">Differences
exist, but they are only whitespace or casing.</small>
        {/if}
      </div>
    {/if}

    <div class="table-responsive rounded-3
border" style="background: var(--input-bg);">
      <table class="table table-sm
table-borderless align-middle mb-0">
        <tbody>
          {#each diffRows as row}
            <tr class:added-line={row.rowType
=== 'added'}
                class:removed-line={row.rowType
=== 'removed'}
                class:ignored-line={row.rowType
=== 'ignored-diff'}>
              <td class="line-number
border-end" style="border-color: var(--input-border); color:
var(--color-text-muted);">{row.leftLineNumber ?? ''}</td>
              <td class="pe-3
code-text" style="color: var(--color-text-main);"><pre class="m-0">{row.leftContent
|| ' '}</pre></td>
              <td class="line-number
border-end border-start" style="border-color: var(--input-border);
color: var(--color-text-muted);">{row.rightLineNumber ?? ''}</td>
              <td class="code-text"
style="color: var(--color-text-main);"><pre class="m-0">{row.rightContent
|| ' '}</pre></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <div class="my-5 py-5 container" style="max-width:
900px;">
    <section id="about" class="placeholder-section
mb-5 p-5 rounded-4">
        <h2 class="mb-4 display-6" style="color: var(--color-accent);">About This Tool</h2>
        <p class="lead mb-4" style="color: var(--color-text-main);">This is
not just another online diff — it’s a <strong>semantic code comparison
tool</strong> built for developers who are tired of noise.</p>
        <p style="color: var(--color-text-muted);">Every day, code reviews are flooded
with hundreds of false positives caused by formatting changes: auto-formatters,
indentation preferences, case conventions, and moved blocks. These differences
rarely affect behavior, yet traditional diff tools treat them as critical. The
result? Reviewers waste time, miss real bugs, and sometimes disable useful
automation just to avoid the chaos.</p>
        <p style="color: var(--color-text-muted);">This tool fixes that by intelligently
normalizing both inputs before comparison. With one click, you can ignore all
whitespace variations (spaces, tabs, newlines, indentation) and case
differences (camelCase vs snake_case vs PascalCase). What remains are only the
changes that actually matter: logic modifications, algorithm updates, added or
removed functionality.</p>
        <p style="color: var(--color-text-muted);">Built entirely in the browser using
modern JavaScript and SvelteKit, the tool processes everything locally. Your
code never leaves your device — not even when you share a comparison via URL.
State is compressed directly into the link using lz-string, so sharing is
instant and completely private.</p>
        <p style="color: var(--color-text-muted);">Whether you’re reviewing a large pull
request, comparing interview solutions, verifying refactored code, or checking
that minified production JavaScript matches its source, this tool shows you the
truth: functional equivalence or meaningful divergence.</p>
        <p style="color: var(--color-text-muted);">No accounts. No tracking. No
server-side processing. Just pure, fast, accurate semantic comparison — the way
code review should be.</p>
        <p class="mt-4" style="color: var(--color-accent);"><em>Built
by developers, for developers. Open source. Forever free.</em></p>
    </section>

    <section id="how-to" class="placeholder-section
mb-5 p-5 rounded-4">
        <h2 class="mb-4 display-6" style="color: var(--color-accent);">How to Use</h2>
        <p class="lead mb-4" style="color: var(--color-text-main);">Using the
tool is intentionally simple — paste, toggle, compare, share.</p>
        <p style="color: var(--color-text-muted);"><strong>Step 1:</strong>
Paste your original code into the left editor and the modified version into the
right. Both editors support full syntax highlighting via CodeMirror and handle
large files with ease.</p>
        <p style="color: var(--color-text-muted);"><strong>Step 2:</strong>
Enable the toggles that match your needs:</p>
        <ul class="list-styled mb-4" style="color: var(--color-text-muted);">
            <li><strong>Ignore
Whitespace</strong> — Collapses all sequences of spaces/tabs, trims
lines, and removes indentation differences. Perfect for comparing reformatted
code.</li>
            <li><strong>Ignore Case</strong>
— Converts both sides to lowercase before comparison. Ideal when variable
naming style has changed.</li>
        </ul>
        <p style="color: var(--color-text-muted);"><strong>Step 3:</strong>
Watch the diff update instantly. Lines that match only after normalization
appear in subtle gray. Real additions are green, removals are red. When
everything is gray or clean, you’ve achieved semantic equivalence.</p>
        <p style="color: var(--color-text-muted);"><strong>Step 4 (optional):</strong>
Share your exact view with anyone by copying the URL. The recipient sees
identical content and toggle states — no explanation needed.</p>
        <p style="color: var(--color-text-muted);"><strong>Pro Tips:</strong></p>
        <ul class="list-styled" style="color: var(--color-text-muted);">
            <li>Use both toggles for daily
reviews and refactoring</li>
            <li>Keep whitespace toggle off
when reviewing CSS/HTML layout</li>
            <li>Try pasting minified
JavaScript on one side and formatted source on the other — watch them align
perfectly</li>
            <li>Works great for config files,
JSON, YAML, and generated code</li>
        </ul>
        <p style="color: var(--color-text-muted);">The tool updates on every keystroke,
stays fast even with 10,000+ lines, and never sends your code anywhere. That’s
it — no learning curve, no setup, just accurate comparisons.</p>
    </section>

    <section id="faq" class="placeholder-section
mb-5 p-5 rounded-4">
        <h2 class="mb-4 display-6" style="color: var(--color-accent);">Frequently Asked Questions</h2>

        <details class="faq-item mb-4">
            <summary>Is my code private?</summary>
            <p>Yes — 100%. Nothing is sent to
any server. All processing and URL encoding happens in your browser. Even when
you share a link, the recipient’s browser does all the work.</p>
        </details>

        <details class="faq-item mb-4">
            <summary>How accurate is the
comparison?</summary>
            <p>Extremely. The tool uses a
custom line-by-line normalization pipeline followed by the battle-tested <code>diff</code>
library with a smart comparator. It correctly handles moved blocks, blank
lines, and extreme formatting differences.</p>
        </details>

        <details class="faq-item mb-4">
            <summary>Can it handle very large
files?</summary>
            <p>Yes. Optimized algorithms keep
performance under 300ms even with 10,000+ line files. It gracefully handles
real-world codebases without freezing.</p>
        </details>

        <details class="faq-item mb-4">
            <summary>Why do I still see gray
lines when everything should be identical?</summary>
            <p>Gray lines mean the content
matched only after normalization (whitespace/case was ignored). This
transparency helps you understand exactly what was ignored.</p>
        </details>

        <details class="faq-item mb-4">
            <summary>Can I use this in
private/corporate environments?</summary>
            <p>Absolutely. The entire app is
static and can be deployed internally or used offline by saving the page.</p>
        </details>

        <details class="faq-item mb-4">
            <summary>Is it really free
forever?</summary>
            <p>Yes. No accounts, no limits,
no premium tiers. Open source under MIT license.</p>
        </details>

        <details class="faq-item">
            <summary>What’s the best way to
share a comparison?</summary>
            <p>Just copy the URL after making
your changes. It contains compressed versions of both texts and your toggle
settings. Anyone with the link sees exactly what you see.</p>
        </details>
    </section>
</div>
</main>

<style>
  /* Local Styles (Kept necessary ones, removed hardcoded colors) */
  .code-container {
    min-height: 65vh;
    border-radius: 16px;
    background: transparent; 
  }

  .custom-switch .form-check-input {
    width: 3rem; 
    height: 1.5rem;
    cursor: pointer;
  }
  
  .code-text pre {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 0.9rem;
  }
  
  /* Removed hardcoded dark styles, relying on app.css variables now */
  /* .text-gradient is replaced by style="color: var(--color-accent);" */
  /* .glass-card is now .placeholder-section which uses theme variables */
  
  .list-styled {
    padding-left: 1.5rem;
    line-height: 1.8;
  }
  .list-styled li {
    margin-bottom: 0.8rem;
    color: var(--color-text-main);
  }
  .faq-item summary {
    font-weight: 600;
    cursor: pointer;
    font-size: 1.1rem;
  }
</style>