const pickFilter = (str, startIndex, endIndex, className = 'highlight') => {
    return `${str.slice(0, startIndex)}<span class='${className}'>${str.slice(startIndex, endIndex)}</span>${str.slice(endIndex)}`;
}

const setSearchHighlighted = (searchStr, targetStr) => {
    const regexp = new RegExp(searchStr, 'gi');

    const targetMatch = regexp.exec(targetStr);

    if(targetMatch) {        
        return pickFilter(targetStr, targetMatch.index, targetMatch.index + searchStr.length);
    }

    return targetStr;
}

export {
    setSearchHighlighted
}