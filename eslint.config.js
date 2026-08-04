import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Ignore generated/build directories and coverage
  globalIgnores(['dist', 'coverage']),

  // ── Node.js scripts (generators, importers, etc.) ──────────────────────────
  {
    files: ['scripts/**/*.{js,cjs,mjs}', 'src/scripts/**/*.{js,cjs,mjs}'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },

  // ── Main source files ───────────────────────────────────────────────────────
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        // Google Identity Services (GIS) loaded via CDN script tag
        google: 'readonly',
      },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // ── react-hooks v5 strict rules ─────────────────────────────────────────
      // These fire on valid, idiomatic patterns (reset state at top of effect,
      // calling a fetch function inside an effect, etc.). Downgrade to warn so
      // CI is not blocked; address them incrementally.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
      // Math.random() in render is intentional for confetti/animation effects
      'react-hooks/purity': 'warn',

      // ── react-refresh ───────────────────────────────────────────────────────
      // Allow files that export both components and non-component helpers
      // (e.g. AuthContext exports the context value + the Provider component).
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // ── unused vars ─────────────────────────────────────────────────────────
      // Prefix unused variables/args with _ to suppress the error.
      'no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    },
  },

  // ── Test files ──────────────────────────────────────────────────────────────
  {
    files: ['src/tests/**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // React import is not needed with the new JSX transform
      'no-unused-vars': ['error', { varsIgnorePattern: '^(React|_)', argsIgnorePattern: '^_' }],
    },
  },
])
