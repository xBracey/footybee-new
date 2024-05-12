"use strict";

const { pascalCase } = require("change-case");
const fs = require("fs/promises");
const _ = require("lodash");
const path = require("path");
const _template = _.template;
const base = path.resolve(__dirname, "../");
const iconsDir = path.join(path.resolve(__dirname, "./"), "svgs");
const iconsBase = path.join(base, "src", "/components/Icons");
const iconsFile = path.join(iconsBase, "/Icons.tsx");

const iconsTemplateFn = _template(`
// This file is generated. Do not edit this file!

export type IconProps = {
  className?: string
}
<% componentNames.forEach(component => { %>const <%= component %> = (props: IconProps) => (<%= icons[component].content.replace(/\\n\\s+/g, \" \") %>)
<% }) %>

export {
  <% componentNames.forEach(component => { %><%= component %>, <% }) %>
}
`);

const processFile = (file, data) =>
  new Promise((resolve, reject) => {
    file = path.join(iconsDir, file);
    if (path.extname(file) !== ".svg") {
      resolve();
      return;
    }
    const name = pascalCase(path.basename(file, ".svg"));
    const componentName = `${name}`;

    fs.readFile(file, "utf8")
      .then((svg) => {
        const content = svg
          .replace(
            /<svg/i,
            '<svg {...props} className={`fill-current ${props.className}`} aria-hidden="true"'
          )
          .replace(/>\s+</g, "><")
          .replace(/stroke="#([0-9a-fA-F]*)"/g, 'stroke="currentColor"')
          .replace(/fill="#([0-9a-fA-F]*)"/g, 'fill="currentColor"')
          .replace(/ clip-path/g, " clipPath")
          .replace(/-rule/g, "Rule")
          .replace(/fill-opacity/g, "fillOpacity")
          .replace(/stroke-width/g, "strokeWidth")
          .replace(/enable-background/g, "enableBackground")
          .trim();
        data.icons[componentName] = { name, content };
        data.componentNames.push(componentName);
        resolve();
      })
      .catch((error) => reject(error));
  });

const main = async () => {
  const today = new Date();
  const data = {
    version: 1,
    created: today.toISOString(),
    componentNames: [],
    icons: {},
  };

  const files = await fs.readdir(iconsDir);

  await Promise.all(files.map((file) => processFile(file, data)));

  data.componentNames.sort();

  await fs.writeFile(iconsFile, iconsTemplateFn(data), "utf8");

  console.log(`Wrote to ${iconsFile}`);
};

main();
