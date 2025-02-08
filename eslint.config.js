import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kwvhrgczwgtrkbyivxxf.supabase.co'
const supabaseKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3dmhyZ2N6d2d0cmtieWl2eHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5MjE2NTYsImV4cCI6MjA1MzQ5NzY1Nn0.kqPW9KAl-jtKky8DHwd6sjEs9Ca4I-e9LPgXC6BrLCo
const supabase = createClient(supabaseUrl, supabaseKey)
export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);
