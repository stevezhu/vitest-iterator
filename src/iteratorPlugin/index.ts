import { createNext } from './next';
import { createToBeDone } from './toBeDone';

export const iteratorPlugin: Chai.ChaiPlugin = (chai, utils) => {
  utils.addProperty(
    chai.Assertion.prototype,
    'next',
    createNext(utils, 'next'),
  );
  utils.addProperty(
    chai.Assertion.prototype,
    'yields',
    createNext(utils, 'yields'),
  );

  utils.addMethod(
    chai.Assertion.prototype,
    'toBeDone',
    createToBeDone(utils, 'toBeDone'),
  );
};
