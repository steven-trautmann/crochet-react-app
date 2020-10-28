import React, { useState, useEffect } from 'react';
import PageTitle from "./PageTitle";
import { importAllToSrcLists } from "../utils/ImportAllFromFolder";
import DisplayPicturesWithoutDetails from './DisplayPicturesWithoutDetails';
import _ from "underscore";

const PrevProducts = () => {
    const [products, _setProducts] = useState([]);
    const [slicedProducts, setSlicedProducts] = useState([]);
    const [offset, _setOffset] = useState(8);

    const offsetRef = React.useRef(offset);

    const setOffset = (data) => {
        offsetRef.current = data;
        _setOffset(data);
    }
    const productsRef = React.useRef(products);

    const setProducts = (data) => {
        productsRef.current = data;
        _setProducts(data);
    }

    const importPrevProducts = () => {
        let srcList = importAllToSrcLists(
            require.context(
                "../images/prev_products",
                false,
                /\.(png|jpe?g|svg)$/
            )
        )
        setSlicedProducts(srcList.slice(0, 8));
        setProducts(srcList);
    }


    const sliceProducts = (from) => {
        setSlicedProducts(productsRef.current.slice(0, from));
    }

    useEffect(() => {
        importPrevProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // if the user scrolls to the bottom, images are added
    const handleScroll = (e) => {
        if (offsetRef.current >= productsRef.current.length) {
            return;
        }
        let limit = Math.max(document.body.scrollHeight, document.body.offsetHeight,
            document.documentElement.clientHeight, document.documentElement.scrollHeight,
            document.documentElement.offsetHeight) - window.innerHeight;

        // check if the scroll event is near to the bottom
        if (limit - window.scrollY < 200) {
            let newOffset;
            if (offsetRef.current + 8 > productsRef.current.length) {
                newOffset = productsRef.current.length;
            } else {
                newOffset = offsetRef.current + 8;
            }
            setOffset(newOffset);
            sliceProducts(newOffset);
        }
    }

    //throttle the scroll handle so it won't be called too many times
    const throttledScrollHandle = _.throttle(handleScroll, 1000);

    // set an eventListener for scrolling and remove it when its not used
    useEffect(() => {
        document.addEventListener("scroll", throttledScrollHandle);
        return () => { document.removeEventListener("scroll", throttledScrollHandle) };
    }, [throttledScrollHandle])

    return (
        <div style={{ margin: "6rem 0 2rem" }}>
            <PageTitle text={"Eddigi Munkáim"} />
            <DisplayPicturesWithoutDetails images={slicedProducts} />
        </div >
    );
}

export default PrevProducts;
