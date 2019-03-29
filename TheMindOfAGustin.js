const vocabulary = require("./TheVocabularyOfAGustin");

function rand(words) {
    return words[Math.floor(Math.random() * words.length)];
}

module.exports = {
    words: vocabulary.words,
    say: function (predicate = "") {
        if (predicate === "") {
            let verbed = rand(vocabulary.words.verbed);
            let greater = rand(vocabulary.words.greater);
            let objects = rand(vocabulary.words.objects);
            let lesser = rand(vocabulary.words.lesser);
            let indirectObjects = rand(vocabulary.words.indirectObjects);

            return `We've ${verbed} ${greater} ${objects} with ${lesser} ${indirectObjects}.`;
        } else {
            return `We've ${predicate}.`;
        }
    },
};
