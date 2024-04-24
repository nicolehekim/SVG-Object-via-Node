const fs = require('fs');
const inquirer = require('inquirer');
const {Circle, Square, Triangle} = require('./lib/shapes');

class SVG {
    constructor() {
        this.textElement = ''
        this.shapeElement = ''
    }

    render() {
        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
    }

    setText(characters, colorText) {
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${colorText}">${characters}</text>`
    }

    setShape (shape) {
        this.shapeElement = shape.render()
    }
}

const prompts = [
    {
        type: 'input',
        message: "Enter up to three characters:",
        name: 'characters',
    },
    {
        type: 'input',
        message: "Enter a color(or hexadecimal number):",
        name: 'colorText',
    },
    {
        type: 'list',
        message: "Select a shape:",
        choices: ['Circle', 'Square', 'Triangle'],
        name: 'shape',
    },
    {
        type: 'input',
        message: "Enter a color for your shape(or hexadecimal number):",
        name: 'colorShape',
    },
]

function writeToFile (filename, data) {
    console.log('Writing [' + data + '] to file [' + filename + '] ');
    
    fs.writeFile(filename, data, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log('Your SVG file has been generated.')
    });
}

async function init() {
    console.log('Initiating');

    var svgString = '';
    var svgFile = 'logo.svg';
    const answers = await inquirer.prompt(prompts);
    var characterInput = '';


    if (answers.characters.length>0 && answers.characters.length<4) {
        characterInput = answers.characters;
    } else {
        console.log ('You must enter 1-3 characters');
        return;
    }

    console.log('Character selection: ['+ characterInput + ']');

    textColorInput = answers['colorText'];
    console.log('Text color: [' + textColorInput +'] ');

    shapeInput = answers['shape'];
    console.log('Shape: [' + shapeInput + ']');

    shapeColorInput = answers['colorShape'];
    console.log('Shape color: [' + shapeColorInput + ']');

    let shapes;
    if (shapeInput === 'Circle' || shapeInput === 'circle') {
        shapes = new Circle();
        console.log('Circle shape selected');
    } else if (shapeInput === 'Square' || shapeInput === 'square') {
        shapes = new Square();
        console.log('Square shape selected');
    } else if (shapeInput === 'Triangle' || shapeInput === 'triangle') {
        shapes = new Triangle();
        console.log('Triangle shape selected');
    } else {
        console.log('Shape does not exist');
    }

    shapes.setColor(shapeColorInput);

    const svg = new SVG();
    svg.setText(characterInput, textColorInput);
    svg.setShape(shapes);
    svgString = svg.render();

    console.log('Shape: \n\n + svgString');
    console.log('Generated, writing to file.');
    writeToFile(svgFile, svgString);
}

init();