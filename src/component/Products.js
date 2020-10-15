import React, { useEffect, useState } from "react";
import "../style/modal.css";
import DisplayPictures from "./DisplayPictures";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import { FinishedModalTextsContext } from "../context/ModalTextsFinishedProducts";
import { PreviousModalTextsContext } from "../context/ModalTextsPreviousProducts";
import { PremiumModalTextsContext } from "../context/ModalTextsPremiumProducts";
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
    const [modalContext, setModalContext] = useState();
    const { type } = useParams();
    const [title, setTitle] = useState("Helytelen URL!");

    function chooseCategory() {
        if (category === "kesz-termekek") {
            setModalContext(FinishedModalTextsContext);
            return "finished_products";
        } else if (category === "eddigi-munkak") {
            setModalContext(PreviousModalTextsContext);
            return "prev_products";
        } else if (category === "premium-termekek") {
            setModalContext(PremiumModalTextsContext);
            return "finished_products";
        } else {
            return "";
        }
    }

    useEffect(() => {
        let category = chooseCategory();
        if (type === "figurak") {
            setTitle("Figurák");
            setProducts(
                importAll(
                    require.context(
                        `../images/${category}/figurák`,
                        false,
                        /\.(png|jpe?g|svg)$/
                    )
                )
            );
        } else if (type === "takarok") {
            setTitle("Takarók");
            setProducts(
                importAll(
                    require.context(
                        `../images/${category}/takarók`,
                        false,
                        /\.(png|jpe?g|svg)$/
                    )
                )
            );
        } else if (type === "szundikendok") {
            setTitle("Szundikendők");
            setProducts(
                importAll(
                    require.context(
                        `../images/${category}/szundikendők`,
                        false,
                        /\.(png|jpe?g|svg)$/
                    )
                )
            );
        } else if (type === "ruhak") {
            setTitle("Ruhák");
            setProducts(
                importAll(
                    require.context(
                        `../images/${category}/ruhák`,
                        false,
                        /\.(png|jpe?g|svg)$/
                    )
                )
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, category]);

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => {
            return (images[item.replace("./", "")] = r(item));
        });
        return images;
    }

    return (
        <div>
            <Modal context={modalContext} />
            <div style={{ marginTop: "6rem" }}>
                <PageTitle>
                    {title === "Helytelen URL!"
                        ? title
                        : "Kész Termékek | " + title}
                </PageTitle>

                <DisplayPictures pictures={products} />
            </div>
        </div>
    );
}
