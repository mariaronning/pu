QUnit.module('Window tests')
QUnit.test ('should return correct subject ID', function(assert) {
    var id = getUrlVars()['id'];
    assert.equal(id, 'TDT4242', 'Subject ID is correct');
});

QUnit.test ('should return correct level', function(assert) {
    var level = getUrlVars()['level'];
    assert.equal(level, '1', 'Level is correct');
});



QUnit.module('Checkbox tests');
QUnit.test('should return false when checkbox is not checked', function(assert) {
    var checked = booleanChecked(false);
    assert.ok(checked == false, 'Checkbox is not checked');
});

QUnit.module('Float test');
QUnit.test('should return a decimal number', function(assert) {
    var number = round(10.75, 1);
    assert.equal(number, '10.8', 'Number is correct');
});