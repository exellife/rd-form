import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
const peerDepsExternal = require('rollup-plugin-peer-deps-external');



const plugin = [
    peerDepsExternal(),
    nodeResolve({
        browser: true,
        extenstions: ['.js', '.jsx'],
    }),
    babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        plugins: [],
    }),
    // terser(),
];

const plugin_1 = [
    peerDepsExternal(),
    nodeResolve({
        browser: true,
        extenstions: ['.js', '.jsx'],
    }),
    babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        plugins: [],
    }),
];

export default [
    {
        input: 'src/index.js',
        cache: false,
        plugins: plugin,
        // external: ['React'],
        output: {
            file: 'dev/umd/react-dynamic-form.js',
            format: 'umd',
            name: 'ReactDynamicForm',
            globals: {
                React: 'React',
            },
        },
        watch: {
            include: [
                'src/**/*.[tj]s?(x)',
                '!src/__trash/**/*.[tj]s?(x)',
            ],
        }
    },
    {
        input: 'src/index.js',
        cache: false,
        plugins: plugin,
        // external: ['React'],
        output: {
            file: 'dev/cjs/react-dynamic-form.js',
            format: 'cjs',
            globals: {
                React: 'React',
            },
        },
        watch: {
            include: [
                'src/**/*.[tj]s?(x)',
                '!src/__trash/**/*.[tj]s?(x)',
            ],
        }
    },
    {
        input: 'src/dev.jsx',
        cache: false,
        plugins: plugin_1,
        external: ['React', 'ReactDynamicForm'],
        output: {
            file: 'dev/umd/dev.js',
            format: 'umd',
            name: 'dev',
            globals: {
                React: 'React',
                ReactDynamicForm: 'ReactDynamicForm',
            },
        },
        watch: {
            include: [
                'src/static/**/*.[tj]s?(x)',
                '!src/static/__trash/**/*.[tj]s?(x)',
            ],
        }
    },
]