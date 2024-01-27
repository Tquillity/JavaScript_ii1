// =================================
// utilities.js - provides data conversion to work with JSON-server
// ================================= 

const convertFormDataToJson = (formData) => {
    const data = Object.fromEntries(formData.entries());
    
    if (data.hasOwnProperty('popular')) {
        data.popular = data.popular === 'true';
    }

    return data;
};

export { convertFormDataToJson };