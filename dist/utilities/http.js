// =========================================
// http.ts - CRUD-operations for the local JSON-server
// =========================================
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class HttpClient {
    constructor(url) {
        this.url = url;
    }
    // Method to get data from the local JSON-server
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this.url);
                if (response.ok) {
                    const result = yield response.json();
                    return result;
                }
                else {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
            }
            catch (error) {
                throw new Error(`Something went wrong in the GET-Method: ${error}`);
            }
        });
    }
    // Method to add data to the local JSON-server
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(data);
                const response = yield fetch(this.url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                if (response.ok) {
                    const result = yield response.json();
                    return result;
                }
                else {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
            }
            catch (error) {
                console.log(error);
                throw new Error(`Something went wrong in the ADD-Method: ${error}`);
            }
        });
    }
    // Method to delete data from the local JSON-server
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fetch(this.url, {
                    method: 'DELETE',
                });
            }
            catch (error) {
                throw new Error(`Something went wrong in the DELETE-Method: ${error.message}`);
            }
        });
    }
    // Method to update data in the local JSON-server
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this.url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                if (response.ok) {
                    const result = yield response.json();
                    return result;
                }
                else {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
            }
            catch (error) {
                throw new Error(`Something went wrong in the UPDATE-Method: ${error}`);
            }
        });
    }
}
