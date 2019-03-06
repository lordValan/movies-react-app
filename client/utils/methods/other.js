import sanitizeHtml from 'sanitize-html';

const pickFilter = (str, startIndex, endIndex, className = 'highlight') => {
    const rawHtml = `${str.slice(0, startIndex)}<span class='${className}'>${str.slice(startIndex, endIndex)}</span>${str.slice(endIndex)}`,
            cleanHtml = sanitizeHtml(rawHtml, {
                allowedTags: [ 'span' ],
                    allowedAttributes: {
                        'span': [ 'class' ]
                    }
            });

    return cleanHtml;
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