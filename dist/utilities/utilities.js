// =================================
// utilities.ts - provides data conversion to work with JSON-server
// ================================= 
const convertFormDataToJson = (formData) => {
    const data = {};
    formData.forEach((value, key) => {
        // Handle case where a form field might have multiple values
        if (data.hasOwnProperty(key)) {
            if (Array.isArray(data[key])) {
                data[key].push(value);
            }
            else {
                data[key] = [data[key], value];
            }
        }
        else {
            data[key] = value;
        }
    });
    // Specific handling for 'popular' field if it exists
    if (data.hasOwnProperty('popular')) {
        data.popular = data.popular === 'true';
    }
    return data;
};
export { convertFormDataToJson };
