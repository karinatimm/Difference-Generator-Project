import { Command } from 'commander';

const displayHelp = () => {
  const program = new Command();

  program
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .option('-h, --help', 'output usage information')
    .parse(process.argv);

  if (program.opts().help) {
    console.log(program.helpInformation());
  }
};

export default displayHelp;
