// import React from 'react';
// import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
// import db from '../firebase';

// const teachers = [
//   {
//     "firstName": "Rahul",
//     "lastName": "Sowersby",
//     "dob": 2003,
//     "phoneNumber": "+237 209 413 9548",
//     "houseNo": "17th Floor",
//     "area": "5 Toban Junction",
//     "landmark": "Lae Island Airport",
//     "pinCode": 232301,
//     "city": "Lucknow",
//     "state": "Uttar Pradesh",
//     "university": "Indian Institute Of Technology, Delhi",
//     "degree": "Bachelor's",
//     "course": "Computer Science & Engineering",
//     "subject": "[Science, English, Mathmatics]",
//     "image": "https://picsum.photos/200/300",
//     "availibility": "3 Hours",
//     "subscrions": "FALSE"
//   },
//   {
//     "firstName": "Ananya",
//     "lastName": "Rudiger",
//     "dob": 1998,
//     "phoneNumber": "+62 843 476 5469",
//     "houseNo": "Suite 57",
//     "area": "7807 Autumn Leaf Center",
//     "landmark": "Inverway Airport",
//     "pinCode": 230142,
//     "city": "Lucknow",
//     "state": "Uttar Pradesh",
//     "university": "Indian Institute Of Technology, Kanpur",
//     "degree": "Masters's",
//     "course": "Information Technology",
//     "subject": "[Science, English, Mathmatics]",
//     "image": "https://picsum.photos/200/301",
//     "availibility": "4 Hours",
//     "subscrions": "TRUE"
//   },
//   {
//     "firstName": "Farhan",
//     "lastName": "Tuminelli",
//     "dob": 1992,
//     "phoneNumber": "+62 820 105 8314",
//     "houseNo": "Room 1626",
//     "area": "42 Milwaukee Plaza",
//     "landmark": "M�r�n Airport",
//     "pinCode": 100012,
//     "city": "kanpur",
//     "state": "Uttar Pradesh",
//     "university": "Indian Institute Of Technology, Delhi",
//     "degree": "Bachelor's",
//     "course": "Computer Science & Engineering",
//     "subject": "[Science, English, Mathmatics]",
//     "image": "https://picsum.photos/200/302",
//     "availibility": "1 Hours",
//     "subscrions": "TRUE"
//   },
//   {
//     "firstName": "ragini",
//     "lastName": "Chiddy",
//     "dob": 2008,
//     "phoneNumber": "+86 369 159 6473",
//     "houseNo": "Apt 499",
//     "area": "46353 Summit Street",
//     "landmark": "Ugashik Bay Airport",
//     "pinCode": 226012,
//     "city": "Lucknow",
//     "state": "Uttar Pradesh",
//     "university": "Indian Institute Of Technology, Mumbai",
//     "degree": "Bachelor's",
//     "course": "Computer Science & Engineering",
//     "subject": "[Science, English, Mathmatics]",
//     "image": "https://picsum.photos/200/303",
//     "availibility": "2 Hours",
//     "subscrions": "FALSE"
//   },
//   {
//     "firstName": "tanya",
//     "lastName": "Bruntjen",
//     "dob": 1991,
//     "phoneNumber": "+1 786 786 4915",
//     "houseNo": "Apt 702",
//     "area": "2 Chinook Trail",
//     "landmark": "Unifly Heliport",
//     "pinCode": 226028,
//     "city": "Lucknow",
//     "state": "Uttar Pradesh",
//     "university": "Indian Institute Of Technology, Delhi",
//     "degree": "Bachelor's",
//     "course": "Computer Science & Engineering",
//     "subject": "[Science, English, Mathmatics]",
//     "image": "https://picsum.photos/200/304",
//     "availibility": "3 Hours",
//     "subscrions": "TRUE"
//   },
//   {
//     "firstName": "rohit",
//     "lastName": "Reyner",
//     "dob": 2009,
//     "phoneNumber": "+352 273 919 9801",
//     "houseNo": "Apt 456",
//     "area": "1405 Declaration Crossing",
//     "landmark": "Dabo Airport",
//     "pinCode": 226010,
//     "city": "Lucknow",
//     "state": "Uttar Pradesh",
//     "university": "National Institute Of Technology, Allahabad",
//     "degree": "Masters's",
//     "course": "Electrical Engineering",
//     "subject": "[Science, English, Mathmatics]",
//     "image": "https://picsum.photos/200/305",
//     "availibility": "2 Hours",
//     "subscrions": "FALSE"
//   },
//   {
//     "firstName": "ayush",
//     "lastName": "Gurnee",
//     "dob": 2001,
//     "phoneNumber": "+976 246 104 4321",
//     "houseNo": "Apt 1743",
//     "area": "1 Caliangt Junction",
//     "landmark": "Baita International Airport",
//     "pinCode": 226011,
//     "city": "Lucknow",
//     "state": "Uttar Pradesh",
//     "university": "Indian Institute Of Technology, Delhi",
//     "degree": "Bachelor's",
//     "course": "Computer Science & Engineering",
//     "subject": "[Science, English, Mathmatics]",
//     "image": "https://picsum.photos/200/306",
//     "availibility": "1 Hours",
//     "subscrions": "FALSE"
//   },
//   {
//     "firstName": "komal",
//     "lastName": "Frow",
//     "dob": 1984,
//     "phoneNumber": "+1 822 512 9357",
//     "houseNo": "Apt 1752",
//     "area": "31 Chinook Center",
//     "landmark": "San Joaqu�n Airport",
//     "pinCode": 226012,
//     "city": "Delhi",
//     "state": "Uttar Pradesh",
//     "university": "Indian Institute Of Technology, Delhi",
//     "degree": "Bachelor's",
//     "course": "Computer Science & Engineering",
//     "subject": "[Science, English, Mathmatics]",
//     "image": "https://picsum.photos/200/307",
//     "availibility": "2 Hours",
//     "subscrions": "FALSE"
//   },
//   {
//     "firstName": "javed",
//     "lastName": "Studdard",
//     "dob": 2003,
//     "phoneNumber": "+84 806 737 4376",
//     "houseNo": "PO Box 48800",
//     "area": "70344 Pleasure Plaza",
//     "landmark": "Masirah Air Base",
//     "pinCode": 226013,
//     "city": "Lucknow",
//     "state": "Uttar Pradesh",
//     "university": "Indian Institute Of Technology, Delhi",
//     "degree": "Bachelor's",
//     "course": "Information Technology",
//     "subject": "[Science, English, Mathmatics]",
//     "image": "https://picsum.photos/200/308",
//     "availibility": "1 Hours",
//     "subscrions": "FALSE"
//   },
//   {
//     "firstName": "naintara",
//     "lastName": "Monteath",
//     "dob": 1999,
//     "phoneNumber": "+387 986 131 3743",
//     "houseNo": "Suite 32",
//     "area": "0557 Continental Avenue",
//     "landmark": "Ardmore Downtown Executive Airport",
//     "pinCode": 226014,
//     "city": "Lucknow",
//     "state": "Uttar Pradesh",
//     "university": "Indian Institute Of Technology, Delhi",
//     "degree": "Bachelor's",
//     "course": "Chemical Engineering",
//     "subject": "[Science, English, Mathmatics]",
//     "image": "https://picsum.photos/200/309",
//     "availibility": "2 Hours",
//     "subscrions": "FALSE"
//   },
//   {
//     "firstName": "ghanshyam",
//     "lastName": "Simester",
//     "dob": 2007,
//     "phoneNumber": "+1 704 905 5319",
//     "houseNo": "Room 1876",
//     "area": "7 Corben Point",
//     "landmark": "Igiugig Airport",
//     "pinCode": 226015,
//     "city": "Lucknow",
//     "state": "Uttar Pradesh",
//     "university": "Baba Bhimrao Ambedkar University, Lucknow",
//     "degree": "Bachelor's",
//     "course": "Computer Science & Engineering",
//     "subject": "[Science, English, Mathmatics]",
//     "image": "https://picsum.photos/200/310",
//     "availibility": "3 Hours",
//     "subscrions": "TRUE"
//   },
//   {
//     "firstName": "aman",
//     "lastName": "Shildrake",
//     "dob": 2008,
//     "phoneNumber": "+55 922 184 1483",
//     "houseNo": "Apt 276",
//     "area": "533 Sutteridge Trail",
//     "landmark": "Haley Army Airfield",
//     "pinCode": 226016,
//     "city": "Lucknow",
//     "state": "Uttar Pradesh",
//     "university": "Indian Institute Of Technology, Delhi",
//     "degree": "Bachelor's",
//     "course": "Computer Science & Engineering",
//     "subject": "[Science, English, Mathmatics]",
//     "image": "https://picsum.photos/200/311",
//     "availibility": "4 Hours",
//     "subscrions": "TRUE"
//   },
//   {
//     "firstName": "nihal",
//     "lastName": "Wareham",
//     "dob": 2009,
//     "phoneNumber": "+358 204 494 4706",
//     "houseNo": "Room 361",
//     "area": "48907 Paget Trail",
//     "landmark": "Oktyabrskiy Airport",
//     "pinCode": 226017,
//     "city": "kanpur",
//     "state": "Uttar Pradesh",
//     "university": "Indian Institute Of Technology, Delhi",
//     "degree": "Bachelor's",
//     "course": "Computer Science & Engineering",
//     "subject": "[Science, English, Mathmatics]",
//     "image": "https://picsum.photos/200/312",
//     "availibility": "1 Hours",
//     "subscrions": "TRUE"
//   },
//   {
//     "firstName": "mahak",
//     "lastName": "Inkster",
//     "dob": 1995,
//     "phoneNumber": "+961 429 936 3554",
//     "houseNo": "Suite 41",
//     "area": "3 Killdeer Circle",
//     "landmark": "Hanamaki Airport",
//     "pinCode": 226018,
//     "city": "Lucknow",
//     "state": "Uttar Pradesh",
//     "university": "Indian Institute Of Technology, Delhi",
//     "degree": "Bachelor's",
//     "course": "Electrical Engineering",
//     "subject": "[Science, English, Mathmatics]",
//     "image": "https://picsum.photos/200/313",
//     "availibility": "2 Hours",
//     "subscrions": "TRUE"
//   },
//   {
//     "firstName": "monika",
//     "lastName": "Lafee",
//     "dob": 1999,
//     "phoneNumber": "+86 596 523 4225",
//     "houseNo": "Suite 71",
//     "area": "3490 Petterle Court",
//     "landmark": "Eastern Oregon Regional At Pendleton Airport",
//     "pinCode": 226019,
//     "city": "Lucknow",
//     "state": "Uttar Pradesh",
//     "university": "Indian Institute Of Technology, Delhi",
//     "degree": "Doctere's",
//     "course": "Computer Science & Engineering",
//     "subject": "[Science, English, Mathmatics]",
//     "image": "https://picsum.photos/200/314",
//     "availibility": "2 Hours",
//     "subscrions": "TRUE"
//   },
//   {
//     "firstName": "maya",
//     "lastName": "Boadby",
//     "dob": 2006,
//     "phoneNumber": "+358 806 244 6463",
//     "houseNo": "PO Box 31837",
//     "area": "02 Cardinal Pass",
//     "landmark": "Southwest Minnesota Regional Airport - Marshall/Ryan Field",
//     "pinCode": 226020,
//     "city": "Lucknow",
//     "state": "Uttar Pradesh",
//     "university": "Indian Institute Of Technology, Mumbai",
//     "degree": "Bachelor's",
//     "course": "Civil Engineering",
//     "subject": "[Science, English, Mathmatics]",
//     "image": "https://picsum.photos/200/315",
//     "availibility": "3 Hours",
//     "subscrions": "FALSE"
//   },
//   {
//     "firstName": "arun",
//     "lastName": "Revan",
//     "dob": 2006,
//     "phoneNumber": "+1 310 159 9040",
//     "houseNo": "Room 1580",
//     "area": "8200 Paget Parkway",
//     "landmark": "Roy Hill Station Airport",
//     "pinCode": 226021,
//     "city": "Lucknow",
//     "state": "Uttar Pradesh",
//     "university": "Indian Institute Of Technology, Delhi",
//     "degree": "Doctere's",
//     "course": "Computer Science & Engineering",
//     "subject": "[Science, English, Mathmatics]",
//     "image": "https://picsum.photos/200/316",
//     "availibility": "1 Hours",
//     "subscrions": "FALSE"
//   },
//   {
//     "firstName": "arjun",
//     "lastName": "Gingedale",
//     "dob": 1994,
//     "phoneNumber": "+55 621 997 9449",
//     "houseNo": "Suite 41",
//     "area": "97 Mallory Crossing",
//     "landmark": "Iffley Airport",
//     "pinCode": 226022,
//     "city": "Agra",
//     "state": "Uttar Pradesh",
//     "university": "Indian Institute Of Technology, Delhi",
//     "degree": "Bachelor's",
//     "course": "Civil Engineering",
//     "subject": "[Science, English, Mathmatics]",
//     "image": "https://picsum.photos/200/317",
//     "availibility": "3 Hours",
//     "subscrions": "FALSE"
//   },
//   {
//     "firstName": "aarohi",
//     "lastName": "Gansbuhler",
//     "dob": 2000,
//     "phoneNumber": "+218 182 549 5220",
//     "houseNo": "Room 1623",
//     "area": "47 Moland Court",
//     "landmark": "Bukhara Airport",
//     "pinCode": 226023,
//     "city": "Lucknow",
//     "state": "Uttar Pradesh",
//     "university": "Indian Institute Of Technology, Kanpur",
//     "degree": "Bachelor's",
//     "course": "Computer Science & Engineering",
//     "subject": "[Science, English, Mathmatics]",
//     "image": "https://picsum.photos/200/318",
//     "availibility": "1 Hours",
//     "subscrions": "TRUE"
//   },
//   {
//     "firstName": "ajitesh",
//     "lastName": "Le Brum",
//     "dob": 2012,
//     "phoneNumber": "+501 355 246 0174",
//     "houseNo": "Apt 1009",
//     "area": "45726 Northland Avenue",
//     "landmark": "Kasenga Airport",
//     "pinCode": 226024,
//     "city": "Delhi",
//     "state": "Uttar Pradesh",
//     "university": "Indian Institute Of Technology, Delhi",
//     "degree": "Masters's",
//     "course": "Software Systems Engineering",
//     "subject": "[Science, English, Mathmatics]",
//     "image": "https://picsum.photos/200/319",
//     "availibility": "2 Hours",
//     "subscrions": "TRUE"
//   },
//   {
//     "firstName": "shardha",
//     "lastName": "Biddy",
//     "dob": 2007,
//     "phoneNumber": "+86 308 850 9449",
//     "houseNo": "PO Box 8225",
//     "area": "228 Banding Parkway",
//     "landmark": "Princeton Airport",
//     "pinCode": 226025,
//     "city": "Lucknow",
//     "state": "Uttar Pradesh",
//     "university": "Indian Institute Of Technology, Delhi",
//     "degree": "Bachelor's",
//     "course": "Computer Science & Engineering",
//     "subject": "[GK, English, Mathmatics]",
//     "image": "https://picsum.photos/200/320",
//     "availibility": "3 Hours",
//     "subscrions": "FALSE"
//   },
//   {
//     "firstName": "nirmala",
//     "lastName": "Firpo",
//     "dob": 2011,
//     "phoneNumber": "+381 867 892 4218",
//     "houseNo": "Room 599",
//     "area": "54 Kedzie Avenue",
//     "landmark": "Forbes Airport",
//     "pinCode": 226026,
//     "city": "kanpur",
//     "state": "Uttar Pradesh",
//     "university": "Indian Institute Of Technology, Delhi",
//     "degree": "Bachelor's",
//     "course": "Computer Science & Engineering",
//     "subject": "[GK, English, Mathmatics]",
//     "image": "https://picsum.photos/200/321",
//     "availibility": "2 Hours",
//     "subscrions": "FALSE"
//   },
//   {
//     "firstName": "niharika",
//     "lastName": "Brickstock",
//     "dob": 2004,
//     "phoneNumber": "+86 536 625 6131",
//     "houseNo": "PO Box 39206",
//     "area": "80185 Melby Pass",
//     "landmark": "Guanambi Airport",
//     "pinCode": 226027,
//     "city": "Lucknow",
//     "state": "Uttar Pradesh",
//     "university": "Baba Bhimrao Ambedkar University, Lucknow",
//     "degree": "Bachelor's",
//     "course": "Electrical Engineering",
//     "subject": "[Science, English, Mathmatics]",
//     "image": "https://picsum.photos/200/322",
//     "availibility": "2 Hours",
//     "subscrions": "FALSE"
//   },
//   {
//     "firstName": "priyanka",
//     "lastName": "Traves",
//     "dob": 2003,
//     "phoneNumber": "+86 445 905 9740",
//     "houseNo": "5th Floor",
//     "area": "67987 Dixon Junction",
//     "landmark": "Placerville Airport",
//     "pinCode": 226028,
//     "city": "Lucknow",
//     "state": "Uttar Pradesh",
//     "university": "Indian Institute Of Technology, Delhi",
//     "degree": "Masters's",
//     "course": "Chemical Engineering",
//     "subject": "[Science, English, Mathmatics]",
//     "image": "https://picsum.photos/200/323",
//     "availibility": "1 Hours",
//     "subscrions": "TRUE"
//   },
//   {
//     "firstName": "radhika",
//     "lastName": "Goude",
//     "dob": 2004,
//     "phoneNumber": "+86 674 481 7586",
//     "houseNo": "Room 1598",
//     "area": "6110 Gale Crossing",
//     "landmark": "Proma Heliport",
//     "pinCode": 226029,
//     "city": "Lucknow",
//     "state": "Uttar Pradesh",
//     "university": "National Institute Of Technology, Allahabad",
//     "degree": "Bachelor's",
//     "course": "Computer Science & Engineering",
//     "subject": "[Science, English, Mathmatics]",
//     "image": "https://picsum.photos/200/324",
//     "availibility": "3 Hours",
//     "subscrions": "FALSE"
//   },
//   {
//     "firstName": "rohan",
//     "lastName": "Castille",
//     "dob": 1995,
//     "phoneNumber": "+389 977 917 9778",
//     "houseNo": "PO Box 94650",
//     "area": "92 Spenser Way",
//     "landmark": "Calicut International Airport",
//     "pinCode": 226030,
//     "city": "Lucknow",
//     "state": "Uttar Pradesh",
//     "university": "Indian Institute Of Technology, Delhi",
//     "degree": "Bachelor's",
//     "course": "Computer Science & Engineering",
//     "subject": "[Physics, Chemistry, Mathmatics]",
//     "image": "https://picsum.photos/200/325",
//     "availibility": "2 Hours",
//     "subscrions": "TRUE"
//   },
//   {
//     "firstName": "nikhil",
//     "lastName": "Towsie",
//     "dob": 2001,
//     "phoneNumber": "+996 934 246 0007",
//     "houseNo": "4th Floor",
//     "area": "3 Washington Pass",
//     "landmark": "Vunisea Airport",
//     "pinCode": 226031,
//     "city": "Lucknow",
//     "state": "Uttar Pradesh",
//     "university": "Indian Institute Of Technology, Delhi",
//     "degree": "Doctere's",
//     "course": "Civil Engineering",
//     "subject": "[Science, English, Mathmatics]",
//     "image": "https://picsum.photos/200/326",
//     "availibility": "2 Hours",
//     "subscrions": "TRUE"
//   },
//   {
//     "firstName": "neeraj",
//     "lastName": "Paish",
//     "dob": 2000,
//     "phoneNumber": "+46 589 288 3019",
//     "houseNo": "Apt 1101",
//     "area": "610 8th Alley",
//     "landmark": "La Rochelle-�le de R� Airport",
//     "pinCode": 226032,
//     "city": "Agra",
//     "state": "Uttar Pradesh",
//     "university": "National Institute Of Technology, Allahabad",
//     "degree": "Bachelor's",
//     "course": "Computer Science & Engineering",
//     "subject": "[Science, English, Biology]",
//     "image": "https://picsum.photos/200/327",
//     "availibility": "4 Hours",
//     "subscrions": "TRUE"
//   },
//   {
//     "firstName": "dhanesh",
//     "lastName": "Dainter",
//     "dob": 1992,
//     "phoneNumber": "+380 922 663 1103",
//     "houseNo": "Apt 59",
//     "area": "04 Mariners Cove Avenue",
//     "landmark": "Greenbrier Valley Airport",
//     "pinCode": 226033,
//     "city": "Lucknow",
//     "state": "Uttar Pradesh",
//     "university": "Indian Institute Of Technology, Delhi",
//     "degree": "Bachelor's",
//     "course": "Software Systems Engineering",
//     "subject": "[Science, English, Mathmatics]",
//     "image": "https://picsum.photos/200/328",
//     "availibility": "3 Hours",
//     "subscrions": "FALSE"
//   }
// ]

// export default function Editpost() {
//   function addData() {
//     // add json data to firestore document with v9
//     addDoc(collection(db, "teachers"), teachers[14])
//       .then((docRef) => {
//         console.log("Document written with ID: ", docRef.id);
//       }
//       )
//       .catch((error) => {
//         console.error("Error adding document: ", error);
//       }
//       );
//   }
//   return (
//     <div>
//       <button className='text-3xl' onClick={addData}>Add</button>
//     </div>
//   )
// }

import React from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore';
import db from '../firebase';

export default function Editpost() {
  React.useEffect(()=> {
    const q = query(collection(db, "teachers"), where("city", "==", "Lucknow"));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        // getting all value of the document
        console.log(doc.data())
      });
    });
  }, [])
  return (
    <div>Editpost</div>
  )
}
