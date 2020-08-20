import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

function Test() {
  const [localToken, setLocalToken] = useState(localStorage.getItem('token'));
  const collectionTokenName = localStorage.getItem('token');

  // Psuedo Code:
  // - add the item
  // - check the db for item
  // - perform data validation
  //  1) Lowercase()
  //  2) Regex for Punctuation

  /*If {item} exists in the database with data clean-up done 
    then show an error message (get cute there)
    && still enter item (as-is) aka keep existing code 
  */

  React.useEffect(render => {
    // const query = firebase.firestore().collection(collectionTokenName);
    // console.log('query:', query);
    // this.getDocumentsInQuery(query, render);
    // console.log('this:', this);

    const docRef = db.collection(collectionTokenName);

    docRef.get().then(function(doc) {
      if (doc.exists) {
        console.log('Document data:', doc.data());
        //      } else {
        //       doc.data() will be undefined in this case
        //       console.log('No such document!');
        //
        //
        //   .catch(function(error) {
        //     console.log('Error getting document:', error);
        //   });
      }
    });
  });
}

return <h1>Hello</h1>;

export default Test;
