import React, { useEffect, useState, useCallback } from "react";
import "../style/modal.css";
import DisplayPictures from "./DisplayPictures";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import { FinishedModalTextsContext } from "../context/ModalTextsFinishedProducts";
import styled from "styled-components";
import importAll from "../utils/ImportAllFromFolder";

const PageTitle = styled.h1`
    border-bottom: solid;
    margin: 2rem;
    margin-top: 0;
    text-align: center;
`;

export default function FinishedProducts(props) {
    const [products, setProducts] = useState({});
    const { type } = useParams();
    const [typeTitle, setTypeTitle] = useState("Helytelen URL!");

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
                <PageTitle>
                    {typeTitle === "Helytelen URL!"
                        ? typeTitle
                        : "Kész Termékek | " + typeTitle}
                </PageTitle>

                <DisplayPictures pictures={products} />
            </div>
        </div>
    );
}
