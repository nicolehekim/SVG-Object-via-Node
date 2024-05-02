const {Circle, Square, Triangle} = require('./shapes');

describe('Circle', () => {
    it('should take the color and render correctly', () => {
        const circle = new Circle();
        var color = ('blue');
        circle.setColor(color);

        expect(circle.render()).toEqual('<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="blue"/>')
    });
});

describe('Square', () => {
    it('should take the color and render correctly', () => {
        const square = new Square();
        var color = ('blue');
        square.setColor(color);

        expect(square.render()).toEqual('<rect x="50" height="200" width="200" fill="blue"/>')
    });
});

describe('Triangle', () => {
    it('should take the color and render correctly', () => {
        const triangle = new Triangle();
        var color = ('blue');
        triangle.setColor(color);

        expect(triangle.render()).toEqual('<polygon height="100%" width="100%" points="0,200 300,200 150,0" fill="blue"/>')
    });
});