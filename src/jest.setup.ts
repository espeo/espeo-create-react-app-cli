jest.mock('helpers/exec');
jest.mock('fs');
jest.spyOn(process, 'cwd').mockImplementation(() => './');
