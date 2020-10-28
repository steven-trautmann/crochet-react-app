const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => {
        return (images[item.replace("./", "")] = r(item));
    });
    return images;
};

export default importAll;