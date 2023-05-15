const fs = require('fs');
const path = require('path');
const resemble = require('resemblejs');
const compareImages = require("resemblejs/compareImages");
const config = require("./config.json");
const { viewportHeight, viewportWidth, browsers, options } = config;


const referenceVersion = 'ghost-3.41.1';
const testVersion = 'ghost-4.40';
const screenshotsPath = './screenshots';
const resultsPath = './results';

async function runVisualRegressionTesting() {
  const referenceDir = path.join(screenshotsPath, referenceVersion);
  const testDir = path.join(screenshotsPath, testVersion);
  const referenceFolders = fs.readdirSync(referenceDir);
  

  let testFiles=[];
  let refFiles=[];
  for (const folder of referenceFolders) {
    const referenceFolder = path.join(referenceDir, folder);
    const testFolder = path.join(testDir, folder);
 
    const testFeatures = fs.readdirSync(testFolder);
    const referenceFeatures = fs.readdirSync(referenceFolder);
    
     for (i=0;i<referenceFeatures.length;i++){
      const refFeaturePath = path.join(referenceFolder, referenceFeatures[i]);
      refFiles = fs.readdirSync(refFeaturePath);
      const testFeaturePath = path.join(testFolder, testFeatures[i]);
      testFiles = fs.readdirSync(testFeaturePath);
   
    }

    for (i=0;i<refFiles.length;i++){
      file = refFiles[i];
      var referenceFile = path.join(path.join(referenceFolder, referenceFeatures[i]), file);
      var testFile = path.join(path.join(testFolder, testFeatures[i]), file);
      var outputFolder = path.join(resultsPath, folder);
      var diffFile = path.join(outputFolder, `diff-${file}`);

      if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true });
      }

      const comparison = await compareImages( 
        fs.readFileSync(".\\"+referenceFile),
        fs.readFileSync(".\\"+testFile),
        options
      );
      let resultInfo = {};
      //fs.writeFileSync(diffFile, await comparison.getBufferAsync());
      fs.writeFileSync(diffFile, comparison.getBuffer());
     
      console.log(`Comparison completed for '${file}'`);
    }
  }

  generateReport();
}

function generateReport() {
  const reportPath = path.join(resultsPath, 'report.html');
  const reportContent = `
    <html>
      <head>
        <style>
          /* Estilos del informe */
        </style>
      </head>
      <body>
        <h1>Visual Regression Testing Report</h1>
        ${getReportSections()}
      </body>
    </html>
  `;

  fs.writeFileSync(reportPath, reportContent);
  console.log(`Report generated at '${reportPath}'`);
}

function getReportSections() {
  const sections = [];
  const folders = fs.readdirSync(resultsPath);

  for (const folder of folders) {
    const folderPath = path.join(resultsPath, folder);
    const files = fs.readdirSync(folderPath);

    const sectionContent = `
      <div class="section">
        <h2>${folder}</h2>
        ${getReportSteps(files, folder)}
      </div>
    `;

    sections.push(sectionContent);
  }

  return sections.join('');
}

function getReportSteps(files, folder) {
  const steps = [];

  for (const file of files) {
    const filePath = path.join(folder, file);
    const stepContent = `
      <div class="step">
        <h3>${file}</h3>
        <div class="images">
          <div class="image">
            <span class="imgname">Reference</span>
            <img src="./screenshots/${referenceVersion}/${filePath}" />
          </div>
          <div class="image">
            <span class="imgname">Test</span>
            <img src="./screenshots/${testVersion}/${filePath}" />
          </div>
          <div class="image">
            <span class="imgname">Diff</span>
            <img src="./results/${filePath.replace('.png', `diff-${file}`)}" />
          </div>
        </div>
        </div>
      `;
      steps.push(stepContent);
    }
    
    return steps.join('');
    }
    
    // Ejecutar el proceso de visual regression testing
    runVisualRegressionTesting();
