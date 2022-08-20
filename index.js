import { unified } from 'unified'
import { reporter } from 'vfile-reporter'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import rehypeSlug from 'rehype-slug'
import remarkPresetLintConsistent from 'remark-preset-lint-consistent'
import remarkPresetLintRecommended from 'remark-preset-lint-recommended'
import rehypeHighlight from 'rehype-highlight'
import fs from 'fs'
import remarkCallouts, { calloutHastHandlers } from './remark-callouts.js'
// const util = require('util');
import util from 'util'

// https://github.com/JS-DevTools/rehype-toc

main()


async function main() {
  let printTree = () => (tree, vfile) => console.log(util.inspect(tree, {showHidden: false, depth: null, colors: true}));
  const file = await unified()
    .data('settings', {fragment: true})
    .use(remarkPresetLintConsistent)
    .use(remarkPresetLintRecommended)
    .use(remarkCallouts)
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(printTree)
    .use(remarkRehype, calloutHastHandlers)
    .use(rehypeSlug)
    // .use(rehypeSanitize)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    // .process(fs.readFileSync('web/web-follow-along.md'));
    .process(fs.readFileSync('web/web-fr.md'));
    // .process(fs.readFileSync('web/old.md'));
//     .process('\
// > [!tldr] Text\n\
// >\n\
// > Foo\n\
// ');
    // .process('> [!tldr] *Foo*\n');
    // .process('> [!tldr] d*e*\n>\n> e');

  fs.writeFileSync("index.html", "<!DOCTYPE html>\n<link href=\"index.css\" rel=\"stylesheet\">\n<link href=\"https://fonts.googleapis.com/icon?family=Material+Icons+Outlined\" rel=\"stylesheet\">\n" + String(file))
  // console.log(String(file));
  console.error(reporter(file));
}