class Ajax {

    static async get(url) {

        const response = await fetch(url,{
            method: "GET",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.json();
    }

    static async post(url, data) {

        const response = await fetch(url,{
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        return response;

    }
}

module.exports = Ajax;