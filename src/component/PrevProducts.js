import React, { useState, useEffect, memo } from 'react';
import PageTitle from "./PageTitle";
import { importAllToSrcLists } from "../utils/ImportAllFromFolder";
import DisplayPicturesWithoutDetails from './DisplayPicturesWithoutDetails';
import _ from "underscore";
import ModalWithoudDetails from "./ModalWithoutDetails";

const PrevProducts = () => {
    const [products, _setProducts] = useState([]);
    const [slicedProducts, setSlicedProducts] = useState([]);
    const [offset, _setOffset] = useState(0);
    const [increasedImg, setIncreasedImg] = useState("");

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

    const addFourAdditionalImgs = () => {
        let newOffset;
        if (offsetRef.current + 4 > productsRef.current.length) {
            newOffset = productsRef.current.length;
        } else {
            newOffset = offsetRef.current + 4;
        }
        setOffset(newOffset);
        sliceProducts(newOffset);

        window.scrollTo(0, window.scrollY - 350);
    }

    const importPrevProducts = () => {
        let srcList = importAllToSrcLists(
            require.context(
                "../images/prev_products",
                false,
                /\.(png|jpe?g|svg)$/
            )
        )
        srcList.sort((a, b) => {
            if (Number(a.slice(a.lastIndexOf("/") + 1, a.indexOf("."))) < Number(b.slice(b.lastIndexOf("/") + 1, b.indexOf(".")))) {
                return -1;
            } else {
                return 1;
            }
        })
        setProducts(srcList);
        addFourAdditionalImgs();
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
            addFourAdditionalImgs();
        }
    }

    //throttle the scroll handle so it won't be called too many times
    const throttledScrollHandle = _.throttle(handleScroll, 1500);

    // set an eventListener for scrolling and remove it when its not used
    useEffect(() => {
        document.addEventListener("scroll", throttledScrollHandle);
        return () => { document.removeEventListener("scroll", throttledScrollHandle) };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div style={{ margin: "6rem 0 2rem" }}>
            <PageTitle text={"Eddigi Munkáim"} />
            <DisplayPicturesWithoutDetails images={slicedProducts} setIncreasedImg={setIncreasedImg} />
            <ModalWithoudDetails imgSrc={increasedImg} setIncreasedImg={setIncreasedImg} imgSrcList={slicedProducts} />

            <div style={{ textAlign: "center" }}>
                <button
                    onClick={() => {
                        if (offsetRef.current < productsRef.current.length) {
                            addFourAdditionalImgs()
                        }
                    }}
                    style={{
                        color: `${offsetRef.current < productsRef.current.length ? "black" : "red"}`,
                        marginTop: "2rem",
                        fontSize: "1.5rem",
                        cursor: `${offsetRef.current < productsRef.current.length ? "pointer" : "not-allowed"}`
                    }}
                >
                    {offsetRef.current < productsRef.current.length ? "Még több kép" : "Nincs több kép :("}
                </button>
            </div>
        </div >
    );
}

export default memo(PrevProducts);
