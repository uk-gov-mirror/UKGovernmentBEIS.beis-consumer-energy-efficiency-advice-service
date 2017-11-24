var csvParser = require('csvtojson');

var pcdfParser = {};

pcdfParser.getPcdfWithIgnoredLinesStripped = function (pcdf) {
    // Match anything up to and including the first line which begins "$001"
    var matchIgnoredLinesBeforeStartOfData = /^[\s\S]*\$001\S*\s+/;
    // Match anything from the first line which begins "$999" onwards
    var matchIgnoredLinesAfterEndOfData = /\$999[\s\S]*$/;
    // Match any line which begins with #
    var matchCommentLines = /\s*#(.*)/g;
    return pcdf
        .replace(matchIgnoredLinesBeforeStartOfData, '')
        .replace(matchIgnoredLinesAfterEndOfData, '')
        .replace(matchCommentLines, '');
};

pcdfParser.getTableBodyJson = function (pcdf, tableMetadata, success) {
    const tableCsvString = getTableBodyCsvString(pcdf, tableMetadata.tableNumber, tableMetadata.dataFormatNumber);
    var tableRows = [];
    csvParser({noheader: true})
        .fromString(tableCsvString)
        .on('csv', function (csvRow) {
            var jsonRow = {};
            tableMetadata.columnHeadings.forEach(function (columnHeading, columnIndex) {
                jsonRow[columnHeading] = csvRow[columnIndex];
            });

            // Capitalise the brand name (this isn't done reliably in the source data)
            if (jsonRow.hasOwnProperty('brandName') && jsonRow.brandName !== undefined) {
                jsonRow.brandName = jsonRow.brandName.replace(/\w\S*/g, word => word.charAt(0).toUpperCase() + word.substr(1));
            }

            // Remove empty rows which appear in the source data for some reason
            if (Object.keys(jsonRow).length > 0) {
                tableRows.push(jsonRow);
            }
        })
        .on('done', function () {
            success(tableRows);
        });
};

function getTableBodyCsvString(pcdf, tableNumber, expectedDataFormatNumber) {
    var tableRegex = getRegexForTableNumber(tableNumber);
    var tableSegments = [];
    var match;
    while (match = tableRegex.exec(pcdf)) {
        var dataFormatNumber = match[1];
        verifyDataFormatNumber(expectedDataFormatNumber, dataFormatNumber, tableNumber);
        var tableSegment = match[2];
        tableSegments.push(tableSegment);
    }
    return tableSegments.join('\r\n');
}

function getRegexForTableNumber(tableNumber) {
    // The start of table is indicated by a 'control line' which begins with $X,Y
    // where X is the table number and Y is the data format number
    var regexForTableStartLine = new RegExp('\\\s*\\\$' + tableNumber + ',(\\\d+).*\\\s*');
    // The succeeding lines (which do not begin with $) form the table body
    var regexForTableBodyLines = /((?:[^\$]\S*\s*)*)/;
    // The table is terminated by the next line which begins with $
    var regexForTableEndLine = /\s*\$/;
    return new RegExp(regexForTableStartLine.source + regexForTableBodyLines.source + regexForTableEndLine.source, "g");
}

function verifyDataFormatNumber(expectedDataFormatNumber, actualDataFormatNumber, tableNumber) {
    if (actualDataFormatNumber.toString() !== expectedDataFormatNumber.toString()) {
        throw 'Expected data format ' + expectedDataFormatNumber + ' for table number ' + tableNumber + '.\n' +
        'Actual data format was ' + actualDataFormatNumber;
    }
}

module.exports = pcdfParser;