import { Command } from 'commander';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .parse(process.argv);

// чтобы получить наши options у программы(program) вызываем program.opts()
// if help property is true =>
// display the help information using program.helpInformation()
const displayHelp = () => {
  if (program.opts().help) {
    console.log(program.helpInformation());
  }
};

export default displayHelp;
