import Image from "next/image";
import unknownImg from "../public/unknown.webp";

const DummyCard = () => {

    return (
        <div className="card text-center rounded" style={{width : "fit-content"}}>
            <Image src={unknownImg} className="card-img" alt="..." style={{width : "6.5rem", height : "auto"}} />
        </div>
    )
};

export default DummyCard;