export const getDisplayableID = (num) => {
    let id = "#";
    for(let i = num.toString().length; i < 3; i++) {
        id += "0";
    }
    return id + num;
}

export const getDisplayableName = (str) => {
    const words = str.split("-");
    const res = words.map(word => {
        const firstLetter = word[0];
        const rest = word.slice(1);
        return firstLetter.toUpperCase() + rest;
    })
    return res.join("-");
}