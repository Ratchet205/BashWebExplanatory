function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const queryParts = queryString.split('&');

    queryParts.forEach((part) => {
        const [key, value] = part.split('=');
        params[key] = decodeURIComponent(value);
    });

    return params; // Return the parsed parameters
}