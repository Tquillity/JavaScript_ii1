// =========================================
// http.ts - CRUD-operations for the local JSON-server
// =========================================

export default class HttpClient {
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    // Method to get data from the local JSON-server
    async get(): Promise<any> {

        try {
            const response = await fetch(this.url);

            if (response.ok) {
                const result = await response.json();
                return result;
            } else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        } catch (error: any) {
            throw new Error(`Something went wrong in the GET-Method: ${error}`);
        }
    }

    // Method to add data to the local JSON-server
    async add(data: any): Promise<any> {
        try {
            console.log(data);
            const response = await fetch(this.url, {
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
        } catch (error: any) {
            console.log(error);
            throw new Error(`Something went wrong in the ADD-Method: ${error}`);
        }
    }

        // Method to delete data from the local JSON-server
        async delete(): Promise<void> {
            try {
                await fetch(this.url, {
                    method: 'DELETE',
                });
            } catch (error: any) {
                throw new Error(`Something went wrong in the DELETE-Method: ${error.message}`);
            }
        }

    // Method to update data in the local JSON-server
    async update(data: any): Promise<any> {
        try {   
            const response = await fetch(this.url, {
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
            throw new Error(`Something went wrong in the UPDATE-Method: ${error}`);
        }
    }
}