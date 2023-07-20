import { src, dest, parallel } from 'gulp';

const manifest = () => {
  return src('./manifest.json')
    .pipe(dest('./dist/'));
};
exports.manifest = manifest;

const content_scripts_css = () => {
  return src('./src/content_scripts/css/*.css')
    .pipe(dest('./dist/content_scripts/css/'));
};
exports.content_scripts_css = content_scripts_css;

const icon = () => {
  return src('./icon.png')
    .pipe(dest('./dist/'));
};
exports.icon = icon;

exports.default = parallel(manifest, content_scripts_css, icon);
