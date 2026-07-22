import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getTopicCategoryPath } from '../utils/categoryMapper';

describe('categoryMapper', () => {
  let consoleWarnSpy;

  beforeEach(() => {
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  it('should return correct path for number system basics', () => {
    expect(getTopicCategoryPath('number-system-basics')).toBe('quantitative-aptitude/number-systems');
  });

  it('should return correct path for arithmetic category', () => {
    expect(getTopicCategoryPath('percentages')).toBe('quantitative-aptitude/arithmetic');
    expect(getTopicCategoryPath('profit-loss')).toBe('quantitative-aptitude/arithmetic');
  });

  it('should handle aliases correctly', () => {
    const canonicalPath = getTopicCategoryPath('time-work');
    const aliasPath = getTopicCategoryPath('time-and-work');
    expect(canonicalPath).toBe('quantitative-aptitude/work-and-motion');
    expect(aliasPath).toBe(canonicalPath);
  });

  it('should return correct path for logical reasoning and verbal categories', () => {
    expect(getTopicCategoryPath('blood-relations')).toBe('logical-reasoning/logical-relations');
    expect(getTopicCategoryPath('reading-comprehension')).toBe('verbal-ability/reading-comprehension');
    expect(getTopicCategoryPath('syllogism')).toBe('logical-reasoning/analytical-reasoning');
  });

  it('should fallback and emit console warning for unknown slugs', () => {
    const fallbackPath = getTopicCategoryPath('invalid-slug-xyz');
    expect(fallbackPath).toBe('quantitative-aptitude/miscellaneous');
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('[categoryMapper] No mapping found for slug: "invalid-slug-xyz"')
    );
  });
});
