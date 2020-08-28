// Class to handle POST and GET AJAX requests
class Ajax {
  // static method: async GET request
  static async get(url) {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // return response in json
    return response.json();
  }
  // static method: async POST request
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
        // return data from server response
        return data;
      })
    );
  }
}

// export class: Ajax
module.exports = Ajax;
