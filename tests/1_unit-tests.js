const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('Function convertHandler.getNum(input)', function()
    {
        test('read a whole number input', function() {
            assert.equal(convertHandler.getNum('32L'), 32);
          });
        
          test('read a decimal number input', function() {
            assert.equal(convertHandler.getNum('32.5L'), 32.5);
          });
        
          test('read a fractional input', function() {
            assert.equal(convertHandler.getNum('1/2L'), 0.5);
          });
        
          test('read a fractional input with a decimal', function() {
            assert.equal(convertHandler.getNum('5.4/3L'), 1.8);
          });
        
          test('return an error on a double-fraction (i.e. 3/2/3)', function() {
            assert.isUndefined(convertHandler.getNum('3/2/3L'));
          });
        
          test('default to a numerical input of 1 when no numerical input is provided', function() {
            assert.equal(convertHandler.getNum('L'), 1);
          });
        
          test('read each valid input unit', function() {
            const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
            input.forEach(function(ele) {
              assert.equal(convertHandler.getUnit(ele), ele);
            });
          });
        
          test('return an error for an invalid input unit', function() {
            assert.isUndefined(convertHandler.getUnit('34g'));
          });
        
          test('return unit for each valid input unit', function() {
            const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
            const expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
            input.forEach(function(ele, i) {
              assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
            });
          });
        
          test('return the spelled-out string unit for each valid input unit', function() {
            const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
            const expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
            input.forEach(function(ele, i) {
              assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
            });
          });
        
          test('convert gal to L', function() {
            assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
          });
        
          test('convert L to gal', function() {
            assert.closeTo(convertHandler.convert(1, 'L'), 1 / 3.78541, 0.00001);
          });
        
          test('convert mi to km', function() {
            assert.closeTo(convertHandler.convert(1, 'mi'), 1.60934, 0.00001);
          });
        
          test('convert km to mi', function() {
            assert.closeTo(convertHandler.convert(1, 'km'), 1 / 1.60934, 0.00001);
          });
        
          test('convert lbs to kg', function() {
            assert.closeTo(convertHandler.convert(1, 'lbs'), 0.453592, 0.00001);
          });
        
          test('convert kg to lbs', function() {
            assert.closeTo(convertHandler.convert(1, 'kg'), 1 / 0.453592, 0.00001);
          });
        });
    });