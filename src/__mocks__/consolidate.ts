const render = (
  template: string,
  options: Record<string, string>,
): Promise<string> => {
  const params = Object.entries(options);

  const result = params.reduce(
    (previousTemplate, [key, value]) => previousTemplate.replace(key, value),
    template,
  );

  return Promise.resolve(result);
};

export const handlebars = {
  render,
};
