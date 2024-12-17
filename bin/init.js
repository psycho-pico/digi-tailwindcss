#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

console.log('Initializing digi-tailwindcss...');

// Path untuk file konfigurasi
const tailwindConfigPath = path.join(process.cwd(), 'tailwind.config.js');
const postcssConfigPath = path.join(process.cwd(), 'postcss.config.js');

// 1. Install dependencies jika belum ada
console.log('Installing dependencies: tailwindcss...');

// 2. Deteksi apakah postcss dan autoprefixer sudah terpasang
const isPostCssInstalled = (() => {
    try {
        require.resolve('postcss');
        return true;
    } catch (e) {
        return false;
    }
})();

const isAutoprefixerInstalled = (() => {
    try {
        require.resolve('autoprefixer');
        return true;
    } catch (e) {
        return false;
    }
})();

// 3. Buat file konfigurasi berdasarkan dependensi yang terpasang

// Buat tailwind.config.js
if (fs.existsSync(tailwindConfigPath)) {
    console.log('tailwind.config.js already exists!');
} else {
    fs.writeFileSync(
        tailwindConfigPath,
`/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html, js, ts, jsx, tsx, vue}"],
    theme: {
        extend: {},
    },
    plugins: [],
};`
    );
    console.log('tailwind.config.js created!');
}

// Buat postcss.config.js jika postcss dan autoprefixer terpasang
if (isPostCssInstalled && isAutoprefixerInstalled) {
    if (fs.existsSync(postcssConfigPath)) {
        console.log('postcss.config.js already exists!');
    } else {
        fs.writeFileSync(
            postcssConfigPath,
`module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
};`
        );
        console.log('postcss.config.js created!');
    }
} else if (isPostCssInstalled || isAutoprefixerInstalled) {
    console.log('PostCSS or Autoprefixer missing. Skipping postcss.config.js creation.');
}

console.log('Initialization complete!');
