import Image from "next/image";
import unknownImg from "../public/unknown.png";

const UnknownDeck = () => {

    return (
        <div className="container row d-flex justify-content-center align-items-center">
            <div className="rounded p-0 m-3" style={{width : "fit-content"}}>
                <Image src={unknownImg} className="card-img" alt="..." style={{width : "6rem", height : "auto"}} />
            </div>
        </div>
    )
};

export default UnknownDeck;