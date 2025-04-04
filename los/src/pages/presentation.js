import Link from "next/link"
export default function Presentation(){
    return (
      <section className="content-center affiche image">
        <div >

        <h1>League Of Stones</h1>
      
      <nav>
      <ul>
        <Link href={"./connexion"}>Connexion</Link>
        <Link href={"./inscription"}>Inscription</Link>
      </ul>
      </nav>
        </div>
    </section>

    )
}