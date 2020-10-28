import React, { useEffect, useState, useCallback } from "react";
import "../style/modal.css";
import DisplayPictures from "./DisplayPictures";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import { FinishedModalTextsContext } from "../context/ModalTextsFinishedProducts";
import { PreviousModalTextsContext } from "../context/ModalTextsPreviousProducts";
import styled from "styled-components";

const PageTitle = styled.h1`
    border-bottom: solid;
    margin: 2rem;
    margin-top: 0;
    text-align: center;
`;

export default function FinishedProducts(props) {
    const [products, setProducts] = useState({});
    const { category } = useParams();
    const { type } = useParams();
    const [categoryTitle, setCategoryTitle] = useState("");
    const [typeTitle, setTypeTitle] = useState("Helytelen URL!");

    const importAll = useCallback((r) => {
        let images = {};
        r.keys().map((item, index) => {
            return (images[item.replace("./", "")] = r(item));
        });
        return images;
    }, []);

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
        } else if (type === "ruhak") {
            setTypeTitle("Ruhák");
            setProducts(
                importAll(
                    require.context(
                        "../images/finished_products/ruhák",
                        false,
                        /\.(png|jpe?g|svg)$/
                    )
                )
            );
        }
    }, [importAll, type]);

    const importPreviousProducts = useCallback(() => {
        if (type === "figurak") {
            setTypeTitle("Figurák");
            setProducts(
                importAll(
                    require.context(
                        "../images/prev_products/figures",
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
                        "../images/prev_products/figures2",
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
                        "../images/prev_products/figures",
                        false,
                        /\.(png|jpe?g|svg)$/
                    )
                )
            );
        } else if (type === "ruhak") {
            setTypeTitle("Ruhák");
            setProducts(
                importAll(
                    require.context(
                        "../images/prev_products/figures2",
                        false,
                        /\.(png|jpe?g|svg)$/
                    )
                )
            );
        }
    }, [importAll, type]);

    const chooseContext = useCallback(() => {
        if (category === "kesz-termekek") {
            return FinishedModalTextsContext;
        } else if (category === "eddigi-munkak") {
            return PreviousModalTextsContext;
        } else { //setting something to prevent crash
            return FinishedModalTextsContext;
        }
    }, [category]);

    useEffect(() => {
        if (category === "kesz-termekek") {
            setCategoryTitle("Kész Termékek | ");
            importFinishedProducts();
        } else if (category === "eddigi-munkak") {
            setCategoryTitle("Eddigi Munkák | ");
            importPreviousProducts();
        }

    }, [type, category, importFinishedProducts, importPreviousProducts]);

    return (
        <div>
            <Modal context={chooseContext()} />
            <div style={{ marginTop: "6rem" }}>
                <PageTitle>
                    {typeTitle === "Helytelen URL!"
                        ? typeTitle
                        : categoryTitle + typeTitle}
                </PageTitle>

                <DisplayPictures pictures={products} />
            </div>
        </div>
    );
}
