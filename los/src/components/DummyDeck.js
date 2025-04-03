import Image from "next/image";
import DummyCard from "./DummyCard";

const DummyDeck = ({ deck }) => {

    return (
        <>
            <div className="container row">
                {deck.map( (index) => <DummyCard key={index} />)}
            </div>
        </>
    )
};

export default DummyDeck;