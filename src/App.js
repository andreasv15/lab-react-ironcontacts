import "./App.css";
import allContacts from "./contacts.json";
import { useState } from "react";

function App() {
  
  const [ contactList, setContactList ] = useState(allContacts.slice(5,10));

  const handleAddContact = () => {
    // si vamos añadiendo contactos y llegamos a la misma longitud que el contacts.json, 
    // hacemos un return para no hacer nada, si no hacemos estos, cuando no haya mas 
    // elementos a añadir, la app se rompe 
    if (contactList.length === allContacts.length) {
      return;
    }
      // console.log("añadir aleatorio")
    const random = Math.floor(Math.random() * allContacts.length);
    //console.log("Elemento aleatorio", allContacts[random])

    const randomContact = allContacts[random];

    //console.log(contactList);
    // const arrayContactsCopy = [ ...contactList ]
    // arrayContactsCopy.push(allContacts[random])
    
    // antes comprobamos que el contacto que se vaya a agregar no esté en la lista, para evitar duplicados
    if (contactList.includes(randomContact)) {
      handleAddContact();
    } else {
      setContactList(  [randomContact, ...contactList] ); // añade al principio

    }

  }
  
  const handleSortPopularity = () => {

    const copyContactList = [ ...contactList];
    //console.log(copyContactList)
    copyContactList.sort( (contact1, contact2) => contact1.popularity > contact2.popularity ? -1 : 1);
    setContactList(copyContactList);

  }

  const handleSortName = () => {
    const copyContactList = [ ...contactList];
    copyContactList.sort( (contact1, contact2) => contact1.name > contact2.name ? 1 : -1)
    setContactList(copyContactList);

  }

  const handleDeleteContact = (index) => {
    // console.log(index)
    const copyContactList = [ ...contactList];
    copyContactList.splice(index, 1);
    
    
    setContactList(copyContactList);

  }

  return (
    <div className="App">
    <h1> IronContacts </h1>
    <button onClick={ handleAddContact }> Add Random Contact </button>
    <button onClick={ handleSortPopularity }> Sort by popularity </button>
    <button onClick={ handleSortName }> Sort by name </button>
    <table>
      <thead>
        <tr>
          <th> Picture </th>
          <th> Name </th>
          <th> Popularity </th>
          <th> Won Oscar </th>
          <th> Won Emmy </th>
          <th> Actions </th>
        </tr>
      </thead>
      <tbody>
      {
        contactList.map((eachContact) => {
          return (
            <tr key={eachContact.id}>
              <td>
                <img src={eachContact.pictureUrl} width="40px" />
              </td>
              <td>
                <p> {eachContact.name} </p>
              </td>
              <td>
                <p> {eachContact.popularity.toFixed(2)} </p>
              </td>
              <td>
                { eachContact.wonOscar ? "🏆": "" }
              </td>
              <td>
                { eachContact.wonEmmy  ? "🏆": "" }
              </td>
              <td>
                <button onClick={ () => handleDeleteContact(contactList.indexOf(eachContact)) }> Delete </button>
              </td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
    </div>
  );
}
export default App;

