const host = 'http://localhost:5505'

const GetAllCategories = async () => {
    const path = '/category/get-all-categories';
    const url = host + path;

    const response = await fetch(url);
    const res = await response.json();

    return res.metadata.categories;
}

const GetProductsByCategories = async ({category}) => {
    const path = `/category/${category}/products`;
    const url = host + path;

    const response = await fetch(url, {method: "POST"});
    const res = await response.json();

    return res.metadata.products;
}

export { 
    GetAllCategories,
    GetProductsByCategories
}