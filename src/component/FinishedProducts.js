import React, { useEffect, useState, useCallback } from "react";
import DisplayPictures from "./DisplayPictures";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import { FinishedModalTextsContext } from "../context/ModalTextsFinishedProducts";
import { importAll } from "../utils/ImportAllFromFolder";
import PageTitle from "./PageTitle";

export default function FinishedProducts() {
    const [products, setProducts] = useState({});
    const { type } = useParams();
    const [typeTitle, setTypeTitle] = useState("Helytelen URL!");

    //it is not necessary making sense, because the useParams is treated as prop, 
    //so the component cannot be memoized, so the useCallback also wont be memoized
    const importFinishedProducts = useCallback(() => {
        if (type === "figurak") {
            setTypeTitle("Figurák");
            setProducts(
                importAll(
                    require.context(
                        "../images/finished_products/figurák",
                        false,
                        /\.(png|jpe?g|svg)$/
                    )
                )
            );
        } else if (type === "takarok") {
            setTypeTitle("Takarók");
            setProducts(
                importAll(
                    require.context(
                        "../images/finished_products/takarók",
                        false,
                        /\.(png|jpe?g|svg)$/
                    )
                )
            );
        } else if (type === "szundikendok") {
            setTypeTitle("Szundikendők");
            setProducts(
                importAll(
                    require.context(
                        "../images/finished_products/szundikendők",
                        false,
                        /\.(png|jpe?g|svg)$/
                    )
                )
            );
        } else if (type === "sapkak") {
            setTypeTitle("Sapkák");
            setProducts(
                importAll(
                    require.context(
                        "../images/finished_products/sapkák",
                        false,
                        /\.(png|jpe?g|svg)$/
                    )
                )
            );
        }
    }, [type]);

    useEffect(() => {
        importFinishedProducts();
    }, [type, importFinishedProducts]);

    return (
        <div>
            <Modal context={FinishedModalTextsContext} />
            <div style={{ marginTop: "6rem" }}>
                <PageTitle text={typeTitle === "Helytelen URL!"
                    ? typeTitle
                    : "Kész Termékek | " + typeTitle} />

                <DisplayPictures pictures={products} />
            </div>
        </div>
    );
}
