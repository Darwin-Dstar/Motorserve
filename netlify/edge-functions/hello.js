export default async (request, context) => { 
    return new Response("Hello world from edge!", {
        header: {
            "comtent-type": "text/html",
        }
    });
}