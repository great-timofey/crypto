const fs = require('fs');
const fetch = require('node-fetch');

const branch = process.argv[2];
const schemaPath = './src/services/schema.ts';
const comment = `This file was generated automatically by the "npm run get-schema ${branch}"`;

const domain = branch ? `api-${branch}.narfex.dev` : `api.narfex.com`;
console.log(`\x1b[36m Get schema from ${domain}\x1b[0m`);
fetch(`https://${domain}/api/v1/documentation/schema`)
  .then((res) => res.json())
  .then((schema) => {
    console.log(`\x1b[32m Success! path: \x1b[37m${schemaPath}\x1b[0m`);
    const content = `// ${comment} \n export default ${JSON.stringify(
      schema,
      null,
      2,
    )}`;
    fs.writeFileSync(schemaPath, content);
  })
  .catch((err) => {
    console.log(`\x1b[31m Error: ${err.type}\x1b[0m`);
  });
