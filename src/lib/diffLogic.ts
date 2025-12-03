// src/lib/diffLogic.ts  ← ULTIMATE FIX: Named ESM imports for diff v8.0.2 (Dec 2025)

import lz from 'lz-string';
const { compressToEncodedURIComponent, decompressFromEncodedURIComponent } = lz;

import { base } from '$app/paths';

// CORRECT ESM named import for diff v8.0.2 (as per official docs)
import { diffArrays } from 'diff';

export type RowType = 'common' | 'ignored-diff' | 'added' | 'removed';

export interface DiffRow {
  leftContent: string;
  rightContent: string;
  leftLineNumber?: number;
  rightLineNumber?: number;
  rowType: RowType;
}

function safeNormalize(line: string, ignoreWhitespace: boolean, ignoreCase: boolean): string {
  try {
    let n = line ?? '';
    if (ignoreCase) n = n.toLowerCase();
    if (ignoreWhitespace) n = n.replace(/\s+/g, ' ').trim();
    return n;
  } catch (e) {
    console.error('Normalization error:', e);
    return '';
  }
}

export function computeDiffRows(
  leftText = '',
  rightText = '',
  ignoreWhitespace = false,
  ignoreCase = false
): DiffRow[] {
  const rows: DiffRow[] = [];

  try {
    const leftLines = (leftText || '').split('\n');
    const rightLines = (rightText || '').split('\n');

    interface LineInfo { orig: string; norm: string }

    const leftInfo: LineInfo[] = leftLines.map(l => ({
      orig: l,
      norm: safeNormalize(l, ignoreWhitespace, ignoreCase)
    }));

    const rightInfo: LineInfo[] = rightLines.map(l => ({
      orig: l,
      norm: safeNormalize(l, ignoreWhitespace, ignoreCase)
    }));

    const parts = diffArrays(leftInfo, rightInfo, {
      comparator: (a: LineInfo, b: LineInfo) => a.norm === b.norm
    });

    let leftIdx = 0;
    let rightIdx = 0;
    let leftNo = 1;
    let rightNo = 1;

    for (const part of parts) {
      const lines = part.value;
      const len = lines.length;

      if (part.added) {
        for (let i = 0; i < len; i++) {
          const line = rightInfo[rightIdx++];
          rows.push({
            leftContent: '',
            rightContent: line.orig,
            rightLineNumber: rightNo++,
            rowType: 'added'
          });
        }
      } else if (part.removed) {
        for (let i = 0; i < len; i++) {
          const line = leftInfo[leftIdx++];
          rows.push({
            leftContent: line.orig,
            rightContent: '',
            leftLineNumber: leftNo++,
            rowType: 'removed'
          });
        }
      } else {
        for (let i = 0; i < len; i++) {
          const l = leftInfo[leftIdx];
          const r = rightInfo[rightIdx];
          const ignoredDiff = l.orig !== r.orig;

          rows.push({
            leftContent: l.orig,
            rightContent: r.orig,
            leftLineNumber: leftNo++,
            rightLineNumber: rightNo++,
            rowType: ignoredDiff ? 'ignored-diff' : 'common'
          });

          leftIdx++;
          rightIdx++;
        }
      }
    }
  } catch (err) {
    console.error('computeDiffRows failed:', err);
    rows.length = 0;
    rows.push({
      leftContent: 'DIFF ERROR – check console',
      rightContent: '',
      rowType: 'removed'
    });
  }

  return rows;
}

export function getUrlParamsString(
  left: string,
  right: string,
  ignoreWhitespace: boolean,
  ignoreCase: boolean
): string {
  try {
    const params = new URLSearchParams();
    if (left) params.set('l', compressToEncodedURIComponent(left));
    if (right) params.set('r', compressToEncodedURIComponent(right));
    params.set('w', ignoreWhitespace ? '1' : '0');
    params.set('c', ignoreCase ? '1' : '0');
    return params.toString();
  } catch (e) {
    console.error('URL encoding failed:', e);
    return '';
  }
}

export function updateUrl(
  left: string,
  right: string,
  ignoreWhitespace: boolean,
  ignoreCase: boolean
): void {
  try {
    const paramStr = getUrlParamsString(left, right, ignoreWhitespace, ignoreCase);
    const separator = paramStr ? '?' : '';
    window.history.replaceState(null, '', `${base}${separator}${paramStr}`);
  } catch (e) {
    console.error('updateUrl failed:', e);
  }
}

export function getInitialState(): {
  left: string;
  right: string;
  ignoreWhitespace: boolean;
  ignoreCase: boolean;
} {
  try {
    const params = new URLSearchParams(location.search);
    const l = params.get('l');
    const r = params.get('r');

    const left = l ? decompressFromEncodedURIComponent(l) ?? '' : '';
    const right = r ? decompressFromEncodedURIComponent(r) ?? '' : '';

    return {
      left,
      right,
      ignoreWhitespace: params.get('w') === '1',
      ignoreCase: params.get('c') === '1'
    };
  } catch (e) {
    console.error('Failed to parse URL state:', e);
    return { left: '', right: '', ignoreWhitespace: false, ignoreCase: false };
  }
}