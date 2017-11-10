var client = require('./client/pcdf-client');
var pcdfParser = require('./service/pcdf-parser');
var fileWriter = require('./service/file-writer');
var PcdfTables = require('./model/pcdf-tables');

client.getPcdf(function(pcdf) {
    var strippedPcdf = pcdfParser.getPcdfWithIgnoredLinesStripped(pcdf);
    PcdfTables.forEach(function(tableMetadata) {
        pcdfParser.getTableBodyJson(
            strippedPcdf,
            tableMetadata,
            function(tableJson) {
                var truncatedTable = tableMetadata.maxRows ? tableJson.slice(0, tableMetadata.maxRows) : tableJson;
                fileWriter.saveJsonFile(truncatedTable, tableMetadata.tableName);
            }
        )
    });
});