'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the good ' + chalk.red('generator-typo-3-sitepackage') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Website name',
      default: this.appname
    },
    {
      type: 'input',
      name: 'company',
      message: 'Company name',
      default: 'ACME Inc.'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Website description',
      default: ''
    },
    {
      type: 'input',
      name: 'homepage',
      message: 'Project homepage',
      default: 'https://github.com/my-company/my-website'
    }, {
      type: 'list',
      name: 't3release',
      message: 'Typo3 relase',
      choices: [{
        name: 'Typo3 8.7 LTS',
        value: '^8.7.0'
      },
      {
        name: 'Typo3 7.6 LTS',
        value: '^7.6.0'
      },
      {
        name: 'Typo3 6.2 LTS',
        value: '^6.2.0'
      },
      {
        name: 'latest stable',
        value: '*'
      }
      ]
    }
    ];

    return this.prompt(prompts).then(props => {
      props.sitepackageVendor = _.upperFirst(_.camelCase(props.company));
      props.sitepackageName = _.upperFirst(_.camelCase(props.name));
      props.sitepackageFolder = _.snakeCase(props.name);
      props.name = _.kebabCase(props.name);
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('_composer.json'),
      this.destinationPath('composer.json'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore'),
      this.props
    );
  }

  install() {
    this.spawnCommand('composer', ['install']);
  }
};
