import Image from "next/image";
import DummyCard from "./DummyCard";

const DummyDeck = ({ deck }) => {

    return (
        <>
            {deck.map((card, index) => <DummyCard key={index} />)}
        </>
    )
};

export default DummyDeck;