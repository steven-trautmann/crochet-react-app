export const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => {
        return (images[item.replace("./", "")] = r(item));
    });
    return images;
};

export const importAllToSrcLists = (r) => {
    let images = {};
    r.keys().map((item, index) => {
        return (images[item.replace("./", "")] = r(item));
    });

    let listOfAllSrc = [];
    for (let imageSrc of Object.entries(images)) {
        let src = imageSrc.toString().split(",").pop();
        listOfAllSrc.push(src);
    }

    return listOfAllSrc;
};

