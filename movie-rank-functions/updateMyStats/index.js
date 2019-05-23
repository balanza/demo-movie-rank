const RECORD_ID = 'my-stats';

module.exports = async function (context, documents, myStats) {
    if (!documents || !documents.length) throw new Error('documents collection empty');

    return documents.reduce((oldStats, doc) => {
        const { count = 0, avg = 0, id = RECORD_ID } = oldStats;
        const { rank } = doc;
        return {
            id,
            count: count + 1,
            avg: avg + (rank - avg) / (count + 1),
        };
    }, myStats || {});
};
