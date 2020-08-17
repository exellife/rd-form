const nodeResolve = require('@rollup/plugin-node-resolve').nodeResolve;
const babel = require('@rollup/plugin-babel').babel;
const terser = require('rollup-plugin-terser').terser;
const rollup = require('rollup');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');


const plugin_minify = [
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
    terser(),
];

const plugin_ = [
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

const inputOptions = [
    {
        input: 'src/index.js',
        plugins: plugin_minify,
        // external: ['React'],
    },
    {
        input: 'src/index.js',
        plugins: plugin_,
        // external: ['React'],
    },
    {
        input: 'src/index.js',
        plugins: plugin_minify,
        // external: ['React'],
    },
    {
        input: 'src/index.js',
        plugins: plugin_,
        // external: ['React'],
    },
];

const outputOptions = [
    {
        file: 'dist/umd/rdform.min.js',
        format: 'umd',
        name: 'ReactDynamicForm',
        globals: { react: 'React' }
    },
    {
        file: 'dist/umd/rdform.js',
        format: 'umd',
        name: 'ReactDynamicForm',
        globals: { react: 'React' },
    },
    {
        file: 'dist/cjs/rdform.min.js',
        format: 'cjs',
        globals: { react: 'React' },
    },
    {
        file: 'dist/cjs/rdform.js',
        format: 'cjs',
        globals: { react: 'React' },
    },
]

async function build() {
    for (let i = 0; i < 4; i++) {
        const bundle_min = await rollup.rollup(inputOptions[i]);
        await bundle_min.generate(outputOptions[i]);
        await bundle_min.write(outputOptions[i]);
    }
}

build();