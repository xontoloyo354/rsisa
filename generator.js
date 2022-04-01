const inquirer = require('inquirer');
const CURR_DIR = process.cwd();
const fs = require('fs');
const MODULE_CHOICES = fs.readdirSync(`${__dirname}/src/modules`);
const moment = require('moment');
// const listInput = require('inquirer-list-input');
const QUESTIONS = [
  {
    name: 'titleName',
    type: 'input',
    message: 'Input Title Name?',
  },
  {
    name: 'modelName',
    type: 'input',
    message: 'Input Model Name?',
  },
  {
    name: 'tableName',
    type: 'input',
    message: 'Input Table Name?',
  },
  {
    name: 'repositoryName',
    type: 'input',
    message: 'Input Repository Name?',
  },
  {
    name: 'urlName',
    type: 'input',
    message: 'Masukan URL',
  },
  {
    name: 'parentName',
    type: 'input',
    message:
      'Choose or input Parent folder or input manually (example: payroll/tunjanganPotongan )',
    choices: MODULE_CHOICES,
  },
  {
    name: 'moduleName',
    type: 'input',
    message: 'Your module name(will be folder name)',
  },
];
// inquirer.registerPrompt('list-input', listInput);
inquirer.prompt(QUESTIONS).then(answers => {
  let {
    modelName,
    tableName,
    parentName,
    moduleName,
    urlName,
    titleName,
    repositoryName,
  } = answers;
  repositoryName = `${repositoryName}`;
  console.log('CREATING DIR');
  fs.mkdirSync(`${CURR_DIR}/src/modules/${parentName}/${moduleName}`);

  console.log('GENERATING MODEL');
  let modelContent = fs.readFileSync(`${__dirname}/templates/template.model.ts`, 'utf8');
  modelContent = modelContent.replace(/ModelName/g, modelName);
  modelContent = modelContent.replace(/TableName/g, tableName);
  fs.writeFileSync(
    `${CURR_DIR}/src/modules/${parentName}/${moduleName}/${moduleName}.model.ts`,
    modelContent,
    'utf8',
  );

  console.log('GENERATING SCHEMA');
  let schemaContent = fs.readFileSync(`${__dirname}/templates/template.schema.ts`, 'utf8');
  schemaContent = schemaContent.replace(/ModuleName/g, moduleName);
  fs.writeFileSync(
    `${CURR_DIR}/src/modules/${parentName}/${moduleName}/${moduleName}.schema.ts`,
    schemaContent,
    'utf8',
  );

  console.log('GENERATING REPOSITORY');
  let repositoryContent = fs.readFileSync(`${__dirname}/templates/template.repository.ts`, 'utf8');
  repositoryContent = repositoryContent.replace(/ModuleName/g, moduleName);
  repositoryContent = repositoryContent.replace(/ModelName/g, modelName);
  repositoryContent = repositoryContent.replace(/RepositoryName/g, repositoryName);
  fs.writeFileSync(
    `${CURR_DIR}/src/modules/${parentName}/${moduleName}/${moduleName}.repository.ts`,
    repositoryContent,
    'utf8',
  );

  console.log('GENERATING CONTROLLER');
  let controllerContent = fs.readFileSync(`${__dirname}/templates/template.controller.ts`, 'utf8');
  controllerContent = controllerContent.replace(/ModuleName/g, moduleName);
  controllerContent = controllerContent.replace(/RepositoryName/g, repositoryName);
  controllerContent = controllerContent.replace(/UrlName/g, urlName);
  fs.writeFileSync(
    `${CURR_DIR}/src/modules/${parentName}/${moduleName}/${moduleName}.controller.ts`,
    controllerContent,
    'utf8',
  );

  console.log('GENERATING MIGRATION');
  let migrationContent = fs.readFileSync(`${__dirname}/templates/migration.js`, 'utf8');
  migrationContent = migrationContent.replace(/TableName/g, tableName);
  fs.writeFileSync(
    `${CURR_DIR}/migrations/${moment()
      .format()
      .replace(/\D/g, '')}-create-${tableName}-table.js`,
    migrationContent,
    'utf8',
  );
});
