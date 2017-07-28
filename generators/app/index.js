'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the good ' + chalk.red('generator-typo3-sitepackage') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Website name',
      default: 'Example Site',
      store: true
    },
    {
      type: 'input',
      name: 'authorName',
      message: 'Author fullname',
      default: 'John Smith',
      store: true
    },
    {
      type: 'input',
      name: 'authorEmail',
      message: 'Author email',
      default: 'j.smith@example.com',
      store: true
    },
    {
      type: 'input',
      name: 'company',
      message: 'Company name',
      default: 'ACME Inc.',
      store: true
    },
    {
      type: 'input',
      name: 'description',
      message: 'Website description',
      default: 'An example website',
      store: true
    },
    {
      type: 'input',
      name: 'homepage',
      message: 'Project homepage',
      default: 'https://github.com/acme/exmaple-website',
      store: true
    }, {
      type: 'list',
      name: 'typo3Release',
      message: 'Typo3 relase',
      choices: [
        {
          name: 'Typo3 8.7 LTS',
          value: '8LTS'
        },
        {
          name: 'Typo3 7.6 LTS',
          value: '7LTS'
        },
        {
          name: 'Typo3 6.2 LTS',
          value: '6LTS'
        },
        {
          name: 'latest stable',
          value: 'LATEST'
        }
      ],
      store: true
    }
    ];

    return this.prompt(prompts).then(props => {
      // define project labels
      props.nameLabel = _.toLower(_.replace(props.name, /[^a-zA-Z0-9]/g, ''));
      props.companyLabel = _.kebabCase(_.toLower(_.replace(props.company, /[^a-zA-Z0-9 ]/g, '')));

      // define sitepackage variables
      props.sitepackageVendor = _.upperFirst(_.camelCase(_.replace(_.toLower(props.company), /[^a-zA-Z0-9 ]/g, '')));
      props.sitepackageName = _.upperFirst(props.nameLabel);
      props.sitepackageFolder = props.nameLabel;

      // define versions
      switch (props.typo3Release) {
        case '7LTS':
          props.composerTypo3Version = '^7.6.0';
          props.emconfTypo3Version = '7.6.0-7.6.99';
          props.cleanTypo3Version = '5.6';
          props.phpVer = '56';
          break;

        case '6LTS':
          props.composerTypo3Version = '^6.2.0';
          props.emconfTypo3Version = '6.2.0-6.2.99';
          props.cleanTypo3Version = '6.2';
          props.phpVer = '56';
          break;

        case '8LTS':
          props.composerTypo3Version = '^8.7.0';
          props.emconfTypo3Version = '8.7.0-8.7.99';
          props.cleanTypo3Version = '8.7';
          props.phpVer = '71';
          break;

        default:
          props.composerTypo3Version = '*';
          props.emconfTypo3Version = '*';
          props.phpVer = '71';
          break;
      }


      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('Dockerfile'),
      this.destinationPath('Dockerfile'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('docker-compose.yml'),
      this.destinationPath('docker-compose.yml'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('composer.json'),
      this.destinationPath('composer.json'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore'),
      this.props
    );
    this.fs.copy(
      this.templatePath('_htaccess'),
      this.destinationPath('web/.htaccess')
    );
    this.fs.copy(
      this.templatePath('FIRST_INSTALL'),
      this.destinationPath('web/FIRST_INSTALL')
    );
    this.fs.copyTpl(
      this.templatePath('sitepackage/**/*.*'),
      this.destinationPath('web/typo3conf/ext/' + this.props.sitepackageFolder),
      this.props
    );
    this.fs.copy(
      this.templatePath('sitepackage/**/.*'),
      this.destinationPath('web/typo3conf/ext/' + this.props.sitepackageFolder)
    );
  }

  install() {
  }
};
