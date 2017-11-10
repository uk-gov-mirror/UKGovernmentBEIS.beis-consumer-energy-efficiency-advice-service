var client = require('./client/pcdf-client');
var pcdfParser = require('./service/pcdf-parser');
var fileWriter = require('./service/file-writer');
var PcdfTables = require('./model/pcdf-tables');

client.getPcdf(function(pcdf) {
    PcdfTables.forEach(function(table) {
        pcdfParser.getTableBodyJson(
            pcdf,
            table,
            function(result) {
                fileWriter.saveJsonFile(result, table.tableName);
            }
        )
    });
});

// TODO: use promises!
// TODO: save results!