var csvParser = require('csvtojson');

var pcdfParser = {};

var commentLineRegex = /(?:\s*#)(.*)/g;
var fileEndRegex = /(?:\s*\$999)([\s\S]?.*)*/g;

pcdfParser.getTableBodyJson = function(pcdf, table, success) {
    const tableCsvString = getTableBodyCsvString(pcdf, table.tableNumber, table.dataFormatNumber);
    var tableRows = [];
    csvParser({noheader: true})
        .fromString(tableCsvString)
        .on('csv', function(csvRow) {
            var columnIndex = 0;
            var jsonRow = table.columnHeadings.reduce(function(result, columnHeading) {
                if (columnHeading) {
                    result[columnHeading] = csvRow[columnIndex];
                }
                columnIndex++;
                return result;
            }, {});
            tableRows.push(jsonRow);
        })
        .on('done', function() {
            success(tableRows);
        });
};

function getTableBodyCsvString(pcdf, tableNumber, expectedDataFormatNumber) {
    var strippedPcdf = getPcdfWithCommentsStripped(pcdf);
    var tableRegex = getRegexForTableNumber(tableNumber);
    var tableSegments = [];
    var match;
    while (match = tableRegex.exec(strippedPcdf)) {
        var dataFormatNumber = match[1];
        verifyDataFormatNumber(expectedDataFormatNumber, dataFormatNumber, tableNumber);
        var tableSegment = match[2];
        tableSegments.push(tableSegment);
    }
    return tableSegments.join('\r\n');
}

function getPcdfWithCommentsStripped(pcdf) {
    return pcdf
        .replace(commentLineRegex, '')
        .replace(fileEndRegex, '');
}

function getRegexForTableNumber(tableNumber) {
    var regexSourceForTableControlLine = '(?:\\\s*\\\$' + tableNumber + ',)(\\\d+)(?:.*[\\\s]*)';
    var regexSourceForNonControlLines = '([^\$]*)';
    return new RegExp(regexSourceForTableControlLine + regexSourceForNonControlLines, "g");
}

function verifyDataFormatNumber(expectedDataFormatNumber, actualDataFormatNumber, tableNumber) {
    if (actualDataFormatNumber.toString() !== expectedDataFormatNumber.toString()) {
        throw 'Expected data format ' + expectedDataFormatNumber + ' for table number ' + tableNumber + '.\n' +
        'Actual data format was ' + actualDataFormatNumber;
    }
}

module.exports = pcdfParser;