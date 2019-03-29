export const verbed = [
    'made',
];
export const greater = [
    'danker',
];
export const objects = [
    'memes',
];
export const fewer = [
    'fewer',
];
export const indirectObjects = [
    'likes',
];

function rand(words) {
    return words[Math.floor(Math.random() * words.length)];
}

export default function inspiration (predicate = "") {
    if (predicate === "") {
        return `We've ${rand(verbed)} ${rand(greater)} ${rand(objects)} with ${rand(fewer)} ${rand(indirectObjects)}.`;
    } else {
        return `We've ${predicate}.`;
    }
};
