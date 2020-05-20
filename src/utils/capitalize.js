/**
 * 
 * @param {String} word 
 * @returns{String}
 */
const capitalize = (word) => {
    const formatWord = word
        .toLowerCase()
        .split(' ')
        .map((f) => f.charAt(0).toUpperCase() + f.substring(1))
        .join(' ');

    return formatWord;
};

export default capitalize;
