import handlebars from 'handlebars';

export const setupHandlebars = () => {
  handlebars.registerHelper('toLowerCase', str => str.toLowerCase());
  handlebars.registerHelper('toUpperCase', str => str.toUpperCase());
  handlebars.registerHelper(
    'capitalize',
    str => str.charAt(0).toUpperCase() + str.slice(1),
  );
  handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });
  handlebars.registerHelper('setVar', function(varName, varValue, options) {
    options.data.root[varName] = varValue;
  });
};
