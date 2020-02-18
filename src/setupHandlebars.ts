import handlebars from 'handlebars';

export const setupHandlebars = (): void => {
  handlebars.registerHelper('toLowerCase', str => str.toLowerCase());
  handlebars.registerHelper('toUpperCase', str => str.toUpperCase());
  handlebars.registerHelper(
    'capitalize',
    str => str.charAt(0).toUpperCase() + str.slice(1),
  );
  handlebars.registerHelper('ifEquals', function(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this: any,
    arg1,
    arg2,
    options,
  ) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  }),
    handlebars.registerHelper(
      'setVar',
      (varName, varValue, options) => (options.data.root[varName] = varValue),
    );
};
