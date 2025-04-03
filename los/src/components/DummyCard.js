import Image from "next/image";
import unknownImg from "../public/unknown.webp";

const DummyCard = () => {

    return (
        <div className="card rounded p-0 m-3" style={{width : "fit-content"}}>
            <Image src={unknownImg} className="card-img" alt="..." style={{width : "6rem", height : "auto"}} />
        </div>
    )
};

export default DummyCard;