// =========================================
// CRUD-operations for the local JSON-server
// =========================================

export default class HttpClient {
    #url = '';

    constructor(url) {
        this.#url = url;
    }

    // Method to get data from the local JSON-server
    async get() {

        try {
            const response = await fetch(this.#url);

            if (response.ok) {
                const result = await response.json();
                return result;
            } else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.log(error);
            throw new Error(`Something went wrong in the GET-Method: ${error}`);
        }
    }

    // Method to add data to the local JSON-server
    async add(data) {
        try {
            console.log(data);
            const response = await fetch(this.#url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                return result;
            } else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.log(error);
            throw new Error(`Something went wrong in the ADD-Method: ${error}`);
        }
    }

    // Method to update data in the local JSON-server
    async update(data) {
        try {   // Read up on if I should use (`${this.#url}/${data.id}`) for this for a more direct approach
            const response = await fetch(this.#url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                return result;
            } else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.log(error);
            throw new Error(`Something went wrong in the UPDATE-Method: ${error}`);
        }
    }

    // Method to delete data from the local JSON-server
    async delete() {
        try {
            const response = await fetch(this.#url, {
                method: 'DELETE',
                });
        } catch (error) {
            console.log(error);
            throw new Error(`Something went wrong in the DELETE-Method: ${error}`);
        }
    }
}