function mapAllFromDbFormat(records, dtoType) {
    return records.map(e => dtoType.fromDBFormat(e));
}

module.exports = {
    mapAllFromDbFormat
}