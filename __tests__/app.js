'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-typo-3-sitepackage:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({name: 'dummy-site'});
  });

  it('creates files', () => {
    assert.file([
      '.gitignore',
      'composer.json'
    ]);
  });
});
