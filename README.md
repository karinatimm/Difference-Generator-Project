# The Difference Generator Project

### Progect description:

The Difference Generator is a command-line utility designed for comparing and highlighting differences between files or structured data sets, primarily for JSON, YML/YAML, or similar formats. This tool provides a well-structured output and allows users to specify the comparison's output format. Users can select any of these formats by using the -f or --format option followed by the desired format (stylish, plain, or json) when running the utility. The default format, when no specific option is provided, is stylish. The output in stylish format uses symbols such as '+' and '-' to indicate additions and deletions, aiding in quickly visualizing modifications between file versions.

- The **"+"** Symbol (Plus): indicates additions or newly introduced elements/values in the compared file or dataset. This symbol signifies content that exists in the second file but is absent in the first file.

- The **"-"** Symbol (Minus): denotes deletions or elements/values that are present in the first file but not in the second one. It signifies content removed or absent in the second file.

In this utility, three output formats are available for comparison:

- **Stylish(Default Format)**: provides a structured and readable representation of differences between files or datasets.Uses symbols like "+" and "-" to indicate additions and deletions, providing a clear visual representation of changes.

- **Plain Format**: displays differences in a straightforward, concise manner. Presents a list of modifications without any structural formatting or additional symbols.

- **JSON Format**: presents differences in a JSON (JavaScript Object Notation) format. Presents changes in a structured and machine-readable manner, suitable for automation or further processing.

### System requirements:

The Difference Generator project uses JavaScript for its utility logic and relies on npm scripts to execute this utility in the command line. To use this utility, you need to install the following programs:

- Node.js(version 20.3.0 LTS or higher) **(https://nodejs.org/)**
- Node Package Manager(npm) **(https://www.npmjs.com/)**

### Installation and usage instructions:

Follow these steps to install and run The Difference Generator Project:

- Check if Node.js and npm are installed:

Check if you Node.js and npm are installed on your computer. If they are not installed, use the links provided in the "System requirements" section above to install them. If they are already installed, check their versions by opening your terminal or command prompt and running the following commands:

**node -v**
**npm -v**

- Clone the Difference-Generator-Project repository:

Open the terminal or command prompt, navigate to your desired directory, and clone the repository from GitHub using the provided link:

**git clone https://github.com/karinatimm/Difference-Generator-Project.git**

- Move to the project directory on your computer. If desired, rename the directory as required:

**cd Difference-Generator-Project**

- Install project dependencies using npm:

**npm ci**

- Execute the following command to compare two files:

  **gendiff filepath1 filepath2**

Replace filepath1 and filepath2 with the respective paths to the files you want to compare.

Options:

- -h, --help: display usage information and available options.
- -f, --format [output format]: specify the output format.

Available Formats:

1. **stylish** (default): shows differences in a readable, structured format.
2. **plain**: displays differences in a plain format.
3. **json**: presents differences in JSON format.

Examples:

1. To view the differences in plain format:

**gendiff -f plain filepath1 filepath2**

2. To compare in stylish format (default):

**gendiff -f stylish filepath1 filepath2**

3. To generate differences in JSON format:

**gendiff -f json filepath1 filepath2**

You don't need to use 'run' command in oder to run the game just simply write any command above.

### Hexlet tests and linter status:

[![Actions Status](https://github.com/karinatimm/Difference-Generator-Project/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/karinatimm/Difference-Generator-Project/actions)

### CI badge in order to display the project's Node CI status

[![Node CI](https://github.com/karinatimm/Difference-Generator-Project/actions/workflows/nodejs.yml/badge.svg)](https://github.com/karinatimm/Difference-Generator-Project/actions/workflows/nodejs.yml)

### CodeClimate badge in order to display this project's quality:

[![Maintainability](https://api.codeclimate.com/v1/badges/bbd8041d000f45e24385/maintainability)](https://codeclimate.com/github/karinatimm/Difference-Generator-Project/maintainability)

### CodeClimate badge in order to generate test coverage

[![Test Coverage](https://api.codeclimate.com/v1/badges/bbd8041d000f45e24385/test_coverage)](https://codeclimate.com/github/karinatimm/Difference-Generator-Project/test_coverage)

### Gendiff-demo asciinema showcases a comparison JSON-formatted files that are not nested:

[![Gendiff Demo](https://asciinema.org/a/8u7yfS1T1uHkRHLrAmKzTCtle.svg)](https://asciinema.org/a/8u7yfS1T1uHkRHLrAmKzTCtle)

### Gendiff-demo asciinema showcases a comparison YAML-formatted files that are not nested:

[![Gendiff Demo](https://asciinema.org/a/nNq5N7FPEQF5OLdgcupQGOc8B.svg)](https://asciinema.org/a/nNq5N7FPEQF5OLdgcupQGOc8B)

### Gendiff-demo asciinema showcases a recursive comparison utilizing the stylish formatter with JSON/YAML-formatted files:

[![Gendiff Demo](https://asciinema.org/a/T7A5kmQyZrJJ54UEyW6QEJBpa.svg)](https://asciinema.org/a/T7A5kmQyZrJJ54UEyW6QEJBpa)

### Gendiff-demo asciinema showcases a recursive comparison utilizing the plain formatter with JSON/YAML-formatted files:

[![Gendiff Demo](https://asciinema.org/a/h6Z5kUiUTDwn8Q4oV48mu6eF.svg)](https://asciinema.org/a/h6Z5kUiUTDwn8Q4oV48mu6eF)

### Gendiff-demo asciinema showcases a recursive comparison utilizing the json formatter with JSON/YAML-formatted files:

[![Gendiff Demo](https://asciinema.org/a/yowIGtFZS6R4EcQOPuFdzaB11.svg)](https://asciinema.org/a/yowIGtFZS6R4EcQOPuFdzaB11)
