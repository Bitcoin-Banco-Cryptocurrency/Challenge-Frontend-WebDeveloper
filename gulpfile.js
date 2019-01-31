const {src, dest, series} = require('gulp');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const htmlReplace = require('gulp-html-replace');


// gulp.start('concatenar-js', 'concatenar-css', 'substituir-html');

/**
 * Copia todos os arquivos da pasta src para a pasta dist
 */
const copiar = () => {
    return src('src/**/*')
        .pipe(dest('dist'));
};


/**
 * Limpa a pasta dist
 */
const limpar = () => {
    return src('dist')
        .pipe(clean());
};


/**
 * Limpa a pasta dist Js
 */
const cleanJs = () => {
    return src('dist/assets/js')
        .pipe(clean());
};


/**
 * Concatenação e minificação de arquivos JS
 */
const js = () => {
    return src('src/assets/js/*.js')
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(dest('dist/assets/js'));
};


/**
 * Limpa a pasta dist css
 */
const cleanCss = () => {
    return src('dist/assets/css')
        .pipe(clean());
};

/**
 * Concatenação de arquivos css
 */
const concatenarCss = () => {
    return src([
            'src/assets/css/normalize.css',
            'src/assets/css/styles.css',
        ])
        .pipe(concat('all.min.css'))
        .pipe(cssmin())
        .pipe(dest('dist/assets/css'));
};


/**
 * Substitui o espaço selecionado pelas tags de comentários
 * usa os comentários
 * <!-- build:js -->
 * JSs
 * <!-- endbuild -->
 */
const substituirHtml = () => {
    return src('dist/**/*.html')
        .pipe(htmlReplace({
            js: 'assets/js/all.min.js',
            css: 'assets/css/all.min.css'
        }))
        .pipe(dest('dist'));
};

exports.default = series(limpar, copiar, cleanJs, js, cleanCss, concatenarCss, substituirHtml);