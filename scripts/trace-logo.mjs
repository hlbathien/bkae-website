import fs from 'fs';
import path from 'path';
import potrace from 'potrace';

// Command: node scripts/trace-logo.mjs
// Traces logo.png to public/logo.svg

const inputPath = path.join(process.cwd(), 'logo.png');
const outputPath = path.join(process.cwd(), 'public', 'logo.svg');

if (!fs.existsSync(inputPath)) {
  console.error("error: logo.png not found at root");
  process.exit(1);
}

potrace.trace(inputPath, {
  threshold: 180,
  color: "currentColor",
  background: "transparent",
  optTolerance: 0.4
}, (err, svg) => {
  if (err) throw err;
  
  // Strip width/height attributes to make it purely viewBox constrained
  let cleanSvg = svg.replace(/width="[^"]+" /, '');
  cleanSvg = cleanSvg.replace(/height="[^"]+" /, '');
  
  fs.writeFileSync(outputPath, cleanSvg);
  console.log('Successfully traced logo.png to public/logo.svg');
});
