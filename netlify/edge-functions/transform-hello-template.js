export default async (request, context) => { 
    const url = new URL(request.url);

    // Check if the query parameter 'method' is 'transform'
    if (url.searchParams.get("method") !== "transform") { 
        // If it's not 'transform', exit early
        return;
    }

    // Proceed to fetch the next resource using context.next()
    const response = await context.next();
    
    // Convert the response body to text
    const page = await response.text();

    // Define a regex pattern to match 'LOCATION_UNKNOWN' case insensitive
    const regex = /LOCATION_UNKNOWN/i;

    // Construct the location string using context.geo
    const location = `${context.geo.city}, ${context.geo.country.name}`;

    // Replace all occurrences of 'LOCATION_UNKNOWN' with the actual location
    const updatedPage = page.replace(regex, location);

    // Return a new Response object with the updated page content
    return new Response(updatedPage, response);
};
