class Ajax {

  static async get(url) {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }

  static async post(url, body) {
    return await fetch(url, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) =>
      response.json().then((data) => {
        return data;
      })
    );
  }
}

module.exports = Ajax;
