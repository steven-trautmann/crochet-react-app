import React, { useState, useEffect } from 'react';
import PageTitle from "./PageTitle";
import importAll from "../utils/ImportAllFromFolder";
import DisplayPicturesWithoutDetails from './DisplayPicturesWithoutDetails';

const PrevProducts = () => {
    const [products, setProducts] = useState({})

    const importPrevProducts = () => {
        setProducts(
            importAll(
                require.context(
                    "../images/prev_products",
                    false,
                    /\.(png|jpe?g|svg)$/
                )
            )
        )
    }

    useEffect(() => {
        importPrevProducts();
    }, [])

    return (
        <div style={{ marginTop: "6rem" }}>
            <PageTitle text={"Eddigi Munkáim"} />
            <DisplayPicturesWithoutDetails images={products} />
        </div >
    );
}

export default PrevProducts;
