import React, { useEffect, useState } from "react";
import Footer from "../navigation/footer";
import Navbar from "../navigation/navbar";
import Searchbar from "../navigation/searchbar";
import "../../Styles/index.css";

function ProfilCo() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");
  const [isEditing, setIsEditing] = useState(false);     // edition est désactivé par défaut

  async function getInfoProfil() {

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "bearer " + localStorage.getItem("token"),
      },
    };
  
    // Envoie une requête fetch avec l'URL de l'API et les options définies
    const response = await fetch(
      `https://social-network-api.osc-fr1.scalingo.io/gptech-social/user`,
      options
    );

    // Récupère la réponse au format JSON
    const data = await response.json();
    setFirstName(data.firstname);
    setLastName(data.lastname);
    setEmail(data.email);
    setAge(data.age);
    setOccupation(data.occupation);
    

    console.log(data); // Utilise les données renvoyées par l'API
  }

  useEffect(() => {
    getInfoProfil();
  }, []);

////////////////////////////////////////////////////
  async function putInfoProfil() {
    
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        age: age,
        occupation: occupation,
      }),
    };

    const response = await fetch(
      `https://social-network-api.osc-fr1.scalingo.io/gptech-social/user`,
      options
    );

    const data = await response.json();
    setFirstName(data.firstname);
    setLastName(data.lastname);
    setEmail(data.email);
    setAge(data.age);
    setOccupation(data.occupation);
}

function handleEditClick(modif) {    // fonction quand je clique sur le bouton modifier
  setIsEditing(!isEditing);     // définir setIsEditing sur true (au lieu de false)
    // définir le setCurrent sur l'élément sur lequel on a cliqué
    
}

  return (
    <div>
      <Searchbar />
      <Navbar />
      {isEditing == false ? ( 
        
          <div className="container">
            <h1>Informations profil</h1>
        
            <div action="" className="mx-auto" method="get">        {/* afficher le Nom */}
              <label htmlFor="">Nom : </label>
              <span>{lastName}</span>
            </div>

            <div action="" className="mx-auto" method="get">        {/* afficher le Prénom */}
              <div>
                <label htmlFor="">Prénom : </label>
                <span>{firstName}</span>
              </div>

              <div action="" className="mx-auto" method="get">        {/* afficher l'Email */}
               <div>
                  <label htmlFor="">Email : </label>
                  <span>{email}</span>
                </div>
              
                <div action="" className="mx-auto" method="get">        {/* afficher l'Age */}
                  <div>
                    <label htmlFor="">Age : </label>
                    <span>{age}</span>
                  </div>

                  <div action="" className="mx-auto" method="get">        {/* afficher le Travail */}
                    <div>
                      <label htmlFor="">Emploi : </label>
                      <span>{occupation}</span>
                    </div>

                    <button onClick={handleEditClick}>Modifier</button>   {/* fonction quand tu cliques sur modifier */}
                
                  </div>
                </div>
              </div>
            </div>
          </div>
       )
        :isEditing == true ? ( 
        
          <div className="container">
            <h1>Informations profil</h1>
        

            <div action="" className="mx-auto" method="get">        {/* afficher le Nom */}
              <label htmlFor="">Nom : </label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>

            <div action="" className="mx-auto" method="get">        {/* afficher le Prénom */}
              <div>
                <label htmlFor="">Prénom : </label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>

              <div action="" className="mx-auto" method="get">        {/* afficher l'Email */}
               <div>
                  <label htmlFor="">Email : </label>
                  <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              
                <div action="" className="mx-auto" method="get">        {/* afficher l'Age */}
                  <div>
                    <label htmlFor="">Age : </label>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                  </div>

                  <div action="" className="mx-auto" method="get">        {/* afficher le Travail */}
                    <div>
                      <label htmlFor="">Emploi : </label>
                      <input type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
                    </div>

                    <button onClick={handleEditClick}>Valider</button>   {/* fonction quand tu cliques sur modifier */}
                
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
        ""
        )}
      <Footer />
    </div>     
  );
}

export default ProfilCo;