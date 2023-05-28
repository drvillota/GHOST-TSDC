const fs = require("fs");
const path = require("path");
const resemble = require("resemblejs");
const compareImages = require("resemblejs/compareImages");
const config = require("./config.json");
const { viewportHeight, viewportWidth, browsers, options } = config;

const referenceVersion = "ghost-3.41.1";
const testVersion = "ghost-4.40";
const screenshotsPath = "./screenshots";
const resultsPath = "./results";

async function runVisualRegressionTesting() {
  const referenceDir = path.join(screenshotsPath, referenceVersion);
  const testDir = path.join(screenshotsPath, testVersion);
  const referenceFolders = fs.readdirSync(referenceDir);

  let testFiles = [];
  let refFiles = [];
  for (const folder of referenceFolders) {
    const referenceFolder = path.join(referenceDir, folder);
    const testFolder = path.join(testDir, folder);

    const testFeatures = fs.readdirSync(testFolder);
    const referenceFeatures = fs.readdirSync(referenceFolder);

    for (const featureFolder of referenceFeatures) {
      const currentRefFeaturePath = path.join(referenceFolder, featureFolder);
      const currentTestFeaturePath = path.join(testFolder, featureFolder);

      const refFeatureFiles = fs.readdirSync(currentRefFeaturePath);

      for (const file of refFeatureFiles) {
        const refFilePath = path.join(currentRefFeaturePath, file);
        const testFilePath = path.join(currentTestFeaturePath, file);

        const outputFolder = path.join(resultsPath, folder, featureFolder);
        const diffFile = path.join(outputFolder, `diff-${file}`);
        if (!fs.existsSync(outputFolder)) {
          fs.mkdirSync(outputFolder, { recursive: true });
        }

        const comparison = await compareImages(
          fs.readFileSync(".\\" + refFilePath),
          fs.readFileSync(".\\" + testFilePath),
          options
        );
        let resultInfo = {};
        //fs.writeFileSync(diffFile, await comparison.getBufferAsync());
        fs.writeFileSync(diffFile, comparison.getBuffer());

        console.log(`Comparison completed for '${file}'`);
      }
    }
  }

  generateReport();
}

function generateReport() {
  const reportPath = path.join(resultsPath, "report.html");
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
    const featureFolders = fs.readdirSync(folderPath);

    for (const featureFolder of featureFolders) {
      const featureFolderPath = path.join(folderPath, featureFolder);
      const files = fs.readdirSync(featureFolderPath);

      const sectionContent = `
        <div class="section">
          <h2>${folder}</h2>
          ${getReportSteps(files, featureFolderPath)}
        </div>
      `;

      sections.push(sectionContent);
    }
  }

  return sections.join("");
}

function getReportSteps(files, folderPath) {
  const steps = [];

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const noDiffFilePath = filePath.replace("diff-", "");

    let referenceFilePath = noDiffFilePath.replace(
      "results",
      `..\\screenshots\\${referenceVersion}`
    );

    let testFilePath = noDiffFilePath.replace(
      "results",
      `..\\screenshots\\${testVersion}`
    );
    let diffPath = filePath.replace("results", `.`);

    referenceFilePath = referenceFilePath.replace("\\", "/");
    testFilePath = testFilePath.replace("\\", "/");
    diffPath = diffPath.replace("\\", "/");

    const stepContent = `
      <div class="step">
        <h3>${file}</h3>
        <div class="images">
          <div class="image">
            <div class="imgname">Reference</div>
            <img src="${referenceFilePath}" />
          </div>
          <div class="image">
            <div class="imgname">Test</div>
            <img src="${testFilePath}" />
          </div>
          <div class="image">
            <div class="imgname">Diff</div>
            <img src="${diffPath}" />
          </div>
        </div>
        </div>
      `;
    steps.push(stepContent);
  }

  return steps.join("");
}

// Ejecutar el proceso de visual regression testing
runVisualRegressionTesting();
