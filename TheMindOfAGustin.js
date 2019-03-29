const verbed = [
    'made',
];
const greater = [
    'danker',
];
const objects = [
    'memes',
];
const fewer = [
    'fewer',
];
const indirectObjects = [
    'likes',
];

function rand(words) {
    return words[Math.floor(Math.random() * words.length)];
}

module.exports = {
    words: {
        verbed: verbed,
        greater: greater,
        objects: objects,
        fewer: fewer,
        indirectObjects: indirectObjects,
    },
    say: function (predicate = "") {
        if (predicate === "") {
            return `We've ${rand(verbed)} ${rand(greater)} ${rand(objects)} with ${rand(fewer)} ${rand(indirectObjects)}.`;
        } else {
            return `We've ${predicate}.`;
        }
    },
};
